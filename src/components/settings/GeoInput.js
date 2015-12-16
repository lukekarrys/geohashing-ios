'use strict';

import React, {StyleSheet, View, PropTypes, Component} from 'react-native';

import SettingsInput from './SettingsInput';

const styles = StyleSheet.create({
  rowInput: {
    flex: 1,
    borderRightWidth: 1
  }
});

export default class GeoInput extends Component {
  static propTypes = {
    style: View.propTypes.style,
    name: PropTypes.string
  }

  render() {
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
}
