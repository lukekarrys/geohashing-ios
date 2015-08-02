'use strict';

import React, {Component} from 'react-native';

import Drawer from './CaptureDrawer';
import GeoMap from './GeohashMap';
import Settings from './settings/Settings';
import geolocation from '../helpers/geolocation';

class Main extends Component {
  state = {
    date: new Date(),
    latitude: null,
    longitude: null,
    days: 3
  }

  // ==========================
  // Lifecycle
  // ==========================
  componentDidMount () {
    geolocation.current(coords => this.setState(coords));
  }

  // ==========================
  // Bound Handlers
  // ==========================
  _onDrawerClose = () => {
    this.setState(this.refs.settings.getValues());
  }

  _onDrawerPan = (r) => {
    return {
      drawer: {
        opacity: r,
        style: {
          transform: [
            // Left parallax from -150
            {translateX: -150 * (1 - r)},
            // Scale up from 95%
            {scale: 0.95 + (r * 0.05)}
          ]
        }
      }
    };
  }

  // ==========================
  // Render
  // ==========================
  render () {
    const drawerProps = {
      type: 'static',
      panOpenMask: 0.1,
      content: <Settings ref='settings' {...this.state} />,
      onClose: this._onDrawerClose,
      tweenHandler: this._onDrawerPan
    };
    return (
      <Drawer {...drawerProps}>
        <GeoMap {...this.state} />
      </Drawer>
    );
  }
}

export default Main;
