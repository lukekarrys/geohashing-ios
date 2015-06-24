'use strict';

import React, {StyleSheet, View} from 'react-native';
import Drawer from 'react-native-drawer';

import Map from './GeohashMap';
import Settings from './Settings';

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    flex: 1
  }
});

const Main = React.createClass({
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude}),
      // FIXME: add back when #1 is fixed
      // (err) => this.setState({error: err, fetching: false, location: null}),
      // {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
  },

  getInitialState () {
    return {
      date: new Date(),
      latitude: null,
      longitude: null,
      days: 1
    };
  },

  _onDrawerClose () {
    const settings = this.refs.settings.getValues();
    this.setState(settings);
  },

  render () {
    const drawerContent = <Settings ref='settings' {...this.state} />;
    return (
      <Drawer type='static' content={drawerContent} onClose={this._onDrawerClose}>
        <View style={styles.drawer}><Map {...this.state} /></View>
      </Drawer>
    );
  }
});

export default Main;
