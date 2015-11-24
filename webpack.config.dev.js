var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map-inline',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/js/main'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      // JS FILES
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass?sourceMap',
        include: path.join(__dirname, 'src')
      },
      // DATA FILES
      {
        test: /\.(json)$/,
        loader: 'file?name=data/data-[hash:6].[ext]'
      }
    ]
  },

  postcss: [
    require('precss'),
    require('autoprefixer')
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

  resolve: {
    extensions: ['', '.js', '.css', '.scss'],

    modulesDirectories: [
      'node_modules',
      './src'
    ]
  }
};
