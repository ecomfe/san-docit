/**
 * @file 多页面渲染
 * @author kidnes
 */

const utils = require('./utils');
const ssr = require('./ssr');

const getSSRHTML = varibal => {
    const html = ssr.render('server-entry', {SAN_DOCIT: varibal}, true);

    return html;
};

const getProjectConfig = config => {
    return {
        title: config.title,
        base: config.base,
        logo: config.logo,
        themeConfig: config.themeConfig
    };
};

module.exports = (name, options) => {
    const config = require('./config').load();

    const SAN_DOCIT = {
        pathname: name,
        ...options,
        ...getProjectConfig(config)
    };

    const result = {
        template: utils.getCommonPaths('templates/ssr.ejs')[0],
        filename: name + '.html',
        chunks: ['chunk-vendors', 'chunk-common', 'client-entry'],
        minify: true,
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
};
