/**
 * @file markdown loader
 * @author ksky521
 */

const compiler = require('./lib/compiler');
const parseHeader = require('./lib/parseHeader');

module.exports = function(content, extractHeaders = ['H2', 'H3']) {
    const compile = compiler.getCompiler();
    const tocMd = parseHeader(content, compile, extractHeaders);
    const toc = tocMd.map(r => {
        return `${new Array((r.level - 1) * 4).join(' ')} - [${r.title}](#${r.slug})`;
    });

    return compile.render(toc.join('\n'));
};
