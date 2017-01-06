
/**
 * Development Webpack Configuration
 */

 const path = require('path');
 const webpack = require('webpack');
//  const cdnurl = require('../src/js/cdnurl');

 // webpack plugins
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

// stuff
 var autoprefixer = require('autoprefixer');

 module.exports = require('./base')({
   entry: {
     main: 'js/main',

     common: [
       'immutable',
       'whatwg-fetch',
       'es6-promise' // is this needed now with the babel polyfill? need to check
     ],

     react: [
       'react',
       'react-dom',
       'react-addons-css-transition-group',
       'react-addons-transition-group'
     ],

     reactrouter: [
       'react-router/es',
       'react-router-redux',
       'history'
     ],

     redux: [
       'redux',
       'redux-thunk',
       'react-redux'
     ]
   },

   output: {
     path: './dist/files/',

     publicPath: 'files/',

     filename: '[chunkhash].[name].js'
   },

   cssLoaders: [
     {
      loader: 'style-loader'
     },
     {
       loader: 'css-loader',
       options: {
         sourceMap: false
       }
     },
     {
       loader: 'postcss-loader',
       options: {
         sourceMap: false
       }
     },
     {
       loader: 'sass-loader',
       options: {
         sourceMap: false
       }
     }
   ],

   plugins: [

     new webpack.optimize.CommonsChunkPlugin({
       name: ['common', 'react', 'reactrouter', 'redux', 'manifest']
     }),

    //  new webpack.optimize.CommonsChunkPlugin({
    //    name: 'redux',
    //    filename: 'common.redux.js'
    //  }),

     // split css to its own file
    //  new ExtractTextPlugin('[name].css', {allChunks: true}),

     // minify js fils
     new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
     }),

     new HtmlWebpackPlugin({
       filename: '../index.html',
       template: 'layout/index.html',
       chunksSortMode: 'dependency',
      //  minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
      // inject: true
     })
   ]
 })
