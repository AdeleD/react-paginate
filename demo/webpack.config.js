/* global __dirname */

const path = require('path');

const dir_demo_src = path.resolve(__dirname, 'src');
const dir_demo_basic = path.resolve(__dirname, 'src', 'basic-demo');
const dir_demo_build = path.resolve(__dirname, 'src', 'basic-demo', 'build');

const dir_js = path.join(__dirname, '..', 'react_components');
const dir_node_modules = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
  target: 'node',
  entry: path.resolve(dir_demo_basic, 'demo.js'),
  output: {
    path: dir_demo_build,
    filename: 'demo.js',
    publicPath: 'build',
  },
  devServer: {
    contentBase: dir_demo_build,
  },
  module: {
    rules: [
      {
        use: 'react-hot-loader/webpack',
        test: dir_demo_src,
      },
      {
        use: 'babel-loader',
        test: dir_demo_src,
        exclude: dir_node_modules,
      },
      {
        use: 'babel-loader',
        test: dir_js,
        exclude: dir_node_modules,
      },
    ],
  },
  resolve: {
    alias: {
      'react-paginate': dir_js,
    },
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
};
