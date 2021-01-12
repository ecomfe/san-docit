const SanLoaderPlugin = require('san-loader/lib/plugin');
const path = require('path');

const replaceLoader = require('./replace-loader');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: resolve('src/server-entry.js'),
    devtool: false,
    target: 'node',
    output: {
        path: resolve('dist'),
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.san$/,
                loader: 'san-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                use: ['css-loader', 'less-loader']
            }
        ].concat(replaceLoader())
    },
    resolve: {
        extensions: ['.js', '.jsx', '.san', '.json'],
    },
    plugins: [
        new SanLoaderPlugin()
    ]
};
