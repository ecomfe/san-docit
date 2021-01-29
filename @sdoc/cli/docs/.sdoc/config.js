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
    logo: 'logo.svg',

    theme: '@sdoc/theme-default',
    themeConfig: {
        nav: [
            {text: 'San', link: 'https://baidu.github.io/san/'},
            {text: 'Santd', link: 'https://ecomfe.github.io/santd/'}
        ],

        sidebar: {
            '/': [
                '/',
                '/simple/',
                '/markdownit/',
                '/codebox/',
                '/docit/sanbox-demo/',
                {
                    title: 'title1',
                    children: [
                        '/simple/',
                        {
                            title: 'title2',
                            children: ['/simple/', '/codebox/']
                        }
                    ]
                }
            ]
        }
    }
};
