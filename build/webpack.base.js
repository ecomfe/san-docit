const path = require('path');
const webpack = require('webpack');
const {default: merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SanLoaderPlugin = require('san-loader/lib/plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = function () {
    const config = require('./config').load();

    const replaceLoader = require('./replace-loader');

    const webpackConfig = {
        devtool: '',
        mode: 'development',
        context: __dirname,
        entry: {
            main: resolve('src/main.js')
        },
        output: {
            path: resolve('dist'),
            filename: 'static/js/[name].js',
            chunkFilename: 'static/js/[name].js',
            publicPath: '/'
        },
        optimization: {
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
        devServer: {
            port: 8001
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
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.md$/,
                    use: ['san-loader', '../packages/markdown-loader']
                }
            ].concat(replaceLoader())
        },
        resolve: {
            extensions: ['.js', '.jsx', '.san', '.json']
        },
        plugins: [
            new SanLoaderPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: resolve('public'),
                        to: resolve('dist')
                    }
                ]
            }),
            new webpack.DefinePlugin({
                SAN_DOCIT: JSON.stringify(config)
            })
        ]
    };

    if (typeof config.configureWebpack === 'function') {
        const customConfig = config.configureWebpack(webpackConfig);
        if (customConfig) {
            webpackConfig = merge(webpackConfig, customConfig);
        }
    }

    return webpackConfig;
};
