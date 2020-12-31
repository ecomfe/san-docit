const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('./utils');
const loadTitle = require('../packages/markdown-loader/loadTitle');

const cwd = utils.getCwd();

const parseSidebarItem = sideItem => {
    if (!sideItem || !sideItem.length) {
        return;
    }
    const suffix = sideItem.endsWith === '/' 
        ? 'README.md' 
        : sideItem.endsWith('.md') ? '' : '.md';
    const filename = path.join(cwd, sideItem + suffix);

    if (!fs.existsSync(filename)) {
        chalk.red(`File not exist: ${filename}.`);
        return;
    }

    const title = loadTitle(fs.readFileSync(filename, 'utf-8'));
    if (!title) {
        chalk.red(`Parse title from markdown failed: ${filename}.`);
        return;
    }

    let route = {
        path: sideItem,
        filename,
        title
    };

    return route;
};

const parseSidebar = children => {
    if (children && children.length) {
        return children.map(sideItem => {
            if (typeof sideItem === 'string') {
                return parseSidebarItem(sideItem);
            }
            else if (sideItem.children) {
                return parseSidebar(sideItem.children);
            }
        });
    }
    return [];
};

const defaultConfig = {
    title: 'San Docit',
    base: '/',
    themeConfig: {
        nav: [],
        sidebar: {}
    }
};

const loadConfig = cwd => {
    const configPath = path.resolve(cwd, '.sandocit/config.js');

    let result = defaultConfig;

    if (fs.existsSync(configPath)) {
        const config = require(configPath);
        result = Object.assign(defaultConfig, config);
    }

    if (result.themeConfig && result.themeConfig.sidebar) {
        const sidebar = result.themeConfig.sidebar;
        Object.keys(sidebar).forEach(name => {
            sidebar[name] = parseSidebar(sidebar[name]);
        })
        console.log('sidebar:', sidebar);
    }

    return result;
};

module.exports = loadConfig(cwd);
