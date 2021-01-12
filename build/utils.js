const path = require('path');
const globby = require('globby');

const getCwd = () => {
    return process.env.cwd || process.cwd();
}

let routes = {};
const getRoutes = () => {
    if (Object.keys(routes).length > 0) {
        return routes;
    }

    const cwd = getCwd();
    const files = globby.sync('**/*.md', {
        expandDirectories: false,
        onlyFiles: false,
        cwd: cwd
    });

    files.map(file => routes[file.replace(/\.md$/, '/')] = cwd + '/' + file);
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

const treeWalk = (root, before, after) => {
    if (!root) {
        return;
    }
    before(root, 0);

    if (!root.children) {
        return;
    }
    root.children.forEach(item => {
        before(item, 1);

        if (item.children) {
            treeWalk(item, before, after);
        }

        after(item, 1);
    });

    after(root, 0);
}

const treeBuild = (root, callback) => {
    if (!root) {
        return {};
    }
    if (!Array.isArray(root)) {
        root = [root];
    }

    const children = root.map(node => {
        if (typeof node === 'string') {
            return callback(node);
        }
        else if (node.children) {
            return {
                ...node,
                ...treeBuild(node.children, callback)
            };
        }
        else if (Array.isArray(node)) {
            return treeBuild(node, callback);
        }
        return callback(node);
    });
    return {
        children
    };
};

module.exports = {
    getCwd,
    getRoutes,
    getRoutesImportStr,
    treeBuild,
    treeWalk
}
