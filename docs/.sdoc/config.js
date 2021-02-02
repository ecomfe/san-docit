/**
 * 文档配置
 * @author kidnes
 */
'use strict';

module.exports = {
    base: '/san-docit/',
    title: 'sdoc',
    head: [
        ['link', {rel: 'icon', href: '/san-docit/favicon.ico'}]
    ],
    meta: {
        description: '文档，文档工具，建站'
    },
    dest: '.sdoc/dist',

    theme: '@sdoc/theme-default',
    themeConfig: {
        logo: 'logo.svg',
        nav: [
            {text: 'GitHub', link: 'https://github.com/kidnes/san-docit'}
        ],

        sidebar: {
            '/': [
                {
                    title: '指南',
                    children: [
                        {
                            path: '/',
                            title: '介绍',
                            filename: 'introduce.md'
                        },
                        '/quick-start/',
                        '/directory-structure/',
                        '/basic-config/',
                        '/config/',
                        // {
                        //     path: '/codebox/',
                        //     title: 'codebox',
                        //     filename: 'codebox.md'
                        // }
                    ]
                },
                {
                    title: '样式',
                    children: ['/theme/using/', '/theme/writing/', '/theme/default-theme-config/']
                }
            ]
        }
    }
};
