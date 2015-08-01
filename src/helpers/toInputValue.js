'use strict';

const toInputValue = (val) => {
  if (val == null) {
    return '';
  }

  if (typeof val === 'string') {
    return val;
  }

  return val.toString() || '';
};

export default toInputValue;
