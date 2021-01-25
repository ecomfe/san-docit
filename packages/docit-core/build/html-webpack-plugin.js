/**
 * @file 多页面渲染
 * @author kidnes
 */

const path = require('path');

const utils = require('./utils');
const ssr = require('./ssr');

const getSSRHTML = (varibal) => {
    const html = ssr.render('server-entry', {SAN_DOCIT: varibal}, false);

    return html;
}

function getProjectConfig(config) {
    return {
        title: config.title,
        base: config.base,
        logo: config.logo,
        themeConfig: config.themeConfig
    };
}

module.exports = (name, options) => {
    const config = require('./config').load();

    const SAN_DOCIT = {
        pathname: name,
        ...options,
        ...getProjectConfig(config)
    };
    debugger;
    const result = {
        template: path.join(__dirname, '../index.ejs'),
        filename: name + '.html',
        chunks: ['chunk-vendors', 'chunk-common', 'client-entry'],
        // favicon: utils.getCommonDirs('public/favicon.ico')[0],
        minify: false,
        // minify: {
        //     collapseWhitespace: true,
        //     keepClosingSlash: true,
        //     removeComments: false,
        //     removeRedundantAttributes: true,
        //     removeScriptTypeAttributes: true,
        //     removeStyleLinkTypeAttributes: true,
        //     useShortDoctype: true
        // },
        templateParameters: Object.assign(config, {
            ssrHtmlSnippet: getSSRHTML(SAN_DOCIT),
            window: {
                SAN_DOCIT: {
                    toc: SAN_DOCIT.toc
                }
            }
        }),
        ...config
    };
    return result;
}