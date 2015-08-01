'use strict';

import React, {StyleSheet, View, PropTypes, DatePickerIOS, Component} from 'react-native';
import assign from 'lodash/object/assign';

import GeoInput from './GeoInput';
import IconButton from './IconButton';
import SettingsInput from './SettingsInput';
import SettingsRow from './SettingsRow';
import geolocation from '../../helpers/geolocation';
import toNumber from '../../helpers/toNumber';
import toInputValue from '../../helpers/toInputValue';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  },
  rowInput: {
    flex: 1,
    borderRightWidth: 1
  }
});

const getNamedProps = (props) => {
  const {latitude, longitude, date, days} = props;
  return {latitude, longitude, date, days};
};

const getText = (e) => toInputValue(e.nativeEvent ? e.nativeEvent.text : e);

class Settings extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    days: PropTypes.number
  }

  // ==========================
  // Lifecycle
  // ==========================
  constructor (props) {
    super(props);
    this._values = {};
    this.state = getNamedProps(props);
  }

  componentWillReceiveProps (props) {
    this.setState(getNamedProps(props));
  }

  // ==========================
  // Bound Handlers
  // ==========================
  _setValues = (values) => {
    assign(this._values, values);
  }

  // This public to allow for the parent view to get the latest data from
  // settings. Some of the input events dont fire if they are still active as
  // the settings drawer is being closed. And since inputs are controlled, we
  // cant use setState or we get dropped keystrokes.
  getValues = () => {
    return assign({}, this.state, this._values || {});
  }

  // Setting coordinates requires setting state to update UI and setting
  // values so they can be fetched when the drawer closes
  _setCoords = (coords) => {
    this.setState(coords);
    this._handleLatitude(coords.latitude);
    this._handleLocation(coords.longitude);
  }

  _handleCurrentLocation = () => {
    geolocation.current(this._setCoords);
  }

  _handleLocationSearch = (e) => {
    geolocation.reverse(e ? getText(e) : this._values.location, this._setCoords);
  }

  _handleLocation = (e) => {
    this._setValues({location: getText(e)});
  }

  _handleLatitude = (e) => {
    this._setValues({latitude: toNumber(getText(e))});
  }

  _handleLongitude = (e) => {
    this._setValues({longitude: toNumber(getText(e))});
  }

  _handleDays = (e) => {
    this._setValues({days: toNumber(getText(e))});
  }

  _handleDate = (date) => {
    this.setState({date});
  }

  // ==========================
  // Render
  // ==========================
  render () {
    return (
      <View style={{marginTop: 20}}>
        <SettingsRow label='Coordinates' style={styles.flexRow}>
          <GeoInput
            name='Latitude'
            onChangeText={this._handleLatitude}
            onSubmitEditing={this._handleLatitude}
            value={this.state.latitude}
          />
          <GeoInput
            name='Longitude'
            onChangeText={this._handleLongitude}
            onSubmitEditing={this._handleLongitude}
            value={this.state.longitude}
          />
          <IconButton
            onPress={this._handleCurrentLocation}
            name='location-arrow'
            size={20}
          />
        </SettingsRow>

        <SettingsRow label='Find Location' style={styles.flexRow}>
          <SettingsInput
            placeholder='City, State'
            containerStyle={styles.rowInput}
            onChangeText={this._handleLocation}
            onSubmitEditing={this._handleLocationSearch}
            returnKeyType='search'
          />
          <IconButton
            onPress={this._handleLocationSearch}
            name='search'
            size={20}
          />
        </SettingsRow>

        <SettingsRow label='Following days to find'>
          <SettingsInput
            placeholder='4'
            // TODO: use 'number-pad' instead once I figure out how
            // to clear it. Currently 'numbers-and-puncutation' is the only
            // numbers related keyboard that has a return key to close the keyboard
            keyboardType='numbers-and-punctuation'
            onChangeText={this._handleDays}
            value={this.state.days}
          />
        </SettingsRow>

        <SettingsRow label='Starting Date'>
          <DatePickerIOS
            mode='date'
            timeZoneOffsetInMinutes={-1 * new Date().getTimezoneOffset()}
            maximumDate={new Date()}
            date={this.state.date}
            onDateChange={this._handleDate}
          />
        </SettingsRow>
      </View>
    );
  }
}

export default Settings;
