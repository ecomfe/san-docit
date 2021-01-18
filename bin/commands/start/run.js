/**
 * @file sandocit build 命令
 * @author kidnes
 * @date 2020-12-20
 */

const fs = require('fs');
const path = require('path');
const hash = require('hash-sum');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../build/config');
const webpackDev = require('../../../build/webpack.dev');

const computeSettingsHash = cwd => {
    const settings = fs.readFileSync(path.join(cwd, '.sandocit/config.js'));
    return hash(settings);
};

const startDevServer = () => {
    const configurations = webpackDev();

    const compiler = webpack(configurations);

    // create server
    const defaultDevServer = {
        port: 8080,
        contentBase: path.resolve('.'),
        watchContentBase: false,
        publicPath: config.base
    };

    const devServerConfig = Object.assign(defaultDevServer, configurations.devServer);
    const server = new WebpackDevServer(
        compiler,
        devServerConfig
    );

    server.listen(devServerConfig.port);

    return server;
}

module.exports = cmd => {
    const {cwd} = cmd;
    let server = startDevServer(cwd);
    debugger;
    let settingsHash = computeSettingsHash(cwd);

    fs.watch(path.join(cwd, '.sandocit/config.js'),
        () => {
            // `fs.watch`是不稳定的，一次修改会触发多次，因此用hash做一下比对
            const newSettingsHash = computeSettingsHash(cwd);

            if (newSettingsHash === settingsHash) {
                return;
            }

            settingsHash = newSettingsHash;

            // eslint:disable-next-line:no-console
            console.log('Detected config.js change, restarting dev server...');

            server.close();

            server = startDevServer(cwd);
        }
    );

    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            server.close(() => {
                process.exit(0);
            });
        });
    });
};
