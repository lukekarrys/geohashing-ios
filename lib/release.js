'use strict';

import fs from 'fs';
import http from 'http';
import async from 'async';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const encoding = 'utf8';
const iOSPath = path.resolve('..', 'iOS');
const appDelegate = path.resolve(iOSPath, 'AppDelegate.m');
const mainBundle = path.resolve(iOSPath, 'main.jsbundle');

const saveBundle = (cb) => {
  http.get({
    host: 'localhost:8080',
    path: '/index.ios.bundle',
    query: {
      dev: false,
      minify: true
    }
  }, (response) => {
    let body = '';
    response.on('data', (data) => body += data);
    response.on('end', () => fs.write(mainBundle, body, encoding, cb));
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

    data = data.split('\n').map((line) => {
      if (devLocation(line)) {
        line = (isProd ? disable : enable) + line.replace(begRegex, '');
      }
      else if (prodLocation(line)) {
        line = (isProd ? enable : disable) + line.replace(begRegex, '');
      }
      return line;
    }).join('\n');

    fs.write(appDelegate, data, encoding, cb);
  });
};

async.parallel([
  (cb) => saveBundle(cb),
  (cb) => updateAppDelegate(cb)
]);
