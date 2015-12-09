'use strict';

const numRegex = /[^-\d\.]/g;

const toNumber = (val) => Number((val.toString()).replace(numRegex, ''));

export default toNumber;
