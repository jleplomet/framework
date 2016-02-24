
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var resolve = require('./webpack/resolve');
var cdnurl = require('./src/js/cdnurl.production');

module.exports = {
  debug: false,

  entry: {
    main: './src/js/main',

    vendor: [
      './src/js/plugins/jquery',
      'history',
      'immutable',
      'lodash',
      'react',
      'react-addons-css-transition-group',
      'react-addons-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },

  output: {
    path: './build/files/',
    publicPath: cdnurl,
    filename: '[name].[chunkhash].js'
  },

  resolve: resolve,

  module: {
    loaders: [
      // JS FILES
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            "transform-runtime",
            "transform-decorators-legacy",
          ]
        },
        include: path.join(__dirname, 'src')
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[hash:base64:6]!sass'),
        include: path.join(__dirname, 'src')
      },
      // IMAGE FILES
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file?name=images/image-[hash:6].[ext]'
      },
      // SOUND FILES
      {
        test: /\.(mp3|ogg)$/,
        loader: 'file?name=sounds/[name].[ext]'
      },
      // DATA FILES
      {
        test: /\.(json)$/,
        loader: 'file?name=data/data-[hash:6].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),

    new ExtractTextPlugin('[name].[chunkhash].css', {allChunks: true}),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/layout/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};
