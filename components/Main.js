import React, {StyleSheet, View, Component} from 'react-native';
import Drawer from 'react-native-drawer';

import GeoMap from './GeohashMap';
import Settings from './Settings';
import geolocation from './helpers/geolocation';

const styles = StyleSheet.create({
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 15,
    flex: 1
  }
});

class Main extends Component {
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

  _onDrawerClose () {
    this.setState(this.refs.settings.getValues());
  }

  render () {
    const drawerContent = <Settings ref='settings' {...this.state} />;
    return (
      <Drawer
        type='static'
        tweenHandler={(ratio) => ({main: {opacity: 1 - ratio}})}
        content={drawerContent}
        onClose={this._onDrawerClose}
      >
        <View style={styles.drawer}><GeoMap {...this.state} /></View>
      </Drawer>
    );
  }
}

export default Main;
