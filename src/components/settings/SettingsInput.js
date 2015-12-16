'use strict';

import React, {StyleSheet, View, TextInput, Component, PropTypes} from 'react-native';

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
    containerStyle: View.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    value: PropTypes.string
  }

  render() {
    const {containerStyle, inputStyle, value, ...rest} = this.props;
    return (
      <View style={[styles.settingsInputContainer, containerStyle]}>
        <TextInput
          {...rest}
          value={toInputValue(value)}
          style={[styles.settingsInput, inputStyle]}
        />
      </View>
    );
  }
}
