/* global __dirname */

var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'js');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(dir_js, 'demo.js'),
    output: {
        path: dir_build,
        filename: 'demo.js',
        publicPath: 'build'
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
            },
            {
                loader: 'babel-loader',
                test: path.join(__dirname, '..', 'react_components'),
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                },
            }
        ]
    },
    resolve: {
        alias: {
            'react-paginate': path.join(__dirname, '..', 'react_components')
        }
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
};
