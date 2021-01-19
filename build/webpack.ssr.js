const path = require('path');
const webpack = require('webpack');
const SanLoaderPlugin = require('san-loader/lib/plugin');
const config = require('./config').load();

const replaceLoader = require('./replace-loader');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: resolve('src/server-entry.js'),
    devtool: '',
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
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
    },
    plugins: [
        new SanLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                SAN_DOCIT: JSON.stringify(config),
                BASE_URL: `"${config.base}"`
            }
        })
    ]
};
