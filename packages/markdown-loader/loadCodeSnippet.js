/**
 * 加载 codebox Source
 * 
 * @author kidnes
 */
'use strict';

const {codeboxReg, codeboxSnippetReg} = require('./const');

module.exports = function(content, index) {
    codeboxReg.lastIndex = 0;
    const matches = content.match(codeboxReg);
    if (!matches) {
        return content;
    }

    codeboxSnippetReg.lastIndex = 0;
    let sanCode = matches[index].match(codeboxSnippetReg);

    return sanCode[2];
};
