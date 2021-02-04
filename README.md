# san-docit

> 基于 San 的极简静态站点生成器

## 介绍
SDoc 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 San 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 San 及其子项目的文档需求。

每一个由 SDoc 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，San 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

## 快速上手

> **前提条件**
>
> SDoc 需要 Node.js (opens new window)>= 8.6

本文会帮助你从头搭建一个简单的 SDoc 文档。如果你想在一个现有项目中使用 SDoc 管理文档，从步骤 3 开始。

1. 创建并进入一个新目录

```shell
mkdir sdoc-starter && cd sdoc-starter
```

2. 使用你喜欢的包管理器进行初始化
```shell
yarn init # npm init
```

3. 将 SDoc 安装为本地依赖

我们已经不再推荐全局安装 SDoc

```shell
yarn add -D @sdoc/cli # npm install -D @sdoc/cli
```

> **注意**
>
> 如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn 而不是 npm 来安装 SDoc。因为在这种情形下，npm 会生成错误的依赖树。

4. 创建你的第一篇文档

```shell
mkdir docs && echo '# Hello SDoc' > docs/README.md
```

5. 在 package.json 中添加一些 scripts

这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

```shell
{
  "scripts": {
    "docs:start": "sdoc start docs",
    "docs:build": "sdoc build docs"
  }
}
```

6. 在本地启动服务器

```shell
yarn docs:start # npm run docs:start
```

SDoc 会在 <http://localhost:8080> 启动一个热重载的开发服务器。


现在，你应该已经有了一个简单可用的 SDoc 文档。接下来，了解一下推荐的 [目录结构](https://kidnes.github.io/san-docit/guide/directory-structure/) 和 SDoc 中的 [基本配置](https://kidnes.github.io/san-docit/guide/basic-config/)。

