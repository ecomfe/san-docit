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
