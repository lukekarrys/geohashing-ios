'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    paddingTop: 8,
    paddingLeft: 9,
    width: 42,
    height: 42,
    backgroundColor: '#ccc'
  }
});

export default class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string,
    size: PropTypes.number
  };

  static defaultProps = {
    size: 24
  };

  render() {
    return (
      <Button onPress={this.props.onPress} containerStyle={styles.button}>
        <Icon
          color='#ffffff'
          name={this.props.name}
          size={this.props.size}
        />
      </Button>
    );
  }
}
