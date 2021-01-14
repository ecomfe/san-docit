/**
 * @file 配置文件加载
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const debug = require('debug')('san-docit');
const utils = require('./utils');
const sidebar = require('./parser/sidebar');

const defaultConfig = require('../plugins/config');

exports.load = () => {
    const configPath = path.resolve(utils.cwd, '.sandocit/config.js');

    let config = defaultConfig;

    if (fs.existsSync(configPath)) {
        const customConfig = require(configPath);
        config = Object.assign(defaultConfig, customConfig);

        delete require.cache[configPath];
    }

    if (config.themeConfig && config.themeConfig.sidebar) {
        config.themeConfig.sidebar = sidebar(config.themeConfig.sidebar, config);
    }

    debug('loadConfig:', config.themeConfig.sidebar);
    return config;
};
