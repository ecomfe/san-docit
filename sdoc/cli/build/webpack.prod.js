const webpack = require('webpack');
const {default: merge} = require('webpack-merge');

const utils = require('./utils');
const getStyleLoader = require('./get-style-loader');
const baseWebpackConfig = require('./webpack.base')();

const webpackConfig = merge(baseWebpackConfig, getStyleLoader(2), {
    mode: 'production',
    entry: {
        'client-entry': utils.resolve('src/client-entry.js')
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: ['san-loader', '@sdoc/markdown-loader']
            }
        ]
    },
    resolve: {
        alias: {
            san$: 'san/dist/san.modern.js'
        }
    },
    optimization: {
        // minimize: false,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});

module.exports = async function () {
    const config = await require('./add-pages')(webpackConfig);

    return config;
};
