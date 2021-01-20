const path = require('path');
const webpack = require('webpack');
const {default: merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const utils = require('./utils');


module.exports = function () {
    const config = require('./config').load();
    const baseWebpackConfig = require('./webpack.base')();

    const webpackConfig = merge(baseWebpackConfig, {
        entry: {
            main: utils.resolve('src/main.js')
        },
        devServer: {
            port: utils.port || 8080,
            publicPath: config.base,
            before: function(app) {
                app.use(history({
                    index: config.base + 'index.html'
                }));
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../index.ejs'),
                filename: 'index.html',
                chunks: ['main'],
                favicon: utils.getCommonDirs('public/favicon.ico')[0],
                templateParameters: config,
                inlineSource: '.(js|css)$',
                ...config
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            })
        ]
    });

    return webpackConfig;
};
