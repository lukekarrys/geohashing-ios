'use strict';

import React, {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderTopWidth: 2,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row'
  }
});

const LocationInput = React.createClass({
  propTypes: {
    value: React.PropTypes.number
  },

  componentDidMount () {
    this._value = this.props.value;
  },

  componentWillReceiveProps (props) {
    this._value = props.value;
  },

  getValue () {
    return this._value;
  },

  _onChange (event) {
    this._value = Number(event.nativeEvent.text);
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
        onChange={this._onChange}
        value={this.props.value != null ? this.props.value.toString() : ''}
      />
    );
  }
});

export default LocationInput;
