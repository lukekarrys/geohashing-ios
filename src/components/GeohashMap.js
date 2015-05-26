'use strict';

import React from 'react-native';
import geohash from 'geohash-coordinates';
import Geo from 'geo-graticule';
import assign from 'lodash/object/assign';
import partial from 'lodash/function/partial';
import flatten from 'lodash/array/flatten';

const {MapView, StyleSheet} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const GeohashMap = React.createClass({
  propTypes: {
    location: React.PropTypes.object,
    date: React.PropTypes.string,
    days: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      date: new Date().toJSON(),
      location: null,
      days: 1
    };
  },

  getInitialState () {
    return {
      annotations: null,
      region: null
    };
  },

  componentDidMount () {
    this._respondToProps(this.props);
  },

  componentWillReceiveProps (props) {
    this._respondToProps(props);
  },

  _respondToProps (props) {
    const {location, date, days} = props;

    if (location) {
      geohash.latest({
        date,
        days,
        location
      }, (err, results) => {
        if (err) { throw err; }
        this._setAnnotationsFromGeohash(new Geo(location), results);
      });
    }
  },

  _geohashPointToAnnotation (title, from, point) {
    return {
      title,
      subtitle: from.milesFrom(point).toFixed(1) + 'mi',
      latitude: point[0],
      longitude: point[1]
    };
  },

  _setAnnotationsFromGeohash (location, results) {
    const center = location.graticuleCenter();
    const locationAnno = assign({title: 'You are here'}, location.toJSON());

    const annotations = flatten(results.map((result) => {
      const {date, neighbors} = result;
      return neighbors.map(partial(this._geohashPointToAnnotation, date, location));
    }));

    this.setState({
      annotations: annotations.concat(locationAnno),
      region: {
        latitude: center[0],
        longitude: center[1],
        latitudeDelta: 3,
        longitudeDelta: 3
      }
    });
  },

  render () {
    return (
      <MapView
        style={styles.container}
        annotations={this.state.annotations}
        region={this.state.region}
      />
    );
  }
});

export default GeohashMap;
