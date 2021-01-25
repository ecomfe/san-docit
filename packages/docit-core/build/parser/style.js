const utils = require('../utils');

const getStyleImport = () => {
    const varsFiles = utils.getCommonDirs('styles/vars.less');
    const indexFiles = utils.getCommonDirs('styles/index.less');
    return varsFiles.concat(indexFiles).map(file => `@import '${file}';`).join('\n');
};

module.exports ={
    getStyleImport
};
