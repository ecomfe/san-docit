/**
 * @file 根据配置文件，解析 sidebar
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('../utils');
const loadTitle = require('../../packages/markdown-loader/loadTitle');

const cwd = utils.getCwd();

const getFileName = node => {
    let nameArr = [node, node + 'README.md'];
    if (node.endsWith('/')) {
        nameArr.unshift(node.slice(0, -1) + '.md');
    }
    const arr = nameArr
        .map(name => path.join(cwd, name))
        .filter(name => fs.existsSync(name) && fs.lstatSync(name).isFile());

    return arr && arr[0] ? arr[0] : '';
}

const buildTreeNode = node => {
    if (!node) {
        return;
    }
    const routePath = node.path || node;
    const filename = getFileName(routePath);

    if (!filename) {
        console.log(chalk.red(`File not exist: ${filename}`));
        return;
    }

    const title = node.title || loadTitle(fs.readFileSync(filename, 'utf-8'));
    if (!title) {
        console.log(chalk.red(`Parse title from markdown failed: ${filename}.`));
        return;
    }

    let route = {
        path: routePath,
        filename,
        title
    };

    return route;
};

module.exports = sidebar => {
    debugger;
    const tree = {};
    Object.keys(sidebar).map(name => {
        tree[name] = utils.treeBuild(sidebar[name], buildTreeNode);
    });

    return tree;
};

