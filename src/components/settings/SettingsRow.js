'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  settingsRow: {
    marginTop: 20
  },
  settingsRowLabel: {
    paddingLeft: 10,
    paddingBottom: 5
  }
});

export default class SettingsRow extends Component {
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
