const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const AWS = require('aws-sdk');
const S3Plugin = require('webpack-s3-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// production-specific additions
const config = {
  devtool: 'eval',
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/styleBundle.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(false)
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }],
        // include: path.join(__dirname, 'src/js')
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'sass-loader',
            options: {
              data: '@import \'variables\';',
              includePaths: [
                path.resolve(__dirname, 'src/styles/abstracts')
              ]
            }
          }]
        })
      }
    ]
  }
};

if (process.env.DEPLOY_TO_S3) {
  // index.html
  config.plugins.push(new S3Plugin({
    include: 'index.html',
    s3Options: {
      credentials: new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE }),
      region: process.env.AWS_REGION
    },
    s3UploadOptions: {
      Bucket: process.env.S3_BUCKET_NAME,
      CacheControl: 'public, must-revalidate, proxy-revalidate, max-age=0'
    }
  }));
  // everything else
  config.plugins.push(new S3Plugin({
    exclude: 'index.html',
    s3Options: {
      credentials: new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE }),
      region: process.env.AWS_REGION
    },
    s3UploadOptions: {
      Bucket: process.env.S3_BUCKET_NAME,
    },
    cloudfrontInvalidateOptions: {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      Items: ['/*']
    }
  }));
}

module.exports = _.mergeWith({}, require('./webpack.all.config'), config, customizer);

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}