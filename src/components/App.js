'use strict';

import React from 'react-native';
import StyleSheet from 'StyleSheet';
import geohash from 'geohash-coordinates';
import Geo from 'geo-graticule';
import assign from 'lodash/object/assign';
import partial from 'lodash/function/partial';

const {MapView, View} = React;

const styles = StyleSheet.create({
  map: {
    height: 649,
    marginTop: 20
  }
});

const AppMapView = React.createClass({
  propTypes: {
    location: React.PropTypes.string,
    date: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      date: new Date(),
      location: '34.3,-111.3'
    };
  },

  getInitialState () {
    return {
      annotations: null
    };
  },

  componentDidMount () {
    const location = new Geo(this.props.location);
    geohash.latest({
      date: this.props.date,
      days: 1,
      location: location.toString()
    }, (err, results) => {
      if (err) {
        throw err;
      }
      this._setAnnotationsFromGeohash(location, results);
    });
  },

  _geohashPointToAnnotation (title, point) {
    return {
      title,
      latitude: point[0],
      longitude: point[1]
    };
  },

  _setAnnotationsFromGeohash (location, geohashResult) {
    const [result] = geohashResult;
    const {date} = result;
    const points = result.neighbors;
    const annotations = points.map(partial(this._geohashPointToAnnotation, date));
    this.setState({
      annotations: annotations.concat(assign({
        title: 'You are here'
      }, location.toJSON()))
    });
  },

  render () {
    return (
      <View>
        <MapView
          style={styles.map}
          annotations={this.state.annotations}
        />
      </View>
    );
  }
});

export default AppMapView;
