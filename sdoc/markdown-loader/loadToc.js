/**
 * @file markdown loader
 * @author ksky521
 */

const LRU = require('lru-cache');
const hash = require('hash-sum');
const grayMatter = require('gray-matter');

const compiler = require('./lib/compiler');
const parseHeader = require('./lib/parseHeader');

const cache = new LRU({max: 1000});

module.exports = function(content, extractHeaders = ['H2', 'H3']) {
    const key = hash(content + extractHeaders.join(','));
    const hit = cache.get(key);
    if (hit) {
        return hit;
    }

    const frontMatter = grayMatter(content);
    content = frontMatter.content;

    const compile = compiler.getCompiler();
    const tree = parseHeader(content, compile, extractHeaders);

    cache.set(key, tree);
    return tree;
};
