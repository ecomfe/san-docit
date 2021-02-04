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
                            filename: 'guide/introduce.md'
                        },
                        '/guide/quick-start/',
                        '/guide/directory-structure/',
                        '/guide/basic-config/',
                        '/guide/config/'
                    ]
                },
                {
                    title: '样式',
                    children: ['/theme/using/', '/theme/writing/', '/theme/default-theme-config/']
                },
                {
                    title: '深入',
                    children: [{
                        path: '/codebox/',
                        title: 'Markdown 预览组件',
                        filename: 'advance/codebox.md'
                    }, {
                        path: '/markdown-advance/',
                        title: 'Markdown 高级能力',
                        filename: 'advance/markdown-advance.md'
                    }]
                }
            ]
        }
    }
};
