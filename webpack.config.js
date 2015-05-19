'use strict';

import webpack from 'webpack';
import path from 'path';
import defaults from './src/util/webpackDefaults';

export default {
  entry: './src/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?optional=runtime']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: 'index.ios.js',
    libraryTarget: 'commonjs'
  },
  externals: [],
  resolve: {
    extensions: [
      '',
      '.js'
    ],
    // Append react-native since I wrote a module that uses this
    // field in package.json: https://github.com/lukekarrys/djia/blob/master/package.json#L54
    packageMains: ['react-native'].concat(defaults.resolve.packageMains)
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
