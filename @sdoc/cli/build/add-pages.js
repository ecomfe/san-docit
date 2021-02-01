const HtmlWebpackPlugin = require('html-webpack-plugin');
const debug = require('debug')('sdoc');
const error = require('debug')('sdoc:error');

const htmlWebpackPluginConfig = require('./html-webpack-plugin');
const route = require('./parser/route');
const ssr = require('./ssr');

const render = async (fileMap, options = {}) => {
    const {webpackConfig = {}, varibal = {}, noDataOutput = true} = options;

    // 1. 编译 SSR 需要组件文件
    try {
        await ssr.compile(fileMap, webpackConfig);
    }
    catch (err) {
        error('Webpack compile SSR error：', err);

        return err;
    }

    // 2. 渲染SSR
    const renderMap = {};
    for (let name of Object.keys(fileMap)) {
        try {
            const html = ssr.render(name, varibal, noDataOutput);
            renderMap[name] = {content: html};

            debug(`SSR render: ${name}`);
        }
        catch (err) {
            debug(`Not support SSR render, use Client render: ${name}`);
        }
    }
    return renderMap;
};

module.exports = async webpackConfig => {
    const routes = route.getRoutes();

    const fileMap = {};
    Object.keys(routes).map(key => {
        let name = key + 'index';
        fileMap[name] = routes[key];
    });

    const renderMap = await render(fileMap);

    for (let name of Object.keys(fileMap)) {
        const options = await htmlWebpackPluginConfig(name, renderMap[name]);
        webpackConfig.entry[name] = fileMap[name];
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin(options)
        );
    }

    return webpackConfig;
};

