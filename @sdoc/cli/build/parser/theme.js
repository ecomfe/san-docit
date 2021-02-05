const utils = require('../utils');

const getThemeImport = () => {
    const files = [
        ...utils.getCommonPaths('styles/index.js'),
        ...utils.getCommonPaths('styles/index.css'),
        ...utils.getCommonPaths('styles/index.less'),
        ...utils.getCommonPaths('styles/index.sass')
    ];

    const paths = utils.getPaths();
    files.sort((a, b) => {
        const indexA = paths.findIndex(val => a.includes(val));
        const indexB = paths.findIndex(val => b.includes(val));
        return indexB - indexA;
    });
    return files.map(file => `import '${file}';`).join('\n');
};

module.exports = {
    getThemeImport
};
