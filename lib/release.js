/* eslint no-console: 0 */

'use strict';

import fs from 'fs';
import http from 'http';
import async from 'async';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const encoding = 'utf8';
const iOSPath = path.resolve(__dirname, '..', 'iOS');
const appDelegate = path.resolve(iOSPath, 'AppDelegate.m');
const mainBundle = path.resolve(iOSPath, 'main.jsbundle');

const saveBundle = (cb) => {
  console.log('Requesting bundle...');
  // TODO: should we use the webpack bundle here from http://localhost:8082/index.ios.js
  http.get('http://localhost:8080/index.ios.bundle?dev=false&minify=true', (response) => {
    let body = '';
    response.on('data', (data) => body += data);
    response.on('end', () => {
      console.log('Saving bundle...');
      fs.writeFile(mainBundle, body, {encoding}, cb);
    });
  });
};

const updateAppDelegate = (cb) => {
  const contains = (str, has) => str.indexOf(has) > -1;
  const devLocation = (str) => contains(str, 'NSURL URLWithString');
  const prodLocation = (str) => contains(str, 'NSBundle mainBundle');
  const begRegex = /^[\s\/]*/;
  const disable = '  // ';
  const enable = '  ';

  fs.readFile(appDelegate, {encoding}, (err, data) => {
    if (err) { return cb(err); }

    console.log(`Updating ${appDelegate} for ${env}...`);
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

async.parallel([
  (cb) => isProd ? saveBundle(cb) : cb(),
  (cb) => updateAppDelegate(cb)
]);
