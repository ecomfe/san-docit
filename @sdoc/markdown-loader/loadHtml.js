/**
 * @file markdown loader
 * @author ksky521
 */

const grayMatter = require('gray-matter');
const compiler = require('./lib/compiler');

module.exports = function (content, options) {
    const frontMatter = grayMatter(content);
    const matter = frontMatter.data || {};
    content = frontMatter.content;

    const getTemplate = (content, quote = true) => {
        const cls = typeof matter.classes === 'string' ? [matter.classes] : matter.classes || ['markdown'];
        const encode = quote ? str => JSON.stringify(str) : str => str;
        return `${encode('<div class="' + cls.join(' ') + '">' + content + '</div>')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029')}`;
    };

    return getTemplate(compiler(content, options), false);
};
