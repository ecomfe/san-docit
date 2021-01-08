/**
 * @file markdown loader
 * @author ksky521
 */

const LRU = require('lru-cache');
const hash = require('hash-sum');
const qs = require('querystring');

const loadHtml = require('./loadHtml');
const loadToc = require('./loadToc');

const loadCodebox = require('./loadCodebox');
const loadCodeSnippet = require('./loadCodeSnippet');

const cache = new LRU({max: 1000});

// eslint-disable-next-line
module.exports = function(content) {
    const isProd = process.env.NODE_ENV === 'production';

    const file = this.resourcePath;
    const key = hash(file + content);
    const cached = cache.get(key);
    if (cached && isProd) {
        return cached;
    }
    
    const rawQuery = this.resourceQuery.slice(1);
    const query = qs.parse(rawQuery);

    if (query.codebox !== undefined) {
        return loadCodeSnippet(content, parseInt(query.codebox));
    }
    
    let {codeboxContent, importStr, importComp} = loadCodebox.call(this, content);

    const toc = loadToc(content);
    const html = loadHtml(codeboxContent || content);

    const result = `
        <template>
            <div class="content">${html}</div>
        </template>
        <script>
            import {SanComponent} from 'san-component';
            ${importStr}
            export default class ContentView extends SanComponent {
                ${importComp};
                inited() {
                    global.hub.fire('changed', ${JSON.stringify(toc)});
                };
            }
        </script>
    `;

    cache.set(key, result);

    return result;
};
