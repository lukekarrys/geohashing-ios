'use strict';

import RNGeocoder from 'react-native-geocoder';

export default {
  current(cb) {
    navigator.geolocation.getCurrentPosition((result) => {
      const {latitude, longitude} = result.coords;
      cb({latitude, longitude});
    });
  },

  reverse(location, cb) {
    if (typeof location === 'string' && location) {
      RNGeocoder.geocodeAddress(location, (_, data) => {
        data = Array.isArray(data) ? data[0] : data;
        const {lat: latitude, lng: longitude} = data.location;
        cb({latitude, longitude});
      });
    }
  }
};
