var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var resolve = require('./webpack/resolve');
var cdnurl = require('./src/js/cdnurl');

module.exports = {
  devtool: 'source-map-inline',

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
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: []
        },
        include: path.join(__dirname, 'src')
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&importLoaders=2&localIdentName=[name]__[local]&sourceMap!postcss?sourceMap!sass?sourceMap',
        include: path.join(__dirname, 'src')
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

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],

  plugins: [
    new ExtractTextPlugin('main.css', {allChunks: true}),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/layout/index.html',
      inject: 'body'
    }),

    new webpack.NoErrorsPlugin()
  ],

  resolve: resolve
};
