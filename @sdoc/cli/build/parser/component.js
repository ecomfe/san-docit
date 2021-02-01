const path = require('path');
const globby = require('globby');
const debug = require('debug')('sdoc');
const utils = require('../utils');

const getFilesByDir = dir => {
    const components = {};

    const files = globby.sync('**/*.san', {
        expandDirectories: false,
        onlyFiles: false,
        cwd: dir
    });

    files.map(file => components[file.replace(/\.san$/, '')] = dir + '/' + file);

    return components;
};

const getComponents = () => {
    let components = {};

    const dirs = [
        path.resolve(utils.cwd, '.sdoc'),
        ...utils.getCommonPaths('global-components')
    ];

    components = Object.assign(components, ...dirs.map(dir => getFilesByDir(dir)));

    return components;
};

const getComponentsImports = () => {
    const components = getComponents();

    const importList = [];
    const componentMap = {};

    Object.keys(components).map(comp => {
        const name = comp.replace(/[-_/]/g, '');
        importList.push(`import ${name} from '${components[comp]}';`);
        componentMap[name] = `%${name}%`;
    });

    debug('全局组件注册：', components);

    return {
        compImport: importList.join('\n'),
        compMap: JSON.stringify(componentMap).replace(/("%|%")/mg, '')
    };
};

module.exports = {
    getComponents,
    getComponentsImports
};
