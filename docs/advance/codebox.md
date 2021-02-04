# Markdown 预览组件

SDoc 实现了针对 Markdown 的内容分发 API。通过这个特性，你可以将你的文档分割成多个片段，以便于在组件中灵活组合。

## 为什么需要预览组件
技术开发文档里，会有示例**代码片段展示**，同时期望代码能够渲染运行，展示**代码运行结果**。
因此在 SDoc 里，默认集成了可执行的 Markdown 代码片段，通过 `codebox` 标签语法，封装预览组件，同时展现代码片段和运行代码片段。

## 如何使用

文档中通过 `codebox` 的标签，包含 San 单文件组件的标准写法，会实现同时预览组件和显示组件代码的功能。

如下示例使用 `codebox` 预览组件渲染的结果，可以通过点击按钮  <img src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" width="16" style="margin:0"/>  查看包含的代码：

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


## 二次定制
SDoc 提供了默认的 `codebox` 组件，如果实际项目不满足时，可以进行二次定制开发，具体参考 [codebox 组件](https://github.com/kidnes/san-docit/blob/master/%40sdoc/theme/global-components/codebox.san)。

二次开发中，提供三个 `slot` 插槽区，可由用户自由定制结构和样式，三个`slot` 插槽的 `name` 分别为：
- `code-preview`：代码片段渲染结果，由 `codebox` 标签里的 `html` 或 `san` 代码部分渲染的结果；
- `text-place-holder`：代码说明部分的标题和描述
- `code-place-holder`：代码片段区

具体使用方式：
1. 首先新建 `codebox.san` 放在 `components` 目录，会自动加载成全局组件；
2. 在 `template` 需要的地方插入如下 `slot` 标签；

```html
<slot name="code-preview"></slot>
```

## 原理
首先了解下 md 文档的编译过程，编译阶段首先由 `markdown-loader` 处理成San的单文件组件，再经 `san-loader` 编译成可执行的San组件，交给浏览器运行。

当文档中包含 `codebox` 标签时，`markdown-loader` 会把文档处理成如下结构，最后在运行阶段由全局的 `codebox` 组件展示：
```html
<codebox>
   <code-preview slot="code-preview"></code-preview>
   <section slot="text-place-holder">${textPlaceHolder}</section>
   <div slot="code-place-holder">${codePlaceHolder}</div>
</codebox>
```

- `code-preview` 表示代码片段渲染结果的组件，由 `codebox` 标签里的 `html` 或 `san` 代码部分渲染的结果；
- `text-place-holder` 提取说明部分的标题和描述
- `code-place-holder` 提取代码预览部分
