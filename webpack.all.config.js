const path = require('path');
require('babel-polyfill');

// general config stuff (not complete by itself)
var config = {
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  plugins: [
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      env: './env-' + process.env.NODE_ENV + '.js',
      '~': path.resolve(__dirname, 'src/js/modules/'),
      '#': path.resolve(__dirname, 'src/js/services/')
    }
  },
  module: {
    rules: [
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=image/svg+xml' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      {
        test: /\.(txt|glsl|frag|vert)$/,
        use: 'raw-loader'
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  }
};

module.exports = config;