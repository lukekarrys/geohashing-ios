'use strict';

import React, {StyleSheet, View, PropTypes, Component} from 'react-native';
import Button from 'react-native-button';
import {Icon} from 'react-native-icons';

const styles = StyleSheet.create({
  iconButton: {
    width: 42,
    height: 42,
    backgroundColor: '#ccc'
  }
});

class IconButton extends Component {
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
            name={`fontawesome|${this.props.name}`}
            size={this.props.size}
            style={styles.iconButton}
          />
        </View>
      </Button>
    );
  }
}

export default IconButton;
