/**
 * @file markdown loader
 * @author ksky521
 */

const path = require('path');
const LRU = require('lru-cache');
const hash = require('hash-sum');
const qs = require('querystring');
const loaderUtils = require('loader-utils');
const grayMatter = require('gray-matter');

const loadHtml = require('./loadHtml');
const loadToc = require('./loadToc');

const loadCodebox = require('./loadCodebox');
const loadCodeSnippet = require('./loadCodeSnippet');

const utils = require('./lib/utils');

const cache = new LRU({max: 1000});

function exportAsComponent(content, mardownIt) {
    const options = loaderUtils.getOptions(this) || {};
    let {codeboxContent, importStr, importComp, hasParsed} = loadCodebox(content, this.resourcePath, true);

    const toc = loadToc(content);
    const html = hasParsed ? codeboxContent : loadHtml(content, mardownIt);

    // SSR 时不渲染预览部分，动态生成的组件清空
    if (options.ssr) {
        importStr = '';
        importComp = '';
    }

    const SanComponent = utils.getModulePath('san-component');

    const result = `
        <template>
            <div class="content">${html}</div>
        </template>
        <script>
            import {SanComponent} from '${SanComponent}';
            ${importStr}
            export default class ContentView extends SanComponent {
                static components = ${importComp || '{}'};
                inited() {
                    if (global.hub && global.hub.fire) {
                        global.hub.fire('changed', ${JSON.stringify(toc)});
                    }
                };
            }
        </script>
    `;

    return result;
};

function exportAsCodebox(content, mardownIt) {
    let {importStr, importComp, importHtml} = loadCodebox(content, this.resourcePath, false);

    const SanComponent = utils.getModulePath('san-component');
    const result = `
        <template>
            <div class="content">${importHtml}</div>
        </template>
        <script>
            import {SanComponent} from '${SanComponent}';
            ${importStr}
            export default class ContentView extends SanComponent {
                static components = ${importComp || '{}'};
            }
        </script>
    `;

    return result;
}

function exportAsMarkdown(content, mardownIt) {
    const html = loadHtml(content, mardownIt);
    const result = `
        <template>
            <div class="content">${html}</div>
        </template>
        <script>
            export default {};
        </script>
    `;

    return result;
}

function getMarkdownOptions(content, options, query) {
    let {
        markdownIt,
        cwd = query.cwd || process.env.CWD || process.cwd(),
        rootUrl = process.env.BASE_URL || '/'
    } = options || query;

    const relativePath = path.relative(cwd, this.resourcePath);
    const relativeLink = utils.mdLink2Html(relativePath).replace(/\/$/, '');

    const frontMatter = grayMatter(content);
    const matter = frontMatter.data || {};

    // 合并下 mardownIt 配置
    markdownIt = Object.assign(markdownIt || {}, matter.markdownIt || {});
    markdownIt.link = {
        relativeLink,
        context: cwd,
        rootUrl
    };

    return markdownIt;
}


// eslint-disable-next-line
module.exports = function(content) {
    const isProd = process.env.NODE_ENV === 'production';

    const file = this.resourcePath;
    const options = loaderUtils.getOptions(this) || {};
    const rawQuery = this.resourceQuery.slice(1);
    const key = hash(file + content + rawQuery + JSON.stringify(options));
    const cached = cache.get(key);
    if (cached && isProd) {
        return cached;
    }

    const query = qs.parse(rawQuery);

    if (query.index !== undefined) {
        const codebox = loadCodeSnippet(content, parseInt(query.index, 10));

        cache.set(key, codebox);

        return codebox;
    }

    const mardownIt = getMarkdownOptions.call(this, content, query, options);

    let result;
    switch (query.exportType) {
        // 渲染markdown
        case 'markdown':
        case 'md':
            result = exportAsMarkdown.call(this, content, mardownIt);
            break;
        // 渲染代码片断
        case 'component':
            result = exportAsCodebox.call(this, content, mardownIt);
            break;
        // 渲染代码片断 + markdown
        default:
            result = exportAsComponent.call(this, content, mardownIt);
            break;
    }

    cache.set(key, result);

    return result;
};
