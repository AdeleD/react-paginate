/* global __dirname */
var path = require('path');
var webpack = require('webpack');
var dir_js = path.resolve(__dirname, 'react_components');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.resolve(dir_js, 'index.js')
    ],
    output: {
        path: dir_build,
        publicPath: '/',
        library: 'ReactPaginate',
        libraryTarget: 'umd',
        filename: 'react-paginate.js'
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
            }
        ]
    },
    externals: [
        {
            react: {
                root: 'React',
                amd: 'react',
                commonjs: 'react',
                commonjs2: 'react'
            }
        }
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
};
