const fs = require('fs');
const path = require('path');
const globby = require('globby');
const debug = require('debug')('san-docit');
const utils = require('../utils');

const cwd = utils.getCwd();

const getDirs = () => {
    const dirs = [
        path.join(cwd, '.sandocit/components'),
        path.join(__dirname, '../../plugins/components')
    ];

    return dirs.filter(dir => fs.existsSync(dir));
}

const getFilesByDir = dir => {
    const components = {};

    const files = globby.sync('**/*.san', {
        expandDirectories: false,
        onlyFiles: false,
        cwd: dir
    });

    files.map(file => components[file.replace(/\.san$/, '')] = dir + '/' + file);

    return components;
}

const getComponents = () => {
    let components = {};

    const dirs = getDirs();

    dirs.map(dir => {
        const files = getFilesByDir(dir);
        components = Object.assign(components, files);
    });

    return components;
}

const getComponentsImports = () => {
    const components = getComponents();

    const importList = [];
    const componentMap = {};

    Object.keys(components).map(comp => {
        const name = comp.replace(/[-_]/g, '');
        importList.push(`import ${name} from '${components[comp]}'`);
        componentMap[name] = `%${name}%`;
    });

    debug('全局组件注册：', components);

    return {
        compImport: importList.join('\n'),
        compMap: JSON.stringify(componentMap).replace(/("%|%")/mg, '')
    };
}

module.exports = {
    getComponents,
    getComponentsImports
}
