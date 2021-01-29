const utils = require('../utils');

const getStyleImport = () => {
    const varsFiles = utils.getCommonPaths('styles/vars.less');
    const indexFiles = utils.getCommonPaths('styles/index.less');
    return varsFiles.concat(indexFiles).map(file => `@import '${file}';`).join('\n');
};

module.exports ={
    getStyleImport
};
