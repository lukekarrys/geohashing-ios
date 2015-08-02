'use strict';

import React, {Component, PropTypes, Text, StyleSheet} from 'react-native';
import {VibrancyView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: 40,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ErrorOverlay extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  }

  static defaultProps = {
    isVisible: false
  }

  render () {
    return (
      <FadeOverlay isVisible={this.props.isVisible} fadeIn={1000} fadeOut={100}>
        <VibrancyView style={styles.background} blurType='dark'>
          <Text>{this.props.error}</Text>
        </VibrancyView>
      </FadeOverlay>
    );
  }
}

export default ErrorOverlay;
