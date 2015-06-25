'use strict';

import React from 'react-native';

import geohashAnnotations from './helpers/geohashAnnotations';

const {MapView, StyleSheet} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const GeohashMap = React.createClass({
  propTypes: {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    date: React.PropTypes.instanceOf(Date),
    days: React.PropTypes.number
  },

  getInitialState () {
    return {
      annotations: null,
      region: null,
      error: null,
      fetching: null
    };
  },

  componentDidMount () {
    this._respondToProps(this.props);
  },

  componentWillReceiveProps (props) {
    this._respondToProps(props);
  },

  _respondToProps (props) {
    this.setState({fetching: true});
    geohashAnnotations(props, (err, results) => {
      if (err) {
        // TODO: remove console when error indicator is working #7
        console.error(err);  // eslint-disable-line no-console
        this.setState({
          error: err.message,
          fetching: false
        });
      }
      else {
        this.setState({
          fetching: false,
          annotations: results.annotations,
          region: {
            latitude: results.center.latitude,
            longitude: results.center.longitude,
            latitudeDelta: 3,
            longitudeDelta: 3
          }
        });
      }
    });
  },

  render () {
    return (
      <MapView
        style={styles.container}
        annotations={this.state.annotations}
        region={this.state.region}
      />
    );
  }
});

export default GeohashMap;
