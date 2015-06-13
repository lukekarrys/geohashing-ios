'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackLibWebpackOptionsDefaulter = require('webpack/lib/WebpackOptionsDefaulter');

var _webpackLibWebpackOptionsDefaulter2 = _interopRequireDefault(_webpackLibWebpackOptionsDefaulter);

var defaulter = new _webpackLibWebpackOptionsDefaulter2['default']();
defaulter.process({});
var defaults = defaulter.defaults;

var isProd = process.env.NODE_ENV === 'production';

var config = {
  entry: {
    'index.ios': ['./src/main.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?stage=0&blacklist=validation.react']
    }, {
      test: /\.json$/,
      loaders: ['json-loader']
    }]
  },
  output: {
    path: _path2['default'].join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    // Append react-native since I wrote a module that uses this
    // field in package.json: https://github.com/lukekarrys/djia/blob/master/package.json#L54
    packageMains: ['react-native'].concat(defaults.resolve.packageMains)
  },
  plugins: []
};

if (isProd) {
  config.plugins.push(new _webpack2['default'].optimize.DedupePlugin(), new _webpack2['default'].optimize.OccurenceOrderPlugin(true), new _webpack2['default'].optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    sourceMap: false
  }), new _webpack2['default'].DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  }));
} else {
  if (process.env.HOT) {
    config.devtool = 'eval'; // Speed up incremental builds
    config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry');
    config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
    config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082');
    config.output.publicPath = 'http://localhost:8082/';
    config.module.loaders[0].loaders.unshift('react-hot');
    config.plugins.unshift(new _webpack2['default'].HotModuleReplacementPlugin());
  } else {
    config.devtool = 'source-map';
  }
  config.debug = true;
  config.plugins.push(new _webpack2['default'].NoErrorsPlugin());
}

exports['default'] = config;
module.exports = exports['default'];
