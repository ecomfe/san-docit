## Codebox Componenet

Codebox 组件1：

<codebox>
#### 说明
Codebox 组件1.

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
            color: red;
        }
    }
</style>
<script>
    export default {
        initData() {
            return {
                text: 'Codebox 组件1'
            };
        }
    };
</script>
```
</codebox>

Codebox 组件2：

<codebox>
#### 说明
Codebox 组件2

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
            color: red;
        }
    }
</style>
<script>
    export default {
        initData() {
            return {
                text: 'Codebox 组件2'
            };
        }
    };
</script>
```
</codebox>
