const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = require('./htmlWebpackPluginConfig');

const route = require('./parser/route');

module.exports = (webpackConfig) => {
    const routes = route.getRoutes();

    Object.keys(routes).map(item => {
        webpackConfig.entry[item] = routes[item];
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin(htmlWebpackPluginConfig(item, routes[item]))
        )
    });
}

