var path = require('path');
var assetsPath = path.join(__dirname, 'public', 'js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
    name: 'index',
    context: path.join(__dirname, 'src'),
    devtool: 'eval',
    entry: './index.js',
    output: {
        path: assetsPath,
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
        path: assetsPath,
        filename: 'ssr.js',
        publicPath: 'public',
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
            test: /\.svg$/,
            loader: 'url'
        }, {
            test: /\.css$/,
            loaders: ['isomorphic-style', 'css']
        }]
    }
}];
