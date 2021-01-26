const path = require('path');
const webpack = require('webpack');
const Chain = require('webpack-chain');
const {default: merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SanLoaderPlugin = require('san-loader/lib/plugin');
const utils = require('./utils');

module.exports = function () {
    const config = require('./config').load();

    const replaceLoader = require('./replace-loader');

    let webpackConfig = {
        devtool: '',
        mode: 'development',
        context: __dirname,
        output: {
            path: utils.resolveDocit('dist'),
            filename: 'static/js/[name].js',
            chunkFilename: 'static/js/[name].js',
            publicPath: config.base
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.san$/,
                    use: 'san-loader'
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'static/img/[name].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ].concat(replaceLoader())
        },
        resolve: {
            extensions: ['.js', '.jsx', '.san', '.json'],
            modules: [path.join(process.cwd(), 'node_modules'), 'node_modules']
        },
        plugins: [
            new SanLoaderPlugin(),
            new CopyWebpackPlugin({
                patterns: utils.getCommonPaths('public').map(dir => ({
                    from: dir,
                    to: utils.resolveDocit('dist')
                }))
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    SAN_DOCIT: JSON.stringify(config),
                    BASE_URL: `"${config.base}"`
                }
            }),
            new webpack.ProgressPlugin({
                profile: false
            })
        ]
    };

    if (typeof config.configureWebpack === 'function') {
        const customConfig = config.configureWebpack(webpackConfig);
        if (customConfig) {
            webpackConfig = merge(webpackConfig, customConfig);
        }
    }
    if (typeof config.chainWebpack === 'function') {
        const chainableConfig = new Chain();
        config.chainWebpack(chainableConfig);
        webpackConfig = merge(webpackConfig, chainableConfig.toConfig());
    }

    return webpackConfig;
};
