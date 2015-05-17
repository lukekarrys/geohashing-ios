'use strict';

import React from 'react-native';
import StyleSheet from 'StyleSheet';

const {MapView, View} = React;

const styles = StyleSheet.create({
  map: {
    height: 400,
    marginTop: 20
  }
});

const AppMapView = React.createClass({
  getInitialState () {
    return {
      annotations: null,
      isFirstLoad: true
    };
  },

  render () {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChangeComplete={this._onRegionChangeComplete}
          annotations={this.state.annotations}
          showsUserLocation={true}
        />
      </View>
    );
  },

  _getAnnotations (region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here'
    }, {
      longitude: region.longitude + 2,
      latitude: region.latitude + 2,
      title: 'You Are Here 2'
    }];
  },

  _onRegionChangeComplete (region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false
      });
    }
  }
});

export default AppMapView;
