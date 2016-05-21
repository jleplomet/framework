
/**
 * Development Webpack Configuration
 */

 const path = require('path');
 const webpack = require('webpack');

 // webpack plugins
 const HtmlWebpackPlugin = require('html-webpack-plugin');

// stuff
 var autoprefixer = require('autoprefixer');

module.exports = require('./base')({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/js/main'
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  // babel options
  babelQuery: {
    presets: ['react-hmre'],
    compact: true
  },

  cssLoaders: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]&sourceMap!postcss!sass?sourceMap',

  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/layout/index.html',
      inject: true
    })
  ],

  devtool: 'inline-source-map'
})
