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

let config = null;

exports.load = () => {
    if (config) {
        return config;
    }

    const configPath = path.resolve(utils.cwd, '.sandocit/config.js');
    console.log('configPath:', configPath);

    config = defaultConfig;

    if (fs.existsSync(configPath)) {
        const customConfig = require(configPath);
        config = Object.assign(defaultConfig, customConfig);

        delete require.cache[configPath];
    }

    if (config.head) {
        config.headHtmlSnippet = utils.headBuild(config.head);
    }

    if (config.themeConfig && config.themeConfig.sidebar) {
        config.themeConfig.sidebar = sidebar(config.themeConfig.sidebar, config);
    }

    debug('loadConfig:', JSON.stringify(config));
    return config;
};
