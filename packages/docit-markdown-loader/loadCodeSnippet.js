/**
 * 加载 codebox Source
 * 
 * @author kidnes
 */
'use strict';

const {codeboxReg, codeboxSnippetReg} = require('./const');

module.exports = function(content, index) {
    // 情况1. 匹配 <codebox>
    codeboxReg.lastIndex = 0;
    let matches = content.match(codeboxReg);
    if (matches) {
        codeboxSnippetReg.lastIndex = 0;
        let sanCode = matches[index].match(codeboxSnippetReg);

        return sanCode[2];
    }

    // 情况2. 匹配 ```html
    codeboxSnippetReg.lastIndex = 0;
    matches = content.match(codeboxSnippetReg);
    if (matches) {
        codeboxSnippetReg.lastIndex = 0;
        let sanCode = matches[index].match(codeboxSnippetReg);

        return sanCode[2];
    }

    return content;
};
