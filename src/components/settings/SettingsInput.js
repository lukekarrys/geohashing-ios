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
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  render() {
    const {containerStyle, inputStyle, defaultValue, ...rest} = this.props;
    return (
      <View style={[styles.settingsInputContainer, containerStyle]}>
        <TextInput
          {...rest}
          defaultValue={toInputValue(defaultValue)}
          style={[styles.settingsInput, inputStyle]}
        />
      </View>
    );
  }
}
