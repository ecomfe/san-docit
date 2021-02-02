# 使用主题

通过 `config.js` 配置文件加载使用主题。

一个主题可以在以 `sdoc-theme-xxx` 的形式发布到 npm，你可以这样使用它：

```js
// .sdoc/config.js
module.exports = {
    theme: 'sdoc-theme-xx'
}
```

> **注意**
> 
> 以 `@sdoc/theme-` 开头的主题是官方维护的主题。