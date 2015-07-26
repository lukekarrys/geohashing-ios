import geohash from 'geohash-coordinates';
import Geo from 'geo-graticule';
import assign from 'lodash/object/assign';
import partial from 'lodash/function/partial';
import flatten from 'lodash/array/flatten';

import yyyymmdd from './yyyymmdd';

const toAnnotation = (title, from, point) => {
  return {
    title,
    subtitle: from.milesFrom(point).toFixed(1) + 'mi',
    latitude: point[0],
    longitude: point[1]
  };
};

const toAnnotations = (location, results) => {
  const [latitude, longitude] = location.graticuleCenter();
  const locationAnno = assign({title: 'You are here'}, location.toJSON());

  const annotations = flatten(results.map((result) => {
    const {date, neighbors} = result;
    return neighbors.map(partial(toAnnotation, date, location));
  })).concat(locationAnno);

  return {annotations, center: {latitude, longitude}, location};
};

const fetch = (props, cb) => {
  const {latitude, longitude, date, days} = props;
  const location = {latitude, longitude};

  if (latitude && longitude && date) {
    geohash.latest({
      date: yyyymmdd(date),
      days,
      location
    }, (err, results) => {
      if (err) {
        cb(err);
      }
      else {
        cb(null, toAnnotations(new Geo(location), results));
      }
    });
  }
};

export default fetch;
