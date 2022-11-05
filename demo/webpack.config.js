const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const dir_demo_js = path.resolve(__dirname, 'js');
const dir_demo_build = path.resolve(__dirname, 'build');

const dir_js = path.join(__dirname, '..', 'react_components');
const dir_node_modules = path.resolve(__dirname, '..', 'node_modules');

const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(`Webpack demo ${isDevelopment ? 'dev' : 'prod'}`);

module.exports = {
  target: 'node',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(dir_demo_js, 'demo.js'),
  ],
  output: {
    path: dir_demo_build,
    filename: 'demo.js',
    publicPath: 'build',
  },
  mode: isDevelopment ? 'development' : 'production',
  plugins: [
    // isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    contentBase: dir_demo_build,
  },
  module: {
    rules: [
      {
        test: dir_demo_js,
        // test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
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
};
