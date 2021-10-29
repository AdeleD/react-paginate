const path = require('path');

const dir_demo_js = path.resolve(__dirname, 'js');
const dir_demo_build = path.resolve(__dirname, 'build');

const dir_js = path.join(__dirname, '..', 'react_components');
const dir_node_modules = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
  target: 'node',
  entry: path.resolve(dir_demo_js, 'demo.js'),
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
        test: dir_demo_js,
      },
      {
        use: 'babel-loader',
        test: dir_demo_js,
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
