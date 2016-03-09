var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssMixins = require('postcss-mixins');
var postcssAdvancedVariables = require('postcss-advanced-variables');
var resolve = require('./webpack/resolve');
var cdnurl = require('./src/js/cdnurl');

module.exports = {
  devtool: 'cheap-module-eval-source-map, //#',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/js/main'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: cdnurl
  },

  module: {
    loaders: [
      // JS FILES
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]&sourceMap!postcss'
      },
      // FONT FILES
      {
        test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)$/,
        loader: 'url?prefix=font/&limit=100000'
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

  postcss: function(webpack) {
    return [
      postcssImport({addDependencyTo: webpack}),
      postcssMixins(),
      postcssAdvancedVariables(),
      autoprefixer({ browsers: ['last 2 versions'] }),
      precss()
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/layout/index.html',
      inject: 'body'
    }),

    new CopyWebpackPlugin([
      {from: 'src/js/worker.js'}
    ])
  ],

  resolve: resolve
};
