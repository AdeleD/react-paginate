/* global __dirname */
var path = require('path');
var dir_js = path.resolve(__dirname, 'react_components');
var dir_build = path.resolve(__dirname, 'build');
var dir_node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
  target: 'node',
  entry: path.resolve(dir_js, 'index.js'),
  output: {
    path: dir_build,
    library: 'ReactPaginate',
    libraryTarget: 'umd',
    filename: 'react-paginate.js',
  },
  devServer: {
    contentBase: dir_build,
  },
  module: {
    rules: [
      {
        use: 'react-hot-loader/webpack',
        test: dir_js,
        exclude: dir_node_modules,
      },
      {
        use: 'babel-loader',
        test: dir_js,
        exclude: dir_node_modules,
      },
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
      },
    },
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
};
