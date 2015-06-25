'use strict';

import {RNReverseGeo} from 'NativeModules';

export default {
  current (cb) {
    navigator.geolocation.getCurrentPosition((result) =>
      cb({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude
      })
    );
  },

  reverse (cb) {
    RNReverseGeo.geoCodeAddress(this.state.location, (result) =>
      cb({
        latitude: Number(result.coords.latitude),
        longitude: Number(result.coords.longitude)
      })
    );
  }
};
