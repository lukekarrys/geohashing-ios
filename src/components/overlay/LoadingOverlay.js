'use strict';

import React, {Component, PropTypes, ActivityIndicatorIOS, StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';

import FadeOverlay from './FadeOverlay';

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

class LoadingOverlay extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isVisible: false
  }

  render () {
    return (
      <FadeOverlay fullBackground={true} isVisible={this.props.isVisible}>
        <BlurView style={styles.background} blurType='light'>
          <ActivityIndicatorIOS
            size='large'
            animating={true}
            style={styles.spinner}
          />
        </BlurView>
      </FadeOverlay>
    );
  }
}

export default LoadingOverlay;
