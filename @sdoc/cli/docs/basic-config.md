# 基本配置

## 配置文件

如果没有任何配置，这个网站将会是非常局限的，用户也无法在你的网站上自由导航。为了更好地自定义你的网站，让我们首先在你的文档目录下创建一个 `.sdoc` 目录，所有 SDoc 相关的文件都将会被放在这里。你的项目结构可能是这样：

```shell
.
├─ docs
│  ├─ README.md
│  └─ .sdoc
│     └─ config.js
└─ package.json
```

一个 SDoc 网站必要的配置文件是 `.sdoc/config.js`，它应该导出一个 JavaScript 对象：

```js
module.exports = {
    title: 'Hello SDoc',
    base: '/',
}
```

对于上述的配置，如果你运行起 dev server，你应该能看到一个页面，它包含一个页头，里面包含一个标题和一个搜索框。SDoc 内置了基于 headers 的搜索 —— 它会自动为所有页面的标题、`h2` 和 `h3` 构建起一个简单的搜索索引。

参见 [配置] 来查看所有可配置的选项。


## 主题配置

一个 SDoc 主题应该负责整个网站的布局和交互细节。在 SDoc 中，目前自带了一个默认的主题（正是你现在所看到的），它是为技术文档而设计的。同时，默认主题提供了一些选项，让你可以去自定义导航栏（navbar）、 侧边栏（sidebar）和 首页（homepage） 等，详情请参见 [默认主题] 。

如果你想开发一个自定义主题，可以参考 [自定义主题]。



## 样式配置

样式配置通过自动加载如下两个文件生效：
docs/.sdoc/styles/index.less: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
docs/.sdoc/styles/vars.less: 用于重写默认颜色常量，或者设置新的 less 颜色常量。


你可以调整的一些变量如下:

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

