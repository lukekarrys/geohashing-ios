'use strict';

import geohash from 'geohash-coordinates';
import Geo from 'geo-graticule';
import assign from 'lodash/assign';
import partial from 'lodash/partial';
import flatten from 'lodash/flatten';

import yyyymmdd from './yyyymmdd';

const toJSON = (geo) => new Geo(geo).toJSON();

const toBox = (geo) => {
  const box = new Geo(geo).graticuleBox();
  return box.map(toJSON).concat(toJSON(box[0]));
};

const toAnnotation = (title, from, point) => ({
  title,
  subtitle: `${from.milesFrom(point).toFixed(1)}mi`,
  latitude: point[0],
  longitude: point[1]
});

const toAnnotations = (location, results) => {
  const [latitude, longitude] = location.graticuleCenter();
  const locationAnno = assign({title: 'You are here'}, location.toJSON());

  const annotations = flatten(results.map((result) => {
    const {date, neighbors} = result;
    return neighbors.map(partial(toAnnotation, date, location));
  })).concat(locationAnno);

  let overlays = [];
  if (results.length) {
    overlays = results[0].neighbors.map((geo) => ({
      coordinates: toBox(geo),
      strokeColor: '#f007',
      lineWidth: 3
    }));
  }

  return {
    annotations,
    overlays,
    center: {latitude, longitude},
    location
  };
};

const fetch = (props, cb) => {
  const {latitude, longitude, date, days} = props;
  const location = {latitude, longitude};

  geohash.latest({days, location, date: yyyymmdd(date)}, (err, results) => {
    cb(err, err ? null : toAnnotations(new Geo(location), results));
  });
};

export default fetch;
