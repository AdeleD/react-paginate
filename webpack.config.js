/* global __dirname */

var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'react_components');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(dir_js, 'index.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'react-hot',
                test: dir_js,
            },
            {
                loader: 'babel-loader',
                test: dir_js,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                },
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
};
