const webpack = require('webpack');
const {default: merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./utils');

const baseWebpackConfig = require('./webpack.base')();

const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'client-entry': utils.resolve('src/client-entry.js')
    },
    mode: 'production',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: false,
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});

module.exports = function () {
    require('./addPages')(webpackConfig);

    return webpackConfig;
};
