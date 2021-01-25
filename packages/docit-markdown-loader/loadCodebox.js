/**
 * 插件 codebox loader，输出如下格式：
 *   <codebox>
 *      <code-preview-0 slot="code-preview"></code-preview-0>
 *      <section slot="text-place-holder">${textPlaceHolder}</section>
 *      <div slot="code-place-holder">${codePlaceHolder}</div>
 *   </codebox>
 * 
 * @author kidnes
 */
'use strict';

const {codeboxReg, codeboxSnippetReg} = require('./const');
const loadHtml = require('./loadHtml');
const compiler = require('./lib/compiler');

let codePreviewMap = {};

const parseCodebox = (code, index) => {
    codeboxSnippetReg.lastIndex = 0;
    let matches = code.match(codeboxSnippetReg);
    if (!matches) {
        return code;
    }

    const codePlaceHolder = loadHtml(matches[0]);

    let textPlaceHolder = '';
    codeboxReg.lastIndex = 0;
    const execes = codeboxReg.exec(code.replace(matches[0], ''));
    if (execes && execes.length === 4) {
        code = code.replace(execes[3].trim(), '');
        textPlaceHolder = compiler(execes[3]);
    }

    const codePreviewTag = `code-preview-${index}`;
    const codePreviewName = `codePreview${index}`;
    codePreviewMap[codePreviewName] = codePreviewTag;

    const result = `
<code-preview-${index} slot="code-preview"></code-preview-${index}>
<section slot="text-place-holder">${textPlaceHolder}</section>
<div slot="code-place-holder">
${codePlaceHolder}
</div>
    `;

    return code.replace(matches[0], result);
}

module.exports = function(content, resourcePath) {

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
    Object.keys(codePreviewMap).forEach((key, index) => {
        const name = key.replace(/\//g, '_');
        importStr += `import ${name} from '${resourcePath}?codebox=${index}';`;
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
