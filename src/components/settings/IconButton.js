'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  iconButton: {
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
  }

  static defaultProps = {
    size: 20
  }

  render() {
    return (
      <Button onPress={this.props.onPress}>
        <View>
          <Icon
            color='#ffffff'
            name={this.props.name}
            size={this.props.size}
            style={styles.iconButton}
          />
        </View>
      </Button>
    );
  }
}
