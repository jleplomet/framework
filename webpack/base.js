
/**
 * Common Webpack Configuration
 */

const path = require('path');
const webpack = require('webpack');
const cdnurl = require('../src/js/cdnurl');

// webpack plugins
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = options => ({
  entry: options.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: cdnurl
  }, options.output),

  module: {
    loaders: [
      // JS FILES
      {
        test: /\.js$/,
        loader: 'babel',
        query: options.babelQuery,
        exclude: /node_modules/
      },
      // CSS FILES
      {
        test: /\.(scss|css)$/,
        loader: options.cssLoaders,
        exclude: /node_modules/
      },
      // FONT FILES
      {
        test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)$/,
        loader: 'url?prefix=font/&limit=100000',
        exclude: /node_modules/
      },
      // IMAGE FILES
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file?name=images/[path][name].[ext]&context=src/images',
        exclude: /node_modules/
      },
      // SOUND FILES
      {
        test: /\.(mp3|ogg)$/,
        loader: 'file?name=sounds/[name].[ext]',
        exclude: /node_modules/
      },
      // DATA FILES
      {
        test: /\.(json)$/,
        loader: 'file?name=data/[name].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      fetch: 'exports?self.fetch!whatwg-fetch'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new CopyWebPackPlugin([
      {from: 'src/js/worker.js'}
    ])
  ]),

  postcss: () => options.postcss,

  devtool: options.devtool,

  target: 'web',

  stats: false,

  progress: true,

  resolve: {
    extensions: ['', '.js', '.scss', '.css'],

    modulesDirectories: [
      'node_modules',
      './src'
    ]
  }
});
