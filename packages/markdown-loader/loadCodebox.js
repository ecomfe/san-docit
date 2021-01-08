/**
 * 插件 codebox loader，输出如下格式：
 *   <codebox>
 *       <h1 slot="text-place-holder">codebox</h1>
 *       <div slot="code-place-holder">const title = "san docit";</div>
 *       <code-preview-1 slot="code-preview"></code-preview-1>
 *   </codebox>
 * 
 * @author kidnes
 */
'use strict';

const {codeboxReg, codeboxSnippetReg} = require('./const');
const loadHtml = require('./loadHtml');

let codePreviewMap = {};

const parseCodebox = (code, index) => {
    codeboxSnippetReg.lastIndex = 0;
    let matches = code.match(codeboxSnippetReg);
    if (!matches) {
        return code;
    }

    const codePlaceHolder = loadHtml(matches[0]);

    const result = `
<code-preview-${index} slot="code-preview"></code-preview-${index}>
<div slot="code-place-holder">
${codePlaceHolder}
</div>
`;

    const codePreviewTag = `code-preview-${index}`;
    const codePreviewName = `codePreview${index}`;

    codePreviewMap[codePreviewName] = codePreviewTag;

    return code.replace(matches[0], result);
}

module.exports = function(content) {
    const file = this.resourcePath;

    const defaultValue = {
        codeboxContent: content,
        importStr: '',
        importComp: ''
    };

    codeboxReg.lastIndex = 0;
    const matches = content.match(codeboxReg);
    if (!matches) {
        return defaultValue;
    }

    codePreviewMap = {};
    matches.forEach((code, index) => {
        const result = parseCodebox(code, index);
        content = content.replace(code, result);
    });

    let importStr = '';
    let importCompMap = {};
    Object.keys(codePreviewMap).forEach((name, index) => {
        importStr += `import ${name} from '${file}?codebox=${index}';`;
        importCompMap[codePreviewMap[name]] = `%${name}%`;
    });

    const importComp = Object.keys(importCompMap).length > 0
        ? `static components = ${JSON.stringify(importCompMap)}`
            .replace(/("%|%")/mg, '')
        : '';

    return {
        codeboxContent: content,
        importStr,
        importComp
    };
};
