/**
 * @file markdown loader
 * @author ksky521
 */

const LRU = require('lru-cache');
const hash = require('hash-sum');
const qs = require('querystring');
const loaderUtils = require('loader-utils');
const debug = require('debug')('san-docit');

const loadHtml = require('./loadHtml');
const loadToc = require('./loadToc');

const loadCodebox = require('./loadCodebox');
const loadCodeSnippet = require('./loadCodeSnippet');
const utils = require('markdown-it/lib/common/utils');

const cache = new LRU({max: 1000});

// eslint-disable-next-line
module.exports = function(content) {
    const isProd = process.env.NODE_ENV === 'production';

    const file = this.resourcePath;
    const options = loaderUtils.getOptions(this) || {};
    const key = hash(file + content + JSON.stringify(options));
    const cached = cache.get(key);
    if (cached && isProd) {
        return cached;
    }
    
    const rawQuery = this.resourceQuery.slice(1);
    const query = qs.parse(rawQuery);

    if (query.codebox !== undefined) {
        const codebox = loadCodeSnippet(content, parseInt(query.codebox));

        cache.set(key, codebox);

        return codebox;
    }
    
    let {codeboxContent, importStr, importComp} = loadCodebox(content, this.resourcePath);

    const toc = loadToc(content);
    const html = loadHtml(codeboxContent || content);

    // SSR 时不渲染预览部分，动态生成的组件清空
    if (options.ssr) {
        importStr = '';
        importComp = '';
    }

    const SanComponent = require('./lib/utils').getModulePath('san-component');

    const result = `
        <template>
            <div class="content">${html}</div>
        </template>
        <script>
            import {SanComponent} from '${SanComponent}';
            ${importStr}
            export default class ContentView extends SanComponent {
                ${importComp};
                inited() {
                    if (global.hub && global.hub.fire) {
                        global.hub.fire('changed', ${JSON.stringify(toc)});
                    }
                };
            }
        </script>
    `;

    cache.set(key, result);

    return result;
};
