var path = require('path');
var bundleOutputPath = path.join(__dirname, 'public', 'storage');
var ssrOutputPath = path.join(__dirname, 'public', 'functions', 'listen');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
    name: 'index',
    context: path.join(__dirname, 'src'),
    devtool: 'eval',
    entry: './index.js',
    output: {
        path: bundleOutputPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.svg$/,
            loader: 'url'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
}, {
    name: 'ssr',
    context: path.join(__dirname, 'src'),
    entry: './ssr.js',
    target: 'node',
    output: {
        path: ssrOutputPath,
        filename: 'ssr.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.svg$/,
            loader: 'url'
        }, {
            test: /\.css$/,
            loaders: ['isomorphic-style', 'css']
        }]
    }
}];
