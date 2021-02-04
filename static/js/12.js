(window.webpackJsonp=window.webpackJsonp||[]).push([[12,2],{19:function(a,n,s){"use strict";s.r(n),function(a){s.d(n,"default",(function(){return u}));var t,o,p,e=s(0),c=s(22),l=s.n(c);class u extends e.a{inited(){a.hub&&a.hub.fire&&a.hub.fire("changed",{level:0,children:[{level:2,title:"为什么需要预览组件",hash:"%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6"},{level:2,title:"如何使用",hash:"%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8"},{level:2,title:"二次定制",hash:"%E4%BA%8C%E6%AC%A1%E5%AE%9A%E5%88%B6"},{level:2,title:"原理",hash:"%E5%8E%9F%E7%90%86"}]})}}t=u,o="components",p={"code-preview-0":l.a},o in t?Object.defineProperty(t,o,{value:p,enumerable:!0,configurable:!0,writable:!0}):t[o]=p}.call(this,s(3))},20:function(a,n,s){"use strict";s.r(n),n.default={initData:()=>({text:"From codebox.md."})}},22:function(a,n,s){var t=s(1);s(45);var o=s(46),p=s(20).default;a.exports=s(20),a.exports.default=t(p,o,[])},44:function(a,n){a.exports=' <div class="content"><div class="markdown"><h1 id="markdown-%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6"><a class="header-anchor" href="#markdown-%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6">#</a> Markdown 预览组件</h1> <p>SDoc 实现了针对 Markdown 的内容分发 API。通过这个特性，你可以将你的文档分割成多个片段，以便于在组件中灵活组合。</p> <h2 id="%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6"><a class="header-anchor" href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E9%A2%84%E8%A7%88%E7%BB%84%E4%BB%B6">#</a> 为什么需要预览组件</h2> <p>技术开发文档里，会有示例<strong>代码片段展示</strong>，同时期望代码能够渲染运行，展示<strong>代码运行结果</strong>。因此在 SDoc 里，默认集成了可执行的 Markdown 代码片段，通过 <code>codebox</code> 标签语法，封装预览组件，同时展现代码片段和运行代码片段。</p> <h2 id="%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8"><a class="header-anchor" href="#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8">#</a> 如何使用</h2> <p>文档中通过 <code>codebox</code> 的标签，包含 San 单文件组件的标准写法，会实现同时预览组件和显示组件代码的功能。</p> <p>如下示例使用 <code>codebox</code> 预览组件渲染的结果，可以通过点击按钮 <img src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" width="16" style="margin:0"/> 查看包含的代码：</p> <codebox> <code-preview-0 slot="code-preview"></code-preview-0> <section slot="text-place-holder"><h4 id="%E8%AF%B4%E6%98%8E"><a class="header-anchor" href="#%E8%AF%B4%E6%98%8E">#</a> 说明</h4> <p>这段文字来自<code>codebox.md</code>.</p> </section> <div slot="code-place-holder"> <div class="markdown"><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>codebox<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>&#123;&#123;text}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n        <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token punctuation">{</span>\n                text<span class="token operator">:</span> <span class="token string">\'From codebox.md.\'</span>\n            <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>less<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">\n    <span class="token atrule"><span class="token rule">@red</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span>\n    <span class="token selector">#codebox</span> <span class="token punctuation">{</span>\n        <span class="token selector">h2</span> <span class="token punctuation">{</span>\n            <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>\n            <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code></pre> </div> </div> </codebox> <h2 id="%E4%BA%8C%E6%AC%A1%E5%AE%9A%E5%88%B6"><a class="header-anchor" href="#%E4%BA%8C%E6%AC%A1%E5%AE%9A%E5%88%B6">#</a> 二次定制</h2> <p>SDoc 提供了默认的 <code>codebox</code> 组件，如果实际项目不满足时，可以进行二次定制开发，具体参考 <a href="https://github.com/kidnes/san-docit/blob/master/%40sdoc/theme/global-components/codebox.san">codebox 组件</a>。</p> <p>二次开发中，提供三个 <code>slot</code> 插槽区，可由用户自由定制结构和样式，三个<code>slot</code> 插槽的 <code>name</code> 分别为：</p> <ul> <li><code>code-preview</code>：代码片段渲染结果，由 <code>codebox</code> 标签里的 <code>html</code> 或 <code>san</code> 代码部分渲染的结果；</li> <li><code>text-place-holder</code>：代码说明部分的标题和描述</li> <li><code>code-place-holder</code>：代码片段区</li> </ul> <p>具体使用方式：</p> <ol> <li>首先新建 <code>codebox.san</code> 放在 <code>components</code> 目录，会自动加载成全局组件；</li> <li>在 <code>template</code> 需要的地方插入如下 <code>slot</code> 标签；</li> </ol> <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>code-preview<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">></span></span></code></pre> <h2 id="%E5%8E%9F%E7%90%86"><a class="header-anchor" href="#%E5%8E%9F%E7%90%86">#</a> 原理</h2> <p>首先了解下 md 文档的编译过程，编译阶段首先由 <code>markdown-loader</code> 处理成San的单文件组件，再经 <code>san-loader</code> 编译成可执行的San组件，交给浏览器运行。</p> <p>当文档中包含 <code>codebox</code> 标签时，<code>markdown-loader</code> 会把文档处理成如下结构，最后在运行阶段由全局的 <code>codebox</code> 组件展示：</p> <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>codebox</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code-preview</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>code-preview<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code-preview</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text-place-holder<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>${textPlaceHolder}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>code-place-holder<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>${codePlaceHolder}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>codebox</span><span class="token punctuation">></span></span></code></pre> <ul> <li><code>code-preview</code> 表示代码片段渲染结果的组件，由 <code>codebox</code> 标签里的 <code>html</code> 或 <code>san</code> 代码部分渲染的结果；</li> <li><code>text-place-holder</code> 提取说明部分的标题和描述</li> <li><code>code-place-holder</code> 提取代码预览部分</li> </ul> </div></div> '},45:function(a,n,s){"use strict";s.r(n)},46:function(a,n){a.exports=' <div id="codebox"> <h2>{{text}}</h2> </div> '},56:function(a,n,s){var t=s(1),o=s(44),p=s(19).default;a.exports=s(19),a.exports.default=t(p,o,[])}}]);