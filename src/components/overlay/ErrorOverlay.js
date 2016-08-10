'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, StyleSheet} from 'react-native';
import {VibrancyView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

const FADE_IN_LENGTH = 1000;
const FADE_OUT_LENGTH = 100;

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

export default class ErrorOverlay extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error)
  }

  render() {
    return (
      <FadeOverlay isVisible={!!this.props.error} fadeIn={FADE_IN_LENGTH} fadeOut={FADE_OUT_LENGTH}>
        <VibrancyView style={styles.background} blurType='dark'>
          <Text>{this.props.error && this.props.error.message}</Text>
        </VibrancyView>
      </FadeOverlay>
    );
  }
}
