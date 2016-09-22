
/**
 * Development Webpack Configuration
 */

const path = require('path');
const webpack = require('webpack');
const cdnurl = require('../src/js/cdnurl');

 // webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// stuff
var autoprefixer = require('autoprefixer');

module.exports = require('./base')({
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',

    require.resolve('webpack/hot/dev-server'),

    './src/js/main'
  ],

  output: {
    pathinfo: true,
    filename: '[name].js'
  },

  // babel options
  babelQuery: {
    compact: true
  },

  cssLoaders: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap',

  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/layout/index.ejs',
      inject: true,
      cdn: cdnurl
    })
  ],

  devtool: 'eval'
})
