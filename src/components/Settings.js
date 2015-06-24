'use strict';

import React, {View, StyleSheet, TextInput, Text, PropTypes, DatePickerIOS} from 'react-native';
import Button from 'react-native-button';
import assign from 'lodash/object/assign';
import Icon from 'react-native-icons';

const styles = StyleSheet.create({
  locationIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#ccc'
  },
  flexRow: {
    flexDirection: 'row'
  },
  geoInput: {
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
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textInputContainer: {
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
      <View style={[styles.textInputContainer, containerStyle]}>
        <TextInput {...rest} style={[styles.textInput, inputStyle]} />
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
        containerStyle={[styles.geoInput, style]}
        keyboardType='numbers-and-punctuation'
        clearButtonMode='while-editing'
        autoCorrect={false}
        autoCapitalize='none'
        {...rest}
      />
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        this.setState({latitude, longitude});
      }
    );
  },

  render () {
    return (
      <View style={{marginTop: 20}}>
        <SettingsRow label='Coordinates' style={styles.flexRow}>
          <GeoInput
            name='Latitude'
            onChangeText={latitude => this.setValues({latitude: Number(latitude)})}
            value={this.state.latitude != null ? this.state.latitude.toString() : ''}
          />
          <GeoInput
            name='Longitude'
            onChangeText={longitude => this.setValues({longitude: Number(longitude)})}
            value={this.state.longitude != null ? this.state.longitude.toString() : ''}
          />
          <Button onPress={this._handleCurrentLocation}>
            <Icon
              name='fontawesome|location-arrow'
              size={20}
              style={styles.locationIcon}
            />
          </Button>
        </SettingsRow>

        <SettingsRow label='Find Location'>
          <SettingsInput placeholder='City, State' />
        </SettingsRow>

        <SettingsRow label='Following days to find'>
          <SettingsInput
            placeholder='4'
            keyboardType='number-pad'
            onChangeText={days => this.setValues({days: Number(days)})}
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
