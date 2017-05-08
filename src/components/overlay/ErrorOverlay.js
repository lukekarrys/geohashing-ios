'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {VibrancyView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

const FADE_IN_LENGTH = 1000;
const FADE_OUT_LENGTH = 100;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: 40,
    borderWidth: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
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
          <Text style={styles.text}>{this.props.error && this.props.error.message}</Text>
        </VibrancyView>
      </FadeOverlay>
    );
  }
}
