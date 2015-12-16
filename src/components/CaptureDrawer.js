'use strict';

import React, {StyleSheet, View, Component, PropTypes} from 'react-native';
import Drawer from 'react-native-drawer';

import screen from '../helpers/deviceDimensions';

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    flex: 1
  },
  panCapture: {
    height: screen.height,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0
  }
});

// Use the props.panOpenMask prop that gets passed down to react-native-drawer
// to calculate the width of an invisible view that gets absolutely positioned
// against the left side of the screen. This will capture any touches and not
// propogate them to any other views meaning props.children wont get panned
// while the drawer is being panned.
export default class CaptureDrawer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    panOpenMask: PropTypes.number.isRequired
  }

  render() {
    const {children, ...drawerProps} = this.props;
    const panOpenWidth = screen.width * drawerProps.panOpenMask;
    return (
      <Drawer {...drawerProps}>
        <View style={styles.drawer}>
          {children}
          <View style={[styles.panCapture, {width: panOpenWidth}]} />
        </View>
      </Drawer>
    );
  }
}
