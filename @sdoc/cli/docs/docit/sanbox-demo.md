---
title: Docit Sanbox Demo
---

## Docit Sanbox Demo New

<codebox>
#### What's Docit?
san docit 命令是放在`packages/san-cli-docit`中实现的，它是一个 Commander 插件，如果要编写自己的 Commander 插件可以参考它的代码。

```html
<template>
    <div id="hello-codebox">
        <hello />
        <h2>{{text}}</h2>
    </div>
</template>
<style lang="less">
    @red: red;
    #hello-codebox {
        h1 {
            font-size: 18px;
        }
        h2 {
            font-size: 16px;
            color: @red;
        }
    }
</style>
<script>
    import Hello from './component.js';
    export default {
        initData() {
            return {
                text: 'Red, Less enabled!'
            };
        },
        components: {
            hello: Hello
        }
    };
</script>
```

</codebox>

## Sanbox 复杂玩法，适合自定义

<codebox>
#### 说明
上面的内容是来自`./codebox.js`，通过 picker 的 loader 单独引入对应模块来展现的。

```html
<template>
    <div class="codebox-demo">
        <h3>来自`?exportType=component&index=0`</h3>
        <codebox-component1 />
        <hr />
        <h3>来自`?exportType=component&index=1`</h3>
        <codebox-component2 />
        <hr />
        <h3>来自`?exportType=markdown`</h3>
        <codebox-md />
        <hr />
        <h3>来自`?`</h3>
        <codebox-all />
    </div>
</template>
<style lang="less">
    @red: red;
    .markdown .codebox-demo {
        h1 {
            font-size: 16px;
        }
    }
</style>
<script>
    export default {
        components: require('./sanbox.js').default
    };
</script>
```

</codebox>
