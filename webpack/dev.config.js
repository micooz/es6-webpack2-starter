const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(webpackCommon, {

  debug: true,

  devtool: 'inline-source-map',

  output: {

    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    loaders: [

      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=2',
          'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
        ]
      }

    ]

  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    })
  ],

  devServer: {
    port: 3000,
    host: 'localhost',
    open: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        secure: true,
        headers: {
          'Host': 'api.github.com'
        },
        pathRewrite: function (path) {
          return path.replace(/^\/api/, '');
        }
      }
    }
  }

});
