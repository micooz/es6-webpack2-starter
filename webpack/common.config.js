const path = require('path');
const autoprefixer = require('autoprefixer');

// webpack plugins
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');

module.exports = {

  entry: {
    'starter': './src/core.js',
    'vendor': './src/vendor.js'
  },

  resolve: {

    extensions: ['', '.js', '.scss'],

    modulesDirectories: ['node_modules']

  },

  module: {

    loaders: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader']
      },

      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file',
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      }

    ]

  },

  plugins: [
    new OccurrenceOrderPlugin(true)
  ],

  node: {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  postcss: function () {
    return [autoprefixer];
  }

};
