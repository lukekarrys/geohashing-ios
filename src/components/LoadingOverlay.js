'use strict';

import React, {Component, View, PropTypes, ActivityIndicatorIOS, StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';
import tween from 'react-native-drawer/Tweener';

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

  componentWillReceiveProps (nextProps) {
    if (nextProps.isVisible && !this.props.isVisible) {
      this._fadeOverlay(0, 1, 100);
    }
    else if (!nextProps.isVisible && this.props.isVisible) {
      this._fadeOverlay();
    }
  }

  _fadeOverlay = (start = 1, end = 0, duration = 500) => {
    const {overlay: o} = this;
    o.setNativeProps({opacity: start});
    tween({
      start,
      end,
      duration,
      easingType: 'linear',
      onFrame: (opacity) => o.setNativeProps({opacity}),
      onEnd: () => o.setNativeProps({opacity: end})
    });
  }

  render () {
    return (
      <View ref={c => this.overlay = c} style={styles.background}>
        <BlurView style={styles.background} blurType='light'>
          <ActivityIndicatorIOS
            size='large'
            animating={true}
            style={styles.spinner}
          />
        </BlurView>
      </View>
    );
  }
}

export default LoadingOverlay;
