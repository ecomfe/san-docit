/**
 * @file markdown loader
 * @author ksky521
 */

const LRU = require('lru-cache');
const hash = require('hash-sum');
const loadHtml = require('./loadHtml');
const loadToc = require('./loadToc');

const cache = new LRU({max: 1000});

// eslint-disable-next-line
module.exports = function(content) {
    const isProd = process.env.NODE_ENV === 'production';

    const file = this.resourcePath;
    const key = hash(file + content);
    const cached = cache.get(key);
    if (cached && (isProd || /\?san/.test(this.resourceQuery))) {
        return cached;
    }

    const html = loadHtml(content);
    const toc = loadToc(content);

    const result = `
        <template>
            <div class="content">${html}</div>
        </template>
        <script>
            export default {
                attached() {
                    global.hub.fire('changed', ${JSON.stringify(toc)});
                }
            }
        </script>
    `;

    cache.set(key, result);

    return result;
};
