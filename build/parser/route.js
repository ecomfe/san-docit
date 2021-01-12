const globby = require('globby');

const utils = require('../utils');

const cwd = utils.getCwd();

let routes = {};
const getRoutes = () => {
    if (Object.keys(routes).length > 0) {
        return routes;
    }

    const files = globby.sync(['**/*.md'], {
        expandDirectories: false,
        onlyFiles: false,
        cwd: cwd
    });

    files.map(file => {
        const name = file.replace(/README\.md$/, '').replace(/\.md$/, '/');
        routes[name] = cwd + '/' + file;
    });
    return routes;
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
