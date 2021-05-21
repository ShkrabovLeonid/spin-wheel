'use strict';

  let path = require('path');
  
  module.exports = {
    mode: 'production', // production or development
    entry: {
      script: '/src/js/script.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist/js'
    },
    watch: true,
  
    devtool: "source-map",
  
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
              }]]
            }
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use:{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../img/',
              publicPath: '/dist/img/'
            },
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '../fonts/',
                publicPath: '/dist/fonts/'
              }
            }
          ]
        }
      ]
    }
  };


