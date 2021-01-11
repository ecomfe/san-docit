/**
 * @file 配置文件加载
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const debug = require('debug')('san-docit');
const utils = require('./utils');
const sidebar = require('./parser/sidebar');

const cwd = utils.getCwd();

const defaultConfig = require('../plugins/config');

exports.load = () => {
    const configPath = path.resolve(cwd, '.sandocit/config.js');

    let result = defaultConfig;

    if (fs.existsSync(configPath)) {
        const config = require(configPath);
        result = Object.assign(defaultConfig, config);

        delete require.cache[configPath];
    }

    if (result.themeConfig && result.themeConfig.sidebar) {
        result.themeConfig.sidebar = sidebar(result.themeConfig.sidebar);
    }

    debug('loadConfig:', result.themeConfig.sidebar);
    return result;
};
