// const globby = require('globby');
const config = require('../config');
const utils = require('../utils');

const cwd = utils.cwd;

let routes = {};
const getRoutes = () => {
    if (Object.keys(routes).length > 0) {
        return routes;
    }

    initRoutesFromConfig();

    return routes;
};

const initRoutesFromConfig = () => {
    const sidebar = config.load().themeConfig.sidebar;
    Object.keys(sidebar).forEach(name => {
        utils.treeWalk(sidebar[name], node => {
            if (/\.(js|md)$/.test(node.filename) && node.path) {
                const path = node.path.replace(/^\//, '');
                routes[path] = node.filename;
            }
        });
    });
};

const initRoutesFromMd = () => {
    const files = globby.sync(['**/*.md'], {
        expandDirectories: false,
        onlyFiles: false,
        cwd: cwd
    });

    files.map(file => {
        const name = file.replace(/README\.md$/, '').replace(/\.md$/, '/');
        routes[name] = cwd + '/' + file;
    });
}

const getRoutesImportStr = () => {
    const routes = getRoutes();
    const routesImport = {};
    Object.keys(routes).map(route => {
        routesImport[`/${route}`] = `%() => import('${routes[route]}')%`;
    });
    return JSON.stringify(routesImport).replace(/("%|%")/mg, '');
}

module.exports = {
    getRoutes,
    getRoutesImportStr
}
