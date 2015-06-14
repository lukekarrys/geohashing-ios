'use strict';

import React from 'react-native';
import Geo from 'geo-graticule';

import Map from './GeohashMap';

const today = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString();
  const dd = d.getDate().toString();
  return `${yyyy}-${mm[1] ? mm : '0' + mm[0]}-${dd[1] ? dd : '0' + dd[0]}`;
};

const {View, StyleSheet, Text} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  navbarText: {
    fontSize: 16,
    marginVertical: 10,
    flex: 2,
    textAlign: 'center'
  }
});

const App = React.createClass({
  componentDidMount () {
    this.setState({fetching: true});
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({location: position.coords, fetching: false, error: null}),
      (err) => this.setState({error: err, fetching: false, location: null}),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  },

  getInitialState () {
    return {
      location: null,
      fetching: null,
      error: null,
      date: today()
    };
  },

  render () {
    let message;

    if (this.state.error) {
      message = 'Error: ' + this.state.error.message;
    }
    else if (this.state.fetching) {
      message = 'Fetching User Location';
    }
    else if (this.state.location) {
      message = new Geo(this.state.location).toArray().map((val) => val.toFixed(2)).join(', ');
    }

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>{message}</Text>
        </View>
        <Map location={this.state.location} date={this.state.date} days={4} />
      </View>
    );
  }
});

export default App;
