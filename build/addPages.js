const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = require('./htmlWebpackPluginConfig');

const route = require('./parser/route');

module.exports = (webpackConfig) => {
    const routes = route.getRoutes();

    Object.keys(routes).map(item => {
        let name = item + 'index';
        webpackConfig.entry[name] = routes[item];
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin(htmlWebpackPluginConfig(name, routes[item]))
        )
    });
}

