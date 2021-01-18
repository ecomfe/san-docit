const fs = require('fs');
const path = require('path');
const globby = require('globby');
const option = require('../bin/option');

// const cwd = (() => {
//     const cwdEnv = process.env.CWD;
//     const cwdProcess = process.cwd();
//     return !cwdEnv ? cwdProcess : cwdEnv.startsWith('/') ? cwdEnv : path.join(cwdProcess, cwdEnv);
// })();

const cwd = option.getCwd();

const resolve = dir => {
    return path.join(__dirname, '..', dir);
};

const resolveDocit = dir => {
    return path.join(cwd, '.sandocit', dir);
};

let routes = {};
const getRoutes = () => {
    if (Object.keys(routes).length > 0) {
        return routes;
    }

    console.log('Base: ', cwd);
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

const getCommonDirs = dir => {
    const dirs = [
        path.join(cwd, '.sandocit/', dir),
        path.join(__dirname, '../plugins/', dir)
    ];

    return dirs.filter(dir => fs.existsSync(dir));
}

module.exports = {
    cwd,
    resolve,
    resolveDocit,
    getRoutes,
    getRoutesImportStr,
    treeBuild,
    treeWalk,
    getCommonDirs
}
