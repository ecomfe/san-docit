const utils = require('../utils');

const getThemeImport = () => {
    const files = [
        ...utils.getCommonPaths('styles/index.js'),
        ...utils.getCommonPaths('styles/index.css'),
        ...utils.getCommonPaths('styles/index.less'),
        ...utils.getCommonPaths('styles/index.sass')
    ];
    return files.map(file => `import '${file}';`).join('\n');
};

module.exports = {
    getThemeImport
};
