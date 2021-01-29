const webpack = require('webpack');
const {default: merge} = require('webpack-merge');

const utils = require('./utils');
const getStyleLoader = require('./get-style-loader');

module.exports = function () {
    const baseWebpackConfig = require('./webpack.base')();

    const webpackConfig = merge(baseWebpackConfig, getStyleLoader(0), {
        target: 'node',
        entry: {
            'server-entry': utils.resolve('src/server-entry.js')
        },
        output: {
            path: utils.resolve('dist'),
            filename: '[name].js',
            chunkFilename: '[name].js',
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [{
                test: /\.md$/,
                use: [{
                    loader: 'san-loader'
                }, {
                    loader: '@sdoc/markdown-loader',
                    options: {
                        ssr: true
                    }
                }],
                
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"ssr"'
                }
            })
        ]
    });

    return webpackConfig;
};

