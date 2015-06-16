'use strict';

import React, {View, StyleSheet} from 'react-native';

import Map from './GeohashMap';
import DayPicker from './DayPicker';
import LocationInput from './LocationInput';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const App = React.createClass({
  componentDidMount () {
    this.setState({fetching: true});
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude, fetching: false, error: null}),
      (err) => this.setState({error: err, fetching: false, location: null}),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  },

  getInitialState () {
    return {
      latitude: null,
      longitude: null,
      fetching: null,
      error: null,
      date: new Date(),
      days: 1
    };
  },

  render () {
    return (
      <View style={styles.container}>
        <DayPicker
          date={this.state.date}
          onDateChange={date => this.setState({date})}
        />
        <LocationInput
          value={this.state.latitude}
          onBlur={latitude => this.setState({latitude})}
        />
        <LocationInput
          value={this.state.longitude}
          onBlur={longitude => this.setState({longitude})}
        />
        <Map
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          date={this.state.date}
          days={this.state.days}
        />
      </View>
    );
  }
});

export default App;
