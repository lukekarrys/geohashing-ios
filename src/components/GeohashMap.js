'use strict';

import React, {MapView, View, StyleSheet, Component} from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';
import assign from 'lodash/assign';

import geohashAnnotations from '../helpers/geohashAnnotations';
import LoadingOverlay from './overlay/LoadingOverlay';
import ErrorOverlay from './overlay/ErrorOverlay';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class GeohashMap extends Component {
  static propTypes = {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    date: React.PropTypes.instanceOf(Date),
    days: React.PropTypes.number
  }

  state = {
    annotations: null,
    region: null,
    error: null,
    loading: false
  }

  // ==========================
  // Lifecycle
  // ==========================
  componentDidMount() {
    this.respondToProps(this.props);
  }

  componentWillReceiveProps(props) {
    if (!shallowEqual(props, this.props)) {
      this.respondToProps(props);
    }
  }

  validProps(props) {
    return props.latitude != null &&
      props.longitude != null &&
      props.date != null &&
      props.days != null;
  }

  respondToProps(props) {
    // Always reset loading/error
    this.setState({loading: true, error: null});

    // If we dont have the props to fetch the geohash
    // then bail during the loading stage since a prop
    // update will eventually get us out of loading
    if (!this.validProps(props)) return;

    // Get out geohash and set the appropriate state
    geohashAnnotations(props, (error, results) => {
      const state = {loading: false};

      if (error) {
        assign(state, {error});
      }
      else {
        assign(state, {
          annotations: results.annotations,
          overlays: results.overlays,
          region: {
            latitude: results.center.latitude,
            longitude: results.center.longitude,
            latitudeDelta: 3,
            longitudeDelta: 3
          }
        });
      }

      this.setState(state);
    });
  }

  // ==========================
  // Render
  // ==========================
  render() {
    const {loading, error, annotations, overlays, region} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          annotations={annotations}
          overlays={overlays}
          region={region}
        />
        <LoadingOverlay isVisible={loading} />
        <ErrorOverlay error={error} />
      </View>
    );
  }
}
