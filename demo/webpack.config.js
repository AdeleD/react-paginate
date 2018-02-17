/* global __dirname */

var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'js');
var dir_html = path.resolve(__dirname, 'html');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.resolve(dir_js, 'demo.js')
    ],
    output: {
        path: dir_build,
        publicPath: '/',
        filename: 'demo.js',
        publicPath: 'build'
    },
    devServer: {
        contentBase: dir_build,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: dir_js,
                loader: 'react-hot-loader/webpack',
            },
            {
                test: dir_js,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                    }
                }
            },
            {
                test: path.join(__dirname, '..', 'react_components'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                    }
                }
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
