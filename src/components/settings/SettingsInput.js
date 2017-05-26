'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, ViewPropTypes} from 'react-native';

import toInputValue from '../../helpers/toInputValue';

const styles = StyleSheet.create({
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

export default class SettingsInput extends Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    inputStyle: ViewPropTypes.style,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  render() {
    const {containerStyle, inputStyle, defaultValue, ...rest} = this.props;
    return (
      <View style={[styles.settingsInputContainer, containerStyle]}>
        <TextInput
          {...rest}
          autoCorrect={false}
          autoCapitalize='none'
          defaultValue={toInputValue(defaultValue)}
          style={[styles.settingsInput, inputStyle]}
        />
      </View>
    );
  }
}
