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

const format = (d) => {
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString();
  const dd = d.getDate().toString();
  return `${yyyy}-${mm[1] ? mm : '0' + mm[0]}-${dd[1] ? dd : '0' + dd[0]}`;
};

const GeohashMap = React.createClass({
  propTypes: {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    date: React.PropTypes.instanceOf(Date),
    days: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      date: null,
      latitude: null,
      longitude: null,
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
    const {latitude, longitude, date, days} = props;
    const location = {latitude, longitude};

    if (latitude && longitude && date) {
      geohash.latest({
        date: format(date),
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
