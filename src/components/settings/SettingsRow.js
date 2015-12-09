'use strict';

import React, {StyleSheet, Text, View, PropTypes, Component} from 'react-native';

const styles = StyleSheet.create({
  settingsRow: {
    marginTop: 20
  },
  settingsRowLabel: {
    paddingLeft: 10,
    paddingBottom: 5
  }
});

class SettingsRow extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    style: View.propTypes.style,
    label: PropTypes.string
  }

  render() {
    return (
      <View style={styles.settingsRow}>
        <Text style={styles.settingsRowLabel}>{this.props.label}</Text>
        <View style={this.props.style}>{this.props.children}</View>
      </View>
    );
  }
}

export default SettingsRow;
