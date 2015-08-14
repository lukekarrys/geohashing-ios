'use strict';

import React, {Component, View, PropTypes, StyleSheet} from 'react-native';
import tween from 'react-native-drawer/Tweener';

const styles = StyleSheet.create({
  fullBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
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
    fullBackground: PropTypes.bool,
    fadeIn: PropTypes.number,
    fadeOut: PropTypes.number
  }

  static defaultProps = {
    isVisible: false,
    fullBackground: false,
    fadeIn: 100,
    fadeOut: 100
  }

  state = {
    isFading: false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isVisible && !this.props.isVisible) {
      this.fadeOverlay(0, 1, this.props.fadeIn);
    }
    else if (!nextProps.isVisible && this.props.isVisible) {
      this.fadeOverlay(1, 0, this.props.fadeOut);
    }
  }

  fadeOverlay = (start, end, duration) => {
    const {overlay: o} = this;

    this.setState({isFading: true});
    o.setNativeProps({opacity: start});

    tween({
      start,
      end,
      duration,
      easingType: 'linear',
      onFrame: (opacity) => o.setNativeProps({opacity}),
      onEnd: () => {
        this.setState({isFading: false});
        o.setNativeProps({opacity: end});
      }
    });
  }

  render () {
    const propStyle = this.props.fullBackground ? styles.fullBackground : null;
    const opacity = this.props.isVisible ? {opacity: 1} : {opacity: 0};
    const style = [styles.background, propStyle, this.state.isFading ? null : opacity];
    return (
      <View ref={(c) => this.overlay = c} style={style}>
        {this.props.children}
      </View>
    );
  }
}

export default FadeOverlay;
