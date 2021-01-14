/**
 * @file 多页面渲染
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const loadHtml = require('../packages/markdown-loader/loadHtml');
const loadToc = require('../packages/markdown-loader/loadToc');

function getSSRHTML(varibal) {
    const {SanProject} = require('san-ssr');

    const project = new SanProject();

    const {default: entry} = require('../dist/server-entry');

    const render = project.compileToRenderer(entry);

    const html = render({SAN_DOCIT: varibal});

    return html;
}

function getMdVarible(file) {
    const source = fs.readFileSync(file, 'utf-8');
    const content = loadHtml(source);
    const toc = loadToc(source);

    return {
        content,
        toc
    };
}

function getProjectConfig(config) {
    return {
        title: config.title,
        base: config.base
    };
}

module.exports = (name, file) => {
    const config = require('./config').load();
    const SAN_DOCIT = {
        ...getMdVarible(file),
        ...getProjectConfig(config)
    };
    return {
        template: path.join(__dirname, '../index.ejs'),
        filename: name + '.html',
        chunks: ['main'],
        favicon: utils.getCommonDirs('public/favicon.ico')[0],
        // SSR：暂不支持，因 `self` 组件 和 `san-router` 不支持
        // templateParameters: Object.assign(config, {
        //     bodyHtmlSnippet: getSSRHTML(SAN_DOCIT),
        //     window: {
        //         SAN_DOCIT
        //     }
        // }),
        ...config
    };
}