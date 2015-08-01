'use strict';

import React, {MapView, StyleSheet, Component} from 'react-native';

import geohashAnnotations from '../helpers/geohashAnnotations';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class GeohashMap extends Component {
  static propTypes = {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number,
    date: React.PropTypes.instanceOf(Date),
    days: React.PropTypes.number
  }

  // ==========================
  // Lifecycle
  // ==========================
  constructor (props) {
    super(props);
    this.state = {
      annotations: null,
      region: null,
      error: null,
      fetching: null
    };
  }

  componentDidMount () {
    this._respondToProps(this.props);
  }

  componentWillReceiveProps (props) {
    this._respondToProps(props);
  }

  _respondToProps (props) {
    this.setState({fetching: true});
    geohashAnnotations(props, (err, results) => {
      if (err) {
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
  }

  // ==========================
  // Render
  // ==========================
  render () {
    return (
      <MapView
        style={styles.container}
        annotations={this.state.annotations}
        region={this.state.region}
      />
    );
  }
}

export default GeohashMap;
