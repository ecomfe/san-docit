/**
 * @file sandocit build 命令
 * @author kidnes
 * @date 2020-12-20
 */

const webpack = require('webpack');
const webpackProd = require('../../../build/webpack.prod');

module.exports = cmd => {
    const configurations = webpackProd();

    webpack(configurations, (err, stats) => {
        if (err) {
            // eslint-disable: no-console
            console.error(err);
            process.exit(1);
        }

        if (stats.hasErrors()) {
            process.exit(1);
        }
    });
};
