目录结构
SDoc 遵循 “约定优于配置” 的原则，推荐的目录结构如下：

.
├── docs
│   ├── .sdoc (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── layout.san
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.less
│   │   │   └── vars.less
│   │   ├── templates (可选的)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json



docs/.sdoc: 用于存放全局的配置、组件、静态资源等。
docs/.sdoc/components: 该目录中的 San 组件将会被自动注册为全局组件。
docs/.sdoc/theme: 用于存放本地主题。
docs/.sdoc/styles: 用于存放样式相关的文件。
docs/.sdoc/styles/index.less: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
docs/.sdoc/styles/vars.less: 用于重写默认颜色常量，或者设置新的 less 颜色常量。
docs/.sdoc/public: 静态资源目录。
docs/.sdoc/templates: 存储 HTML 模板文件。
docs/.sdoc/templates/dev.ejs: 用于开发环境的 HTML 模板文件。
docs/.sdoc/templates/ssr.ejs: 构建时基于 San SSR 的 HTML 模板文件。
docs/.sdoc/config.js: 配置文件的入口文件。

注意

当你想要去自定义 templates/ssr.ejs 或 templates/dev.ejs 时，最好基于 默认的模板文件来修改，否则可能会导致构建出错。

# 默认的页面路由
此处我们把 docs 作为文档目录，下面所有的“文件的相对路径”都是相对于 docs 目录的。在项目根目录下的 package.json 中添加 scripts ：

{
  "scripts": {
    "start": "sdoc start docs",
    "build": "sdoc build docs"
  }
}
对于上述的目录结构，默认页面路由地址如下：

| 文件的相对路径   | 页面路由地址 |
| ---------------- | ------------ |
| /README.md       | /            |
| /guide/README.md | /guide/      |
| /config.md       | /config/     |

注意：避免同时存在 /config.md 和 /config/README.md，因会同时解析为 /config/ 路径。默认使用 /config.md 文件。