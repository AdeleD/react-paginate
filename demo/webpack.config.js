/* global __dirname */

const path = require('path');

const dir_js = path.resolve(__dirname, 'js');
const dir_build = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(dir_js, 'demo.js'),
  output: {
    path: dir_build,
    filename: 'demo.js',
    publicPath: 'build',
  },
  devServer: {
    contentBase: dir_build,
  },
  module: {
    rules: [
      {
        use: 'react-hot-loader/webpack',
        test: dir_js,
      },
      {
        use: 'babel-loader',
        test: dir_js,
      },
      {
        use: 'babel-loader',
        test: path.join(__dirname, '..', 'react_components'),
      },
    ],
  },
  resolve: {
    alias: {
      'react-paginate': path.join(__dirname, '..', 'react_components'),
    },
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
};
