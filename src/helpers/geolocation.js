'use strict';

import Geocoder from 'react-native-geocoder';

const toCoords = ({latitude, longitude, lat, lng}) => ({
  latitude: latitude || lat,
  longitude: longitude || lng
});

export default {
  current(cb) {
    navigator.geolocation.getCurrentPosition(
      (res) => cb(null, toCoords(res.coords)),
      (error) => cb(error, {})
    );
  },

  reverse(location, cb) {
    if (typeof location === 'string' && location) {
      Geocoder.geocodeAddress(location)
        .then((res) => cb(null, toCoords(res[0].position)))
        .catch((error) => cb(error, {}));
    }
  }
};
