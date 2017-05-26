'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import Drawer from 'react-native-drawer';
import {BlurView} from 'react-native-blur';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import {pick} from 'lodash';

import Settings from './settings/Settings';
import screen from '../helpers/deviceDimensions';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  panCapture: {
    ...StyleSheet.absoluteFillObject,
    height: screen.height,
    backgroundColor: 'transparent'
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  }
});

const defaultDrawerProps = {
  type: 'static',
  acceptDoubleTap: true,
  tapToClose: true,
  panOpenMask: 0.1,
  panCloseMask: 0,
  openDrawerOffset: 0.1,
  styles: {mainOverlay: {opacity: 0}},
  onCloseStart: () => dismissKeyboard(),
  mainOverlay: <BlurView style={styles.blur} blurType='light' />,
  tweenHandler: (ratio) => ({
    ...Drawer.tweenPresets.parallax(ratio),
    mainOverlay: {opacity: ratio * 2}
  })
};

// Use the props.panOpenMask prop that gets passed down to react-native-drawer
// to calculate the width of an invisible view that gets absolutely positioned
// against the left side of the screen. This will capture any touches and not
// propogate them to any other views meaning props.children wont get panned
// while the drawer is being panned.
export default class CaptureDrawer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func
  };

  handleClose = () => {
    this.props.onChange(this.settings.getValues());
  };

  getContent() {
    return (
      <Settings
        {...pick(this.props, 'latitude', 'longitude', 'days', 'date')}
        ref={(c) => {this.settings = c;}}
      />
    );
  }

  render() {
    const {children} = this.props;
    const panOpenWidth = screen.width * defaultDrawerProps.panOpenMask;

    return (
      <Drawer content={this.getContent()} {...defaultDrawerProps} onClose={this.handleClose}>
        <View style={styles.main}>
          {children}
          <View style={[styles.panCapture, {width: panOpenWidth}]} />
        </View>
      </Drawer>
    );
  }
}
