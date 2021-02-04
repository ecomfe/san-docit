/**
 * 文档配置
 * @author kidnes
 */
'use strict';

module.exports = {
    base: '/',
    title: 'sdoc',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    meta: {
        description: '文档工具'
    },
    dest: '.sdoc/dest',

    theme: '@sdoc/theme-default',
    themeConfig: {
        logo: 'logo.svg',
        nav: [
            {text: 'San', link: 'https://baidu.github.io/san/'},
            {text: 'Santd', link: 'https://ecomfe.github.io/santd/'}
        ],

        sidebar: {
            '/': [
                '/simple/',
                '/markdownit/',
                '/codebox/',
                '/docit/sanbox-demo/',
                {
                    path: '/advance/',
                    filename: 'advance.js',
                    title: 'Markdown 高级配置'
                },
                {
                    title: 'title1',
                    children: [
                        '/simple/',
                        '/docit/sanbox-demo/'
                    ]
                }
            ]
        }
    }
};
