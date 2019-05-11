const resolve = require('path').resolve;
const webpack = require('webpack');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const BABEL_CONFIG = {
  presets: [
    '@babel/env',
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties'
  ]
};

const config = {
  mode: 'development',

  entry: {
    app: resolve('./src/app.js')
  },

  output: {
    library: 'App'
  },

  devServer: {
    contentBase: [
      __dirname,
      resolve(__dirname, '../')
    ]
  },

  module: {
    rules: [{
      // Compile ES2015 using babel
      test: /\.js$/,
      include: [resolve('.')],
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }]
    }]
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new webpack.EnvironmentPlugin({'MAPBOX_ACCESS_TOKEN': dotenv.MAPBOX_ACCESS_TOKEN})
  ]
};


console.log(process.env.MAPBOX_ACCESS_TOKEN);

module.exports = env => env && env.local ?
  require('../webpack.config.local')(config)(env) : config;
