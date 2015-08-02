'use strict';

import React, {Component, View, PropTypes, StyleSheet} from 'react-native';
import tween from 'react-native-drawer/Tweener';

const styles = StyleSheet.create({
  fullBackground: {
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

class FadeOverlay extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    fullBackground: PropTypes.bool
  }

  static defaultProps = {
    isVisible: false,
    fullBackground: false
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
    const style = this.props.fullBackground ? styles.fullBackground : null;
    return (
      <View ref={c => this.overlay = c} style={style}>
        {this.props.children}
      </View>
    );
  }
}

export default FadeOverlay;
