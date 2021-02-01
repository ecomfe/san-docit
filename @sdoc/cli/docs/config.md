# 配置

## 基本配置

### base

- 类型: `string`
- 默认值: `/`

部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 应该被设置成 `"/bar/"`，它的值应当总是以斜杠开始，并以斜杠结束。

`base` 将会作为前缀自动地插入到所有以 `/` 开始的其他选项的链接中，所以你只需要指定一次。

### title

- 类型: `string`
- 默认值: `undefined`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

### meta

- 类型: `string`
- 默认值: `{}`

渲染网站的 `<meta>` 标签到当前页面的 HTML 中。比如配置 `meta: {description: '文档工具'}`，渲染 `<meta name="description" content="文档工具">`。

[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#configuration)的 meta 配置项。

### head

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

```js
module.exports = {
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ]
}
```

### host

- 类型: `string`
- 默认值: `'0.0.0.0'`

指定用于 dev server 的主机名。

### port

- 类型: `number`
- 默认值: `8080`

指定 dev server 的端口。

### open

- 类型: `boolean`
- 默认值: `true`

自动打开调试窗口。

### dest

- 类型: `string`
- 默认值: `.sdoc/dist`

指定 `sdoc build` 的输出目录。如果传入的是相对路径，则会基于 `process.cwd()` 进行解析。

## Styling

### index.less

SDoc 提供了一种添加额外样式的简便方法。你可以创建一个 `.sdoc/styles/index.less` 文件。这是一个 [Less](https://less.bootcss.com/)文件，但你也可以使用正常的 CSS 语法。

```less
.content {
    font-size 30px;
}
```


### vars.less

你可以创建一个 `.sdoc/styles/vars.less` 文件。可以调整的一些变量如下:

```less
// 字体
@font-family: Trebuchet MS, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
@code-family: 'Lucida Console', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
@font-size-base: 16px;

// 颜色
@primary-color: #2196f3;
@green-6: #52c41a;
@site-border-color-split: #ebedf0;
@site-heading-color: #0d1a26;
@site-text-color: #314659;
@site-text-color-secondary: #697b8c;

// 样式
@border-radius-sm: 2px;
@border-radius-lg: 12px;
@border-radius: 6px;
@line-height-base: 1.5;
```

> **警告**
> 
> 你应该**只在**这个文件中定义变量。因为 `vars.less` 将在根的 less 配置文件的末尾引入，作为配置，它将被多个文件使用，所以一旦你在这里写了样式，你的样式就会被多次复制。


## 主题

### theme

- 类型: `string`
- 默认值: `undefined`

当你使用自定义主题的时候，需要指定它。


### themeConfig

- 类型: `Object`
- 默认值: `{}`

为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。

**也可以参考:**

- [默认主题](https://sdoc.vuejs.org/zh/theme/default-theme-config.html)。


## 构建流程

### configureWebpack

- 类型: `Object | Function`
- 默认值: `undefined`

用于修改内部的 Webpack 配置。如果给定一个对象，那么它将会被 [webpack-merge](https://github.com/survivejs/webpack-merge)合并到最终的配置中，如果给定一个函数，它将会接受 `config` 作为第一个参数，以及 `isServer` 作为第二个参数，你可以直接更改 `config`，也可以返回一个待合并的对象。

```js
module.exports = {
    configureWebpack: (config, isServer) => {
        if (!isServer) {
          // 修改客户端的 webpack 配置
        }
    }
}
```

### chainWebpack

- 类型: `Function`
- 默认值: `undefined`

通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain)来修改内部的 Webpack 配置。

```js
module.exports = {
    chainWebpack: (config) => {
        // config 是 ChainableConfig 的一个实例
    }
}
```


### postcss

- 类型: `Object`
- 默认值: `{ plugins: [require('autoprefixer')] }`

[postcss-loader](https://github.com/postcss/postcss-loader)的选项，请注意，指定这个值，将会覆盖内置的 autoprefixer，所以你需要自己将它加进去。

### stylus

- 类型: `Object`
- 默认值: `{ preferPathResolver: 'webpack' }`

[stylus-loader](https://github.com/shama/stylus-loader)的选项。

### scss

- 类型: `Object`
- 默认值: `{}`

加载 `*.scss` 文件的 [sass-loader](https://github.com/webpack-contrib/sass-loader)的选项。

### sass

- 类型: `Object`
- 默认值: `{ indentedSyntax: true }`

加载 `*.sass` 文件的 [sass-loader](https://github.com/webpack-contrib/sass-loader)的选项。

### less

- 类型: `Object`
- Default: `{}`

[less-loader](https://github.com/webpack-contrib/less-loader)的选项。
