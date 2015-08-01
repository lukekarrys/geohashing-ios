'use strict';

import RNGeocoder from 'react-native-geocoder';

export default {
  current (cb) {
    navigator.geolocation.getCurrentPosition((result) => {
      cb({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude
      });
    });
  },

  reverse (location, cb) {
    if (typeof location === 'string' && location) {
      RNGeocoder.geocodeAddress(location, (_, data) => {
        data = Array.isArray(data) ? data[0] : data;
        cb({
          latitude: data.location.lat,
          longitude: data.location.lng
        });
      });
    }
  }
};
