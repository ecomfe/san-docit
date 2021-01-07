/**
 * @file markdown loader
 * @author ksky521
 */

const compiler = require('./lib/compiler');
const parseHeader = require('./lib/parseHeader');

module.exports = function(content, extractHeaders = ['H2', 'H3']) {
    const compile = compiler.getCompiler();
    const tree = parseHeader(content, compile, extractHeaders);

    return tree;
};
