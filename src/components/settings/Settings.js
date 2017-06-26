
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, DatePickerIOS} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import assign from 'lodash/assign';

import GeoInput from './GeoInput';
import IconButton from './IconButton';
import SettingsInput from './SettingsInput';
import SettingsRow from './SettingsRow';
import ErrorOverlay from '../overlay/ErrorOverlay';
import geolocation from '../../helpers/geolocation';
import toNumber from '../../helpers/toNumber';
import toInputValue from '../../helpers/toInputValue';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 20
  },
  flexRow: {
    flexDirection: 'row'
  },
  rowInput: {
    flex: 1,
    borderRightWidth: 1
  },
  error: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

const getText = (e) => toInputValue(e && e.nativeEvent ? e.nativeEvent.text : e);

export default class Settings extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    days: PropTypes.number
  };

  static defaultProps = {
    latitude: null,
    longitude: null,
    date: new Date(),
    days: 3
  };

  constructor(props) {
    super(props);
    this.values = {};
    const {latitude, longitude, date, days} = props;
    this.state = {latitude, longitude, date, days};
  }

  componentWillReceiveProps(props) {
    const {latitude, longitude, date, days} = props;
    this.setState({latitude, longitude, date, days});
  }

  setValues = (values) => {
    assign(this.values, values);
  };

  // This public to allow for the parent view to get the latest data from
  // settings. Some of the input events dont fire if they are still active as
  // the settings drawer is being closed. And since inputs are controlled, we
  // cant use setState or we get dropped keystrokes.
  getValues = () => assign({}, this.state, this.values);

  // Setting coordinates requires setting state to update UI and setting
  // values so they can be fetched when the drawer closes
  setCoords = (error, coords = {}) => {
    if (error) {
      this.setState({error});
      this.setValues({latitude: null, longitude: null});
    }
    else {
      this.setState({error: null, ...coords});
      this.handleLatitude(coords.latitude);
      this.handleLocation(coords.longitude);
    }
  };

  handleCurrentLocation = (e) => {
    this.setState({loadingGeo: true});
    geolocation.current((error, coords) => {
      this.setState({loadingGeo: false});
      this.setCoords(error, coords);
    });
  };

  handleLocationSearch = (e) => {
    this.setState({loadingLocation: true});
    geolocation.reverse(this.values.location, (error, coords) => {
      this.setState({loadingLocation: false});
      this.setCoords(error, coords);
    });
  };

  handleLocation = (e) => {
    this.setValues({location: getText(e)});
  };

  handleLatitude = (e) => {
    this.setValues({latitude: toNumber(getText(e))});
  };

  handleLongitude = (e) => {
    this.setValues({longitude: toNumber(getText(e))});
  };

  handleDays = (e) => {
    this.setValues({days: toNumber(getText(e))});
  };

  handleDate = (date) => {
    this.setState({date});
    dismissKeyboard();
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingsRow label='Coordinates' style={styles.flexRow}>
          <GeoInput
            name='Latitude'
            keyboardType='numbers-and-punctuation'
            onChangeText={this.handleLatitude}
            onSubmitEditing={this.handleLatitude}
            defaultValue={this.state.latitude}
          />
          <GeoInput
            name='Longitude'
            keyboardType='numbers-and-punctuation'
            onChangeText={this.handleLongitude}
            onSubmitEditing={this.handleLongitude}
            defaultValue={this.state.longitude}
          />
          <IconButton
            onPress={this.handleCurrentLocation}
            name={this.state.loadingGeo ? 'spinner' : 'location-arrow'}
          />
        </SettingsRow>

        <SettingsRow label='Find Location' style={styles.flexRow}>
          <SettingsInput
            placeholder='City, State'
            containerStyle={styles.rowInput}
            onChangeText={this.handleLocation}
            onSubmitEditing={this.handleLocationSearch}
            returnKeyType='search'
          />
          <IconButton
            onPress={this.handleLocationSearch}
            name={this.state.loadingLocation ? 'spinner' : 'search'}
          />
        </SettingsRow>

        <SettingsRow label='Following days to find'>
          <SettingsInput
            placeholder='3'
            keyboardType='numeric'
            onChangeText={this.handleDays}
            defaultValue={this.state.days}
          />
        </SettingsRow>

        <SettingsRow label='Starting Date'>
          <DatePickerIOS
            mode='date'
            timeZoneOffsetInMinutes={-1 * new Date().getTimezoneOffset()}
            maximumDate={new Date()}
            date={this.state.date}
            onDateChange={this.handleDate}
          />
        </SettingsRow>

        <View style={styles.error}>
          <ErrorOverlay error={this.state.error} />
        </View>
      </View>
    );
  }
}
