# 开发主题

想要书写一个主题，首先在你文档根目录创建一个 `.sdoc/theme` 目录，接着创建一个 `layout.san` 文件：

```
.
└─ .sdoc
    └─ theme
        └─ layout.san
```

到这里，就像开发一个普通的 San 应用一样。如何组织你的主题，这完全取决于你。

## 获取渲染内容

当前的 `.md` 文件渲染的内容，可以作为一个独特的全局组件 `<Content/>` 来使用，你可能想要它显示在页面中的某个地方。一个最简单的主题，可以是一个唯一的 `layout.san` 组件，并包含以下内容：

```html
<template>
    <div class="theme-container">
        {{docit.content | raw}}
    </div>
</template>
<script>
export default {
    dataTypes: {
        docit: DataTypes.object
    }
}
</script>
```


## 目录结构

随着需求的变化，只有一个布局组件 `layout.san` 可能还不够，你可能想要定义更多的布局组件用于不同的页面。

那么是时候重新组织你的主题了！一个约定的主题的目录结构如下：

```
theme
├── global-components
│   └── xxx.san
├── components
│   └── xxx.san
├── layouts
│   ├── layout.san (必要的)
│   └── 404.san
├── styles
│   ├── index.less
│   └── palette.less
├── templates
│   ├── dev.ejs
│   └── ssr.ejs
├── index.js
└── package.json
```

- `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。
- `theme/components`: San 组件。
- `theme/layouts`: 布局组件，其中 `layout.san` 是必需的。
- `theme/styles`: 全局的样式和调色板。
- `theme/templates`: 修改默认的模板文件。
- `theme/index.js`: 主题文件的入口文件。

注意

当你将你的主题以一个 npm 包的形式发布时，如果你没有任何主题配置，即没有 `theme/index.js`，那么你需要将 `package.json` 中的 `"main"` 字段设置为 `layouts/layout.san`，只有这样 SDoc 才能正确地解析主题。

```json
{
    ...
    "main": "layouts/layout.san",
    ...
}
```

## 布局组件

假设你的主题 `layouts` 目录如下：

```
theme
└── layouts
   ├── layout.san
   └── 404.san
```

然后，所有的页面将会默认使用 `layout.san` 作为布局组件，对于那些匹配不到的路由将会使用 `404.vue`。

