'use strict';

import React, {Component} from 'react';

import ErrorOverlay from './overlay/ErrorOverlay';
import Drawer from './CaptureDrawer';
import GeoMap from './GeohashMap';
import Settings from './settings/Settings';
import geolocation from '../helpers/geolocation';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      latitude: null,
      longitude: null,
      error: null,
      days: 3
    };
  }

  // ==========================
  // Lifecycle
  // ==========================
  componentDidMount() {
    geolocation.current(
      (coords) => this.setState(coords),
      (error) => this.setState({error})
    );
  }

  // ==========================
  // Bound Handlers
  // ==========================
  onDrawerClose = () => {
    this.setState(this.refs.settings.getValues());
  }

  onDrawerPan = (r) => ({
    drawer: {
      style: {
        transform: [
          // Left parallax from -150
          {translateX: -150 * (1 - r)}, // eslint-disable-line no-magic-numbers
          // Scale up from 95%
          {scale: 0.9 + (r * 0.1)} // eslint-disable-line no-magic-numbers
        ]
      }
    }
  })

  // ==========================
  // Render
  // ==========================
  render() {
    const drawerProps = {
      content: <Settings ref='settings' {...this.state} />,
      onClose: this.onDrawerClose,
      tweenHandler: this.onDrawerPan
    };
    return (
      <Drawer {...drawerProps}>
        <GeoMap {...this.state} />
        <ErrorOverlay error={this.state.error} />
      </Drawer>
    );
  }
}
