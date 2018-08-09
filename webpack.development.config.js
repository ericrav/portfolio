const _ = require('lodash');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// development-specific additions
const config = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    './js/index',
    './styles/main.scss',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'react-hot-loader/patch',
    'webpack/hot/dev-server'
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};

module.exports = _.mergeWith({}, require('./webpack.all.config'), config, customizer);

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}