const path = require('path');
const {default: merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');
const baseWebpackConfig = require('./webpack.base');

const webpackConfig = merge(baseWebpackConfig, {});
webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../index.ejs'),
        filename: 'index.html',
        chunks: ['main'],
        ...config
    })
]);

module.exports = function () {
    return webpackConfig;
};
