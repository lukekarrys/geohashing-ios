'use strict';

import React, {Component} from 'react';
import {pick} from 'lodash';

import Drawer from './CaptureDrawer';
import GeoMap from './GeohashMap';
import geolocation from '../helpers/geolocation';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      latitude: null,
      longitude: null,
      error: null,
      days: 3
    };
  }

  componentDidMount() {
    geolocation.current((error, coords) => this.setState({...coords, error}));
  }

  handleSettingsChange = (settings) => {
    this.setState(settings);
  }

  render() {
    const data = pick(this.state, 'latitude', 'longitude', 'date', 'days');
    return (
      <Drawer onChange={this.handleSettingsChange} {...data}>
        <GeoMap {...data} error={this.state.error} />
      </Drawer>
    );
  }
}
