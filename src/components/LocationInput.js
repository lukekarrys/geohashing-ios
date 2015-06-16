'use strict';

import React, {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  }
});

const LocationInput = React.createClass({
  propTypes: {
    onBlur: React.PropTypes.func.isRequired,
    value: React.PropTypes.number
  },

  render () {
    return (
      <TextInput
          keyboardType={'decimal-pad'}
          style={styles.textInput}
          clearButtonMode={'while-editing'}
          autoCorrect={false}
          autoCapitalize={'none'}
          {...this.props}
          onBlur={event => this.props.onBlur(Number(event.nativeEvent.text))}
          value={this.props.value != null ? this.props.value.toString() : ''}
        />
    );
  }
});

export default LocationInput;
