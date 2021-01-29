/**
 * @file 配置文件加载
 * @author kidnes
 */

const fs = require('fs');
const path = require('path');
const debug = require('debug')('sdoc');
const utils = require('./utils');
const sidebar = require('./parser/sidebar');

let config = null;

let paths = [];

const loadConfig = (defaultConfig, pathname, configPath) => {
    if (!configPath) {
        const resolvePath = require.resolve.paths('')
            .map(p => path.join(p, pathname))
            .filter(p => fs.existsSync(p));

        if (!resolvePath.length) {
            return defaultConfig;
        }

        configPath = resolvePath[0];
    }

    if (fs.existsSync(configPath)) {
        try {
            const customConfig = require(configPath);

            delete require.cache[configPath];

            const dirs = configPath.split(pathname);
            if (dirs.length === 2) {
                paths.push(path.join(dirs[0], pathname));
            }

            return Object.assign(defaultConfig, customConfig);
        }
        catch(err) {
            debug(
                `Load config error: ${configPath}
                ${err}
            `);
        }
    }
    return defaultConfig;
}

exports.load = () => {
    if (config) {
        return config;
    }

    // 1. 加载用户配置
    const configPath = path.resolve(utils.cwd, '.docit/config.js');
    config = loadConfig(require('../config'), '.docit', configPath);

    // 2. 加载主题配置
    if (config.theme) {
        config = loadConfig(config, config.theme);
    }

    // 3. 加载继承配置
    if (config.extend) {
        config = loadConfig(config, config.extend);
    }

    if (config.head) {
        config.headHtmlSnippet = utils.headBuild(config.head);
    }

    if (config.themeConfig && config.themeConfig.sidebar) {
        config.themeConfig.sidebar = sidebar(config.themeConfig.sidebar, config);
    }

    utils.setCommonPaths(paths);

    debug('loadConfig:', JSON.stringify(config));
    return config;
};
