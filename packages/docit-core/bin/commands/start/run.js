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
const chalk = require('chalk');
const opener = require('opener');
const config = require('../../../build/config').load();
const webpackDev = require('../../../build/webpack.dev');

const computeSettingsHash = cwd => {
    const settings = fs.readFileSync(path.join(cwd, '.sandocit/config.js'));
    return hash(settings);
};

const startDevServer = (isFirstCompile) => {
    const configurations = webpackDev();

    // create server
    const defaultDevServer = {
        https: false,
        host: '0.0.0.0',
        port: 8080,
        contentBase: path.resolve('.'),
        watchContentBase: false,
        publicPath: config.base
    };

    const devServerConfig = Object.assign(defaultDevServer, configurations.devServer);

    const compiler = webpack(configurations);

    const server = new WebpackDevServer(
        compiler,
        devServerConfig
    );

    server.listen(devServerConfig.port);

    compiler.hooks.done.tap('san-docit-serve', stats => {
        if (stats && stats.hasErrors()) {
            const info = stats.toJson();
            // eslint-disable: no-console
            info.errors.map(item => console.error(item));
            return;
        }

        isFirstCompile && setTimeout(() => open(devServerConfig), 100);
    });

    return server;
}

const open = devServerConfig => {
    const {https, host, port, publicPath} = devServerConfig;

    const protocol = https ? 'https' : 'http';

    const networkUrl = `${protocol}://${host}:${port}${publicPath}`;

    /* eslint-disable no-console */
    console.log();
    console.log(`  Application is running at: ${chalk.green(networkUrl)}`);
    /* eslint-enable no-console */

    config.open && opener(networkUrl);
}

module.exports = cmd => {
    const {cwd} = cmd;
    let server = startDevServer(true);

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

            server = startDevServer(false);
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
