const fs = require('fs');
const path = require('path');
const config = require('./config');
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

function getProjectConfig() {
    return {
        title: config.title,
        base: config.base
    };
}

module.exports = (name, file) => {
    const SAN_DOCIT = {
        ...getMdVarible(file),
        ...getProjectConfig()
    };
    return {
        template: path.join(__dirname, '../index.ejs'),
        filename: name + '.html',
        chunks: ['client-entry', name],
        templateParameters: Object.assign(config, {
            bodyHtmlSnippet: getSSRHTML(SAN_DOCIT),
            window: {
                SAN_DOCIT
            }
        })
    };
}