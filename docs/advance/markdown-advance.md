# Markdown 高级功能

## 三种导出类型
SDoc 中的 `markdown-loader` 对 md 文件支持三种类型的导出，以支持在同一个MD文件中，导出文档 `codebox` 和 `markdown` 两部分内容组合。

使用方式通过md文件 `exportType` 的query参数来决定：
- `exportType=markdown`：导出全部的 `markdown` 内容，不包括 `codebox` 标签内容；
- `exportType=component`：只导出预览的 `codebox` 标签内容，不包括 `markdown` 内容；
- 不加参数：导出全部 `markdown` 和 `codebox` 内容；

如下示例代码展示三种不同的导出情况。

```js
import san from 'san';
import codeboxComponent from './codebox.md?exportType=component';
import codeboxMd from './codebox.md?exportType=markdown';
import codeboxAll from './codebox.md';

export default san.defineComponent({
    template: `<div>
        <h1>Markdown 高级配置</h1>
        <codebox-component/><hr>
        <codebox-md/><hr>
        <codebox-all/>
    </div>`,
    components: {
        'codebox-component': codeboxComponent,
        'codebox-md': codeboxMd,
        'codebox-all': codeboxAll
    }
});
```


- 

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