const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = require('./htmlWebpackPluginConfig');

module.exports = (webpackConfig) => {
    const files = require('../src/router-config.js');

    Object.keys(files).map(item => {
        webpackConfig.entry[item] = files[item];
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin(htmlWebpackPluginConfig(item, files[item]))
        )
    });
}

