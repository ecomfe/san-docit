/**
 * @file markdown loader
 * @author kidnes
 */

const grayMatter = require('gray-matter');
const compiler = require('./lib/compiler');
const parseHeader = require('./lib/parseHeader');

module.exports = function (content, extractHeaders = ['H1', 'H2']) {
    const frontMatter = grayMatter(content);
    const matter = frontMatter.data || {};

    if (matter && matter.title) {
        return matter.title;
    }

    const tree = parseHeader(frontMatter.content, compiler.getCompiler(), extractHeaders);

    return tree.children && tree.children[0] ? tree.children[0].title : '';
}
