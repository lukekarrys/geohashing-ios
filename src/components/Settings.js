'use strict';

import React, {View, StyleSheet, TextInput, Text, PropTypes, DatePickerIOS} from 'react-native';
import Button from 'react-native-button';
import assign from 'lodash/object/assign';
import Icon from 'react-native-icons';

import geolocation from './helpers/geolocation';
import toNumber from './helpers/toNumber';

const styles = StyleSheet.create({
  iconButton: {
    width: 42,
    height: 42,
    backgroundColor: '#ccc'
  },

  flexRow: {
    flexDirection: 'row'
  },
  rowInput: {
    flex: 1,
    borderRightWidth: 1
  },

  settingsRow: {
    marginTop: 20
  },
  settingsRowLabel: {
    paddingLeft: 10,
    paddingBottom: 5
  },

  settingsInput: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  settingsInputContainer: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});

const SettingsRow = React.createClass({
  propTypes: {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    style: View.propTypes.style,
    label: PropTypes.string
  },

  render () {
    return (
      <View style={styles.settingsRow}>
        <Text style={styles.settingsRowLabel}>{this.props.label}</Text>
        <View style={this.props.style}>{this.props.children}</View>
      </View>
    );
  }
});

const SettingsInput = React.createClass({
  propTypes: {
    containerStyle: View.propTypes.style,
    inputStyle: TextInput.propTypes.style
  },

  render () {
    const {containerStyle, inputStyle, ...rest} = this.props;
    return (
      <View style={[styles.settingsInputContainer, containerStyle]}>
        <TextInput {...rest} style={[styles.settingsInput, inputStyle]} />
      </View>
    );
  }
});

const GeoInput = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    name: PropTypes.string
  },

  render () {
    const {style, name, ...rest} = this.props;
    return (
      <SettingsInput
        placeholder={name}
        containerStyle={[styles.rowInput, style]}
        keyboardType='numbers-and-punctuation'
        clearButtonMode='while-editing'
        autoCorrect={false}
        autoCapitalize='none'
        {...rest}
      />
    );
  }
});

const IconButton = React.createClass({
  propTypes: {
    onPress: PropTypes.func,
    name: PropTypes.string,
    size: PropTypes.number,
    style: View.propTypes.style
  },

  render () {
    return (
      <Button onPress={this.props.onPress}>
        <Icon
          color='#ffffff'
          name={this.props.name}
          size={this.props.size}
          style={styles.iconButton}
        />
      </Button>
    );
  }
});

const Settings = React.createClass({
  propTypes: {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    days: PropTypes.number
  },

  initialize (props) {
    const {latitude, longitude, date, days} = props;
    return {latitude, longitude, date, days};
  },

  getInitialState () {
    return this.initialize(this.props);
  },

  componentWillReceiveProps (props) {
    this.setState(this.initialize(props));
  },

  setValues (values) {
    if (!this._values) {
      this._values = {};
    }
    assign(this._values, values);
  },

  getValues () {
    return assign({}, this.state, this._values || {});
  },

  _handleCurrentLocation () {
    geolocation.current(coords => this.setState(coords));
  },

  _handleLocationSearch () {
    geolocation.reverse(this.state.location, coords => this.setState(coords));
  },

  render () {
    return (
      <View style={{marginTop: 20}}>
        <SettingsRow label='Coordinates' style={styles.flexRow}>
          <GeoInput
            name='Latitude'
            onChangeText={latitude => this.setValues({latitude: toNumber(latitude)})}
            value={this.state.latitude != null ? this.state.latitude.toString() : ''}
          />
          <GeoInput
            name='Longitude'
            onChangeText={longitude => this.setValues({longitude: toNumber(longitude)})}
            value={this.state.longitude != null ? this.state.longitude.toString() : ''}
          />
          <IconButton
            onPress={this._handleCurrentLocation}
            name='fontawesome|location-arrow'
            size={20}
          />
        </SettingsRow>

        <SettingsRow label='Find Location' style={styles.flexRow}>
          <SettingsInput
            placeholder='City, State'
            containerStyle={styles.rowInput}
            onChangeText={location => this.setState({location})}
            onSubmitEditing={location => this.setState({location})}
            returnKeyType='search'
          />
          <IconButton
            onPress={this._handleLocationSearch}
            name='fontawesome|search'
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
            onChangeText={days => this.setValues({days: toNumber(days)})}
            value={this.state.days != null ? this.state.days.toString() : ''}
          />
        </SettingsRow>

        <SettingsRow label='Starting Date'>
          <DatePickerIOS
            mode='date'
            timeZoneOffsetInMinutes={-1 * new Date().getTimezoneOffset()}
            maximumDate={new Date()}
            date={this.state.date}
            onDateChange={date => this.setState({date})}
          />
        </SettingsRow>
      </View>
    );
  }
});

export default Settings;
