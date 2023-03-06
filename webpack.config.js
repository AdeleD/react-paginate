const path = require('path');
const webpack = require('webpack');

const dir_js = path.resolve(__dirname, 'react_components');
const dir_build = path.resolve(__dirname, 'build');
const dir_dist = path.resolve(__dirname, 'dist');
const dir_node_modules = path.resolve(__dirname, 'node_modules');

const config = {
  entry: path.resolve(dir_js, 'index.js'),
  output: {
    path: dir_build,
    library: 'ReactPaginate',
    filename: 'react-paginate.js',
    libraryTarget: 'umd',
    // this to support both browser and Node.
    // https://github.com/riversun/making-library-with-webpack#1-4publish-an-export-default-class-with-the-setting-library-name--class-name
    globalObject: 'this',
  },
  devServer: {
    hot: true,
    contentBase: dir_build,
  },
  module: {
    rules: [
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

module.exports = (env, argv) => {
  const isDevelopment =
    argv.mode !== 'production' && process.env.NODE_ENV !== 'production';
  config.mode = isDevelopment ? 'development' : 'production';
  config.plugins = [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean);
  if (argv.mode === 'production') {
    config.output.path = dir_dist;
  }
  return config;
};
