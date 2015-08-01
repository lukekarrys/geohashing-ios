'use strict';

import React, {Component} from 'react-native';

import Drawer from './CaptureDrawer';
import GeoMap from './GeohashMap';
import Settings from './settings/Settings';
import geolocation from '../helpers/geolocation';

class Main extends Component {
  // ==========================
  // Lifecycle
  // ==========================
  constructor (props) {
    super(props);
    this.state = {
      date: new Date(),
      latitude: null,
      longitude: null,
      days: 1
    };
  }

  componentDidMount () {
    geolocation.current(coords => this.setState(coords));
  }

  // ==========================
  // Bound Handlers
  // ==========================
  _onDrawerClose = () => {
    this.setState(this.refs.settings.getValues());
  }

  // ==========================
  // Render
  // ==========================
  render () {
    const drawerProps = {
      type: 'static',
      panOpenMask: 0.1,
      content: <Settings ref='settings' {...this.state} />,
      onClose: this._onDrawerClose
    };
    return (
      <Drawer {...drawerProps}><GeoMap {...this.state} /></Drawer>
    );
  }
}

export default Main;
