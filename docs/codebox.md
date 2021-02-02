# codebox 可运行的 Markdown 代码片断

背景：组件开发文档里，会有示例**代码片断展示**，同时期望代码能够渲染运行，展示**代码运行结果**。
因此在 SDoc 里，默认集成了可执行的 Markdown 代码片断，通过 `codebox` 标签封装组件。

## 快速开始

如下示例使用 `codebox` 渲染的结果：

<codebox>
#### 说明
这段文字来自`codebox.md`.

```html
<template>
    <div id="codebox">
        <h2>{{text}}</h2>
    </div>
</template>
<script>
    export default {
        initData() {
            return {
                text: 'From codebox.md.'
            };
        }
    };
</script>
<style lang="less">
    @red: red;
    #codebox {
        h2 {
            font-size: 14px;
            color: red;
        }
    }
</style>

```
</codebox>


## 原理
首先了解下 md 文档的编译过程，编译阶段首先由 `markdown-loader` 处理成San的单文件组件，再经 `san-loader` 编译成可执行的San组件，交给浏览器运行。

当文档中包含 `codebox` 标签时，`markdown-loader` 会把文档处理成如下结构，最后在运行阶段由全局的 `codebox` 组件展示：
```html
<codebox>
   <code-preview-0 slot="code-preview"></code-preview-0>
   <section slot="text-place-holder">${textPlaceHolder}</section>
   <div slot="code-place-holder">${codePlaceHolder}</div>
</codebox>
```

- `code-preview-0` 表示代码片断渲染结果的组件，由 `codebox` 标签里的 `html` 或 `san` 代码部分渲染的结果；
- `text-place-holder` 提取说明部分的标题和描述
- `code-place-holder` 提取代码预览部分


