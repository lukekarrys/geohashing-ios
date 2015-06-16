'use strict';

import React, {View, StyleSheet} from 'react-native';
import Button from 'react-native-button';

import Map from './GeohashMap';
import DayPicker from './DayPicker';
import LocationInput from './LocationInput';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 40,
    backgroundColor: 'yellow',
    paddingTop: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1
  },
  editButton: {
    marginTop: 20
  }
});

const App = React.createClass({
  componentDidMount () {
    this.setState({fetching: true});
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude, fetching: false, error: null}),
      // FIXME: add back when #1 is fixed
      // (err) => this.setState({error: err, fetching: false, location: null}),
      // {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  },

  getInitialState () {
    return {
      latitude: null,
      longitude: null,
      fetching: null,
      error: null,
      editing: false,
      date: new Date(),
      days: 1
    };
  },

  _onDoneEditing () {
    // The LocationInputs keep track of their internal state.
    // This is necessary because on pressing on the Done button
    // the inputs are reset (for some reason) to their last blurred value
    // so we set the current state when it is pressed to their current values.
    this.setState({
      editing: false,
      latitude: this.refs.latitudeInput.getValue(),
      longitude: this.refs.longitudeInput.getValue()
    });
  },

  _onStartEditing () {
    this.setState({editing: true});
  },

  render () {
    return (
      <View style={styles.container}>
        {this.state.editing
          ?
          <View>
            <DayPicker
              date={this.state.date}
              onDateChange={date => this.setState({date})}
            />
            <LocationInput
              ref={'latitudeInput'}
              value={this.state.latitude}
            />
            <LocationInput
              ref={'longitudeInput'}
              value={this.state.longitude}
            />
            <Button style={styles.button} onPress={this._onDoneEditing}>Done</Button>
          </View>
          :
          <Button style={[styles.button, styles.editButton]} onPress={this._onStartEditing}>Edit</Button>
        }
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
