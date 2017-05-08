'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MapView, View, StyleSheet} from 'react-native';
import shallowEqual from 'react-pure-render/shallowEqual';

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
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    days: PropTypes.number
  }

  state = {
    annotations: null,
    region: null,
    error: null,
    loading: false
  }

  componentDidMount() {
    const {latitude, longitude, date, days} = this.props;
    this.respondToProps({latitude, longitude, date, days});
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
      if (error) {
        this.setState({
          error,
          loading: false,
          annotations: null,
          overlays: null
        });
      }
      else {
        this.setState({
          loading: false,
          annotations: results.annotations,
          overlays: results.overlays,
          region: {
            latitude: results.center.latitude,
            longitude: results.center.longitude,
            latitudeDelta: 4,
            longitudeDelta: 4
          }
        });
      }
    });
  }

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
