
/**
 * Development Webpack Configuration
 */

 const path = require('path');
 const webpack = require('webpack');

 // webpack plugins
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');

// stuff
 var autoprefixer = require('autoprefixer');

 module.exports = require('./base')({
   entry: {
     main: './src/js/main',
     vendor: [
       'history',
       'immutable',
       'whatwg-fetch',
       'es6-promise',
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
     chunkFilename: '[name].chunk.js',
     publicPath: 'files/',
     filename: '[name].js'
   },

   babelQuery: {
     compact: true
   },

   cssLoaders: ExtractTextPlugin.extract(
     'style',
     'css?modules&importLoaders=1&localIdentName=[hash:base64:8]!postcss!sass'
   ),

   postcss:[
     autoprefixer({browsers: ['last 2 versions']})
   ],

   plugins: [
     new webpack.optimize.OccurrenceOrderPlugin(true),

     new webpack.optimize.DedupePlugin(),

     // split vendor js files to its own file
     new webpack.optimize.CommonsChunkPlugin('vendor', 'common.js'),

     // split css to its own file
     new ExtractTextPlugin('[name].css', {allChunks: true}),

     // minify js fils
    //  new webpack.optimize.UglifyJsPlugin({
    //    compressor: {
    //      warnings: false
    //    }
    //  }),

     new HtmlWebpackPlugin({
       filename: '../index.html',
       template: 'src/layout/index.html',
       minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        // minifyJS: true,
        // minifyCSS: true,
        // minifyURLs: true,
      },
      inject: true
     })
   ]
 })
