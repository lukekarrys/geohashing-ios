'use strict';

import React from 'react-native';
import Geo from 'geo-graticule';

import Map from './GeohashMap';

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
      (err) => this.setState({error: err, fetching: false, location: null})
    );
  },

  getInitialState () {
    return {
      location: null,
      fetching: null,
      error: null
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
        <Map location={this.state.location} date='2015-05-22' days={4} />
      </View>
    );
  }
});

export default App;
