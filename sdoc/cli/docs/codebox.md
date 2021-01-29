## Docit Codebox Demo

Codebox 组件：

<codebox>
#### 说明
这段文字来自`codebox.md`.

```html
<template>
    <div id="codebox">
        <h2>{{text}}</h2>
    </div>
</template>
<style lang="less">
    @red: red;
    #codebox {
        h2 {
            font-size: 14px;
            color: #1890ff;
        }
    }
</style>
<script>
    export default {
        initData() {
            return {
                text: 'From codebox.md.'
            };
        }
    };
</script>
```
</codebox>
