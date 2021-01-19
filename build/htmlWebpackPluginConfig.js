/**
 * @file 多页面渲染
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const loadHtml = require('../packages/markdown-loader/loadHtml');
const loadToc = require('../packages/markdown-loader/loadToc');
const loadCodebox = require('../packages/markdown-loader/loadCodebox');

function getSSRHTML(varibal) {
    const {SanProject} = require('san-ssr');

    const project = new SanProject();

    const {default: entry} = require('../dist/server-entry');

    const render = project.compileToRenderer(entry);
    const html = render({SAN_DOCIT: varibal});

    return html;
}

function getMdVarible(file) {
    const content = fs.readFileSync(file, 'utf-8');
    let {codeboxContent} = loadCodebox(content, file);

    const toc = loadToc(content);
    const html = loadHtml(codeboxContent || content);

    return {
        content: html,
        toc
    };
}

function getProjectConfig(config) {
    return {
        title: config.title,
        base: config.base,
        themeConfig: config.themeConfig
    };
}

module.exports = (name, file) => {
    const config = require('./config').load();
    const SAN_DOCIT = {
        pathname: name,
        ...getMdVarible(file),
        ...getProjectConfig(config)
    };
    const result = {
        template: path.join(__dirname, '../index.ejs'),
        filename: name + '.html',
        chunks: ['client-entry'],
        favicon: utils.getCommonDirs('public/favicon.ico')[0],
        minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: false,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
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