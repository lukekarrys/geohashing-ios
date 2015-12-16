'use strict';

const fs = require('fs');
const path = require('path');

const log = (item) => process.stdout.write(`${item}\n`);
const contains = (str, has) => str.indexOf(has) > -1;

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const encoding = 'utf8';
const iOSPath = path.resolve(__dirname, '..', 'ios', 'geohashing');
const appDelegate = path.resolve(iOSPath, 'AppDelegate.m');

const updateAppDelegate = (cb) => {
  const devLocation = (str) => contains(str, 'NSURL URLWithString');
  const prodLocation = (str) => contains(str, 'NSBundle mainBundle');
  const begRegex = /^[\s\/]*/;
  const disable = '  // ';
  const enable = '  ';

  fs.readFile(appDelegate, {encoding}, (err, data) => {
    if (err) return cb(err);

    log(`Updating ${appDelegate} for ${env}...`);
    data = data.split('\n').map((line) => {
      if (devLocation(line)) {
        line = (isProd ? disable : enable) + line.replace(begRegex, '');
      }
      else if (prodLocation(line)) {
        line = (isProd ? enable : disable) + line.replace(begRegex, '');
      }
      return line;
    }).join('\n');

    fs.writeFile(appDelegate, data, {encoding}, cb);
  });
};

updateAppDelegate(() => log('Done!'));
