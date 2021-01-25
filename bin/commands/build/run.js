/**
 * @file sandocit build 命令
 * @author kidnes
 * @date 2020-12-20
 */

const webpack = require('webpack');

const build = configurations => new Promise((resolve, reject) => {
    webpack(configurations, (err, stats) => {
        if (err || stats.hasErrors()) {
            if (err) {
                // eslint-disable: no-console
                console.error(err);
            }

            if (stats && stats.hasErrors()) {
                const info = stats.toJson();
                // eslint-disable: no-console
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

    // eslint-disable: no-console
    console.log('Server side compile...');
    const webpackConfig = await webpackProd();

    // eslint-disable: no-console
    console.log('Server side compile Done.')

    // eslint-disable: no-console
    console.log('Client side compile...');

    await build(webpackConfig);

    // eslint-disable: no-console
    console.log('Client side compile Done');
};
