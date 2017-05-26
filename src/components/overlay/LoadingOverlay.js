'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

const FADE_IN_LENGTH = 100;
const FADE_OUT_LENGTH = 500;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class LoadingOverlay extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isVisible: false
  };

  render() {
    return (
      <FadeOverlay
        fullBackground
        isVisible={this.props.isVisible}
        fadeIn={FADE_IN_LENGTH}
        fadeOut={FADE_OUT_LENGTH}
      >
        <BlurView style={styles.background} blurType='light'>
          <ActivityIndicator
            size='large'
            animating
            style={styles.spinner}
          />
        </BlurView>
      </FadeOverlay>
    );
  }
}
