'use strict';

import webpack from 'webpack';
import path from 'path';
import Defaulter from 'webpack/lib/WebpackOptionsDefaulter';

const defaulter = new Defaulter();
defaulter.process({});
const {defaults} = defaulter;
const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    'index.ios': ['./src/main.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?stage=0&blacklist=validation.react']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '',
      '.js'
    ],
    // Append react-native since I wrote a module that uses this
    // field in package.json: https://github.com/lukekarrys/djia/blob/master/package.json#L54
    packageMains: ['react-native'].concat(defaults.resolve.packageMains)
  },
  plugins: []
};

if (isProd) {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  );
}
else {
  if (process.env.HOT) {
    config.devtool = 'eval'; // Speed up incremental builds
    config.entry['index.ios'].unshift('react-native-webpack-server/hot/entry');
    config.entry['index.ios'].unshift('webpack/hot/only-dev-server');
    config.entry['index.ios'].unshift('webpack-dev-server/client?http://localhost:8082');
    config.output.publicPath = 'http://localhost:8082/';
    config.module.loaders[0].loaders.unshift('react-hot');
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }
  else {
    config.devtool = 'source-map';
  }
  config.debug = true;
  config.plugins.push(new webpack.NoErrorsPlugin());
}

export default config;
