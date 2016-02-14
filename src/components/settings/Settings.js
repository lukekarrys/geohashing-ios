'use strict';

import React, {StyleSheet, View, PropTypes, DatePickerIOS, Component} from 'react-native';
import assign from 'lodash/assign';

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

export default class Settings extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    days: PropTypes.number
  }

  // ==========================
  // Lifecycle
  // ==========================
  constructor(props) {
    super(props);
    this.values = {};
    this.state = getNamedProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(getNamedProps(props));
  }

  // ==========================
  // Bound Handlers
  // ==========================
  setValues = (values) => {
    assign(this.values, values);
  }

  // This public to allow for the parent view to get the latest data from
  // settings. Some of the input events dont fire if they are still active as
  // the settings drawer is being closed. And since inputs are controlled, we
  // cant use setState or we get dropped keystrokes.
  getValues = () => assign({}, this.state, this.values || {})

  // Setting coordinates requires setting state to update UI and setting
  // values so they can be fetched when the drawer closes
  setCoords = (coords) => {
    this.setState(coords);
    this.handleLatitude(coords.latitude);
    this.handleLocation(coords.longitude);
  }

  handleCurrentLocation = () => {
    geolocation.current(this.setCoords);
  }

  handleLocationSearch = (e) => {
    geolocation.reverse(e ? getText(e) : this.values.location, this.setCoords);
  }

  handleLocation = (e) => {
    this.setValues({location: getText(e)});
  }

  handleLatitude = (e) => {
    this.setValues({latitude: toNumber(getText(e))});
  }

  handleLongitude = (e) => {
    this.setValues({longitude: toNumber(getText(e))});
  }

  handleDays = (e) => {
    this.setValues({days: toNumber(getText(e))});
  }

  handleDate = (date) => {
    this.setState({date});
  }

  // ==========================
  // Render
  // ==========================
  render() {
    return (
      <View style={{marginTop: 20}}>
        <SettingsRow label='Coordinates' style={styles.flexRow}>
          <GeoInput
            name='Latitude'
            onChangeText={this.handleLatitude}
            onSubmitEditing={this.handleLatitude}
            defaultValue={this.state.latitude}
          />
          <GeoInput
            name='Longitude'
            onChangeText={this.handleLongitude}
            onSubmitEditing={this.handleLongitude}
            defaultValue={this.state.longitude}
          />
          <IconButton
            onPress={this.handleCurrentLocation}
            name='location-arrow'
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
            name='search'
          />
        </SettingsRow>

        <SettingsRow label='Following days to find'>
          <SettingsInput
            placeholder='4'
            // TODO: use 'number-pad' instead once I figure out how
            // to clear it. Currently 'numbers-and-puncutation' is the only
            // numbers related keyboard that has a return key to close the keyboard
            keyboardType='numbers-and-punctuation'
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

      </View>
    );
  }
}
