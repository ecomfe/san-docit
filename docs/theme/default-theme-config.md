# 默认主题配置

::: info
**提示**

本页所列的选项仅对默认主题生效。如果你在使用一个自定义主题，选项可能会有不同。
:::


## 导航栏

导航栏可能包含你的页面标题、它们均取决于你的配置。

### 导航栏 Logo

你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在[公共文件目录](https://github.com/kidnes/san-docit/tree/master/%40sdoc/theme/public)：

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        logo: 'logo.svg',
    }
}
```

### 导航栏链接

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Github', link: 'https://github.com/kidnes/san-docit'}
        ]
    }
}
```

外部链接 `<a>` 标签的特性将默认包含`target="_blank" rel="noopener noreferrer"`，你可以提供 `target` 与 `rel`，它们将被作为特性被增加到 `<a>` 标签上：

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        nav: [
            {text: 'Home', link: '/', target:'_self', rel:''},
            {text: 'Github', link: 'https://github.com/kidnes/san-docit', target:'_blank'}
        ]
    }
}
```

### 禁用导航栏

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        navbar: false
    }
}
```

## 侧边栏

想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        sidebar: {
            '/': [
                '/',
                '/page-a/',
                ['/page-b/']
            ]
        }
    }
}
```

路由配置需要以 `/` 结尾，会自动解析对应的 `md` 文件，并提取的 `title` 标题。对标题的提取，可以明确地在`YAML front matter` 中指定页面的标题，或者自动分析 `md` 文件的 `[H1 H2]` 标题。

路由解析后会变成如下的数据结构：

```json
{
    "path": "/",
    "filename": "/a/b/c.md",
    "title": "标题"
}
```

所以此处可以直接配置成这三项，明确指定 `title` 和 `path`。

有些情况下，我们侧边栏的导航会存在多级的树状结构，父节点不能点击，这时可以通过配置 `title` 和 `children` 来实现。

```js
module.exports = {
    themeConfig: {
        sidebar: {
            '/': [{
                    title: '介绍',
                    path: '/',
                }, {
                    title: '配置',
                    children: ['/basic-config/', '/config/', '/advance-config/']
                }]
        }
    }
};

```


### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```html
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

```js
// .sdoc/config.js
module.exports = {
    themeConfig: {
        sidebar: {
            '/foo/': [
                '/',
                '/foo/one/',
                '/foo/two/'
            ],

            '/bar/': [
                '/bar/three/',
                '/bar/four/'
            ],

            // fallback，放在最后
            '/': [
                '/contact/',
                '/about/'
            ]
        }
    }
}
```

> **注意**
> 
> 确保 fallback 侧边栏被最后定义。SDoc 会按顺序遍历侧边栏配置来寻找匹配的配置。

