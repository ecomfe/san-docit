/**
 * @file markdown loader
 * @author ksky521
 */

const LRU = require('lru-cache');
const hash = require('hash-sum');
const qs = require('querystring');
const loaderUtils = require('loader-utils');

const loadHtml = require('./loadHtml');
const loadToc = require('./loadToc');

const loadCodebox = require('./loadCodebox');
const loadCodeSnippet = require('./loadCodeSnippet');

const utils = require('./lib/utils');

const cache = new LRU({max: 1000});

function exportAsComponent(content) {
    const options = loaderUtils.getOptions(this) || {};
    let {codeboxContent, importStr, importComp} = loadCodebox(content, this.resourcePath, true);

    const toc = loadToc(content);
    const html = loadHtml(codeboxContent || content);

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

function exportAsCodebox(content) {
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

function exportAsMarkdown(content) {
    const html = loadHtml(content);
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

    if (query.codebox !== undefined) {
        const codebox = loadCodeSnippet(content, parseInt(query.codebox));

        cache.set(key, codebox);

        return codebox;
    }

    let result;
    switch (query.exportType) {
        // 渲染markdown
        case 'markdown':
        case 'md':
            result = exportAsMarkdown.call(this, content);
            break;
        // 渲染代码片断
        case 'component':
            result = exportAsCodebox.call(this, content);
            break;
        // 渲染代码片断 + markdown
        default:
            result = exportAsComponent.call(this, content);
            break;
    }

    cache.set(key, result);

    return result;
};
