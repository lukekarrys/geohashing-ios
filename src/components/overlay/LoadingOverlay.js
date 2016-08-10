'use strict';

import React, {Component, PropTypes} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

const FADE_IN_LENGTH = 100;
const FADE_OUT_LENGTH = 500;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class LoadingOverlay extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isVisible: false
  }

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
