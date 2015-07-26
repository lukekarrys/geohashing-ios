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
    cb({
      latitude: 34,
      longitude: -111
    });
  }
};
