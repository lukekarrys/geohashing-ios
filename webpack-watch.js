/* eslint no-console:0 */

'use strict';

import webpack from 'webpack';
import config from './webpack.config.js';
import {resolve} from 'path';
import colors from 'supports-color';

Error.stackTrackLimit = 30;

const outputOptions = {
  cached: false,
  cachedAssets: false,
  colors: colors,
  exclude: ['node_modules']
};

const reactNativeRoot = resolve(__dirname, 'node_modules/react-native');
const blacklist = require(resolve(reactNativeRoot, 'packager/blacklist'));
const reactNativePackage = require(resolve(reactNativeRoot, 'package'));
const depGraphPath = 'node_modules/react-native/packager/react-packager/src/DependencyResolver/haste/DependencyGraph';
const DependencyGraph = require(resolve(__dirname, depGraphPath));

const blacklistRE = blacklist(false);

const depGraph = new DependencyGraph({
  roots: [reactNativeRoot],
  ignoreFilePath: (filepath) => filepath.indexOf('__tests__') !== -1 || blacklistRE.test(filepath),
  fileWatcher: {on () {}}
});

let lastHash;

depGraph._loading
.then(() => depGraph.getOrderedDependencies(reactNativePackage.main))
.then((deps) => deps.map((dep) => dep.id))
.then((deps) => {
  deps.push('image\\!');
  config.externals = config.externals || [];
  config.externals = config.externals.concat(deps);

  webpack(config).watch(300, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
    }
    else {
      if (stats.hash !== lastHash) {
        lastHash = stats.hash;
        console.log(stats.toString(outputOptions));
      }
    }
  });
});

console.log('Loading native modules for the first time...');
