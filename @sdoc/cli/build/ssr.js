const path = require('path');
const webpack = require('webpack');
const {default: merge} = require('webpack-merge');
const {SanProject} = require('san-ssr');

const utils = require('./utils');
const baseWebpackConfig = require('./webpack.ssr')();

const tmpdir = utils.tmpdir;

const build = configurations => new Promise((resolve, reject) => {
    webpack(configurations, (err, stats) => {
        if (err || stats.hasErrors()) {
            if (err) {
                // eslint-disable: no-console
                console.error(err);

                return reject(err);
            }

            if (stats && stats.hasErrors()) {
                const info = stats.toJson();
                // eslint-disable: no-console
                info.errors.map(item => console.error(item));

                return reject(info);
            }

            reject();
        }

        resolve(configurations);
    });
});

const compile = async (fileMap, webpackConfig = {}) => {
    const config = {
        entry: fileMap,
        output: {
            path: tmpdir
        }
    };

    const configurations = merge(baseWebpackConfig, webpackConfig, config);

    return await build(configurations);
}

const render = (name, varibal = {}, noDataOutput = true) => {
    const {default: entry} = require(path.join(tmpdir, name));
    const project = new SanProject();

    const render = project.compileToRenderer(entry);
    const html = render(varibal, noDataOutput);

    return html;
}

module.exports = {
    compile,
    render
};
