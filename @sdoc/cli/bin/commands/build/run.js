/**
 * @file sdoc build 命令
 * @author kidnes
 * @date 2020-12-20
 */

/* eslint-disable no-console */

const webpack = require('webpack');
const chalk = require('chalk');

const build = configurations => new Promise((resolve, reject) => {
    webpack(configurations, (err, stats) => {
        if (err || stats.hasErrors()) {
            if (err) {
                console.error(err);
            }

            if (stats && stats.hasErrors()) {
                const info = stats.toJson();
                console.error(info.errors);
            }

            reject(err);
            process.exit(1);
        }

        resolve();
    });
});


module.exports = async cmd => {
    const webpackProd = require('../../../build/webpack.prod');

    console.log('Server side compile...');
    const webpackConfig = await webpackProd();

    console.log('Server side compile Done.');

    console.log('Client side compile...');

    await build(webpackConfig);

    console.log('Client side compile Done');

    console.log(`Output:${chalk.green(webpackConfig.output.path)}`);
};
