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
};

module.exports = function (content, resourcePath, isParseHtml) {

    const defaultValue = {
        codeboxContent: content,
        importStr: '',
        importComp: '{}',
        hasParsed: false
    };

    let matches;
    if (isParseHtml) {
        codeboxReg.lastIndex = 0;
        matches = content.match(codeboxReg);
    }
    else {
        codeboxSnippetReg.lastIndex = 0;
        matches = content.match(codeboxSnippetReg);
    }

    if (!matches) {
        return defaultValue;
    }

    codePreviewMap = {};

    const pageId = Date.now() + ''.substring.call(Math.random(), 2);
    const replacements = [];
    matches.forEach((code, index) => {
        const result = parseCodebox(code, index);
        const placeholder = `$cb-${pageId}-${index}`;
        content = content.replace(code, placeholder);
        replacements.push([placeholder, result]);
    });

    // 编译codebox以外的markdown
    content = compiler(content);

    replacements.forEach(([p, r]) => content = content.replace(p, r));

    let importStr = '';
    let importHtml = '';
    let importCompMap = {};
    Object.keys(codePreviewMap).forEach((key, index) => {
        const name = key.replace(/\//g, '_');
        const tag = codePreviewMap[name];
        importStr += `import ${name} from '${resourcePath}?index=${index}';`;
        importHtml += `<${tag}></${tag}>`;
        importCompMap[tag] = `%${name}%`;
    });

    const importComp = Object.keys(importCompMap).length > 0
        ? `${JSON.stringify(importCompMap)}`
            .replace(/("%|%")/mg, '')
        : '{}';

    return {
        codeboxContent: content,
        importStr,
        importComp,
        importHtml,
        hasParsed: true
    };
};
