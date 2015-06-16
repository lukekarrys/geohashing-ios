'use strict';

import React, {DatePickerIOS} from 'react-native';

const DayPicker = React.createClass({
  render () {
    return (
      <DatePickerIOS
        mode='date'
        timeZoneOffsetInMinutes={-1 * new Date().getTimezoneOffset()}
        maximumDate={new Date()}
        {...this.props}
      />
    );
  }
});

export default DayPicker;
