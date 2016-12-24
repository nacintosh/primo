var path = require('path');

var assetsPath = path.join(__dirname, 'public', 'js');

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
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.svg$/,
            loader: 'url'
        }]
    }
}];
