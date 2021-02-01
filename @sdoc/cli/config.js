/**
 * 插件默认配置
 * @author kidnes
 */
'use strict';

module.exports = {
    base: '/',
    title: 'sdoc',
    head: [],
    meta: {},
    dest: '.sdoc/dist',
    open: true,

    theme: '@sdoc/theme-default',
    themeConfig: {
        logo: 'logo.svg',
        nav: [],
        sidebar: {}
    }
};
