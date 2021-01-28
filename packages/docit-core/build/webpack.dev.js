const path = require('path');
const webpack = require('webpack');
const {default: merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');

const utils = require('./utils');
const getStyleLoader = require('./get-style-loader');


module.exports = function () {
    const config = require('./config').load();
    const baseWebpackConfig = require('./webpack.base')();

    const webpackConfig = merge(baseWebpackConfig, getStyleLoader(1), {
        entry: {
            'main': utils.resolve('src/main.js')
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
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: ['san-loader', '@san-docit/markdown-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: utils.getCommonPaths('templates/dev.ejs')[0],
                filename: 'index.html',
                chunks: ['main'],
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
