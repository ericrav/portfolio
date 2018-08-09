const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const AWS = require('aws-sdk');
const S3Plugin = require('webpack-s3-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();

// production-specific additions
const config = {
  devtool: 'eval',
  entry: './js/index',
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', ['/']),
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new ExtractTextPlugin({
    //   filename: 'styles/styleBundle.css',
    //   allChunks: true
    // }),
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
      { test: /\.s?css$/, use: ['css-loader', 'sass-loader'] },
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
      // DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
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