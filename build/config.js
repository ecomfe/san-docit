const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');
const loadTitle = require('../packages/markdown-loader/loadTitle');

const cwd = utils.getCwd();

const getFileName = node => {
    let nameArr = [node, node + 'README.md'];
    if (node.endsWith('/')) {
        nameArr.unshift(node.slice(0, -1) + '.md');
    }
    const arr = nameArr.map(name => path.join(cwd, name)).filter(name => fs.existsSync(name));

    return arr && arr[0] ? arr[0] : '';
}

const buildTreeNode = node => {
    if (!node || !node.length) {
        return;
    }
    const filename = getFileName(node);

    if (!filename) {
        console.log(chalk.red(`File not exist: ${filename}`));
        return;
    }

    const title = loadTitle(fs.readFileSync(filename, 'utf-8'));
    if (!title) {
        console.log(chalk.red(`Parse title from markdown failed: ${filename}.`));
        return;
    }

    let route = {
        path: node,
        filename,
        title
    };

    return route;
};

const defaultConfig = {
    title: 'San Docit',
    base: '/',
    themeConfig: {
        nav: [],
        sidebar: {}
    }
};

const parseSidebar = sidebar => {
    const tree = {};
    Object.keys(sidebar).map(name => {
        tree[name] = utils.treeBuild(sidebar[name], buildTreeNode);
    });

    return tree;
};

const loadConfig = cwd => {
    const configPath = path.resolve(cwd, '.sandocit/config.js');

    let result = defaultConfig;

    if (fs.existsSync(configPath)) {
        const config = require(configPath);
        result = Object.assign(defaultConfig, config);
    }

    if (result.themeConfig && result.themeConfig.sidebar) {
        result.themeConfig.sidebar = parseSidebar(result.themeConfig.sidebar);
    }

    return result;
};

module.exports = loadConfig(cwd);
