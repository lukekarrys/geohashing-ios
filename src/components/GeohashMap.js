'use strict';

import React, {MapView, View, StyleSheet, Component} from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

import geohashAnnotations from '../helpers/geohashAnnotations';
import LoadingOverlay from './LoadingOverlay';


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class GeohashMap extends Component {
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
  componentDidMount () {
    this._respondToProps(this.props);
  }

  componentWillReceiveProps (props) {
    if (!shallowEqual(props, this.props)) {
      this._respondToProps(props);
    }
  }

  _respondToProps (props) {
    this.setState({loading: true});
    geohashAnnotations(props, (err, results) => {
      if (err) {
        this.setState({
          error: err.message,
          loading: false
        });
      }
      else {
        this.setState({
          loading: false,
          annotations: results.annotations,
          region: {
            latitude: results.center.latitude,
            longitude: results.center.longitude,
            latitudeDelta: 3,
            longitudeDelta: 3
          }
        });
      }
    });
  }

  // ==========================
  // Render
  // ==========================
  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          annotations={this.state.annotations}
          region={this.state.region}
        />
        <LoadingOverlay isVisible={this.state.loading} />
      </View>
    );
  }
}

export default GeohashMap;
