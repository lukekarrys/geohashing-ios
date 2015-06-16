'use strict';

import React, {DatePickerIOS} from 'react-native';

const DayPicker = React.createClass({
  render () {
    return (
      <DatePickerIOS
        mode='date'
        timeZoneOffsetInMinutes={-1 * new Date().getTimezoneOffset()}
        {...this.props}
      />
    );
  }
});

export default DayPicker;
