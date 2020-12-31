/**
 * @file sandocit build 命令
 * @author kidnes
 * @date 2020-12-20
 */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../build/config');
const webpackDev = require('../../../build/webpack.dev');

module.exports = cmd => {
    const configurations = webpackDev();

    const compiler = webpack(configurations);

    // create server
    const defaultDevServer = {
        port: 8888,
        contentBase: path.resolve('.'),
        watchContentBase: false,
        publicPath: config.base
    };

    const devServerConfig = Object.assign(defaultDevServer, configurations.devServer);
    const server = new WebpackDevServer(
        compiler,
        devServerConfig
    );

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            server.close(() => {
                process.exit(0);
            });
        });
    });

    server.listen(devServerConfig.port);
};
