const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = require('./htmlWebpackPluginConfig');

const utils = require('./utils');

module.exports = (webpackConfig) => {
    const routes = utils.getRoutes();

    Object.keys(routes).map(item => {
        webpackConfig.entry[item] = routes[item];
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin(htmlWebpackPluginConfig(item, routes[item]))
        )
    });
}

