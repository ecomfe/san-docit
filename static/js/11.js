(window.webpackJsonp=window.webpackJsonp||[]).push([[11,3],{15:function(s,a,n){"use strict";n.r(a),function(s){n.d(a,"default",(function(){return p}));var e,t,o,c=n(0);class p extends c.a{inited(){s.hub&&s.hub.fire&&s.hub.fire("changed",{level:0,children:[{level:2,title:"基本配置",hash:"%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE",children:[{level:3,title:"base",hash:"base"},{level:3,title:"title",hash:"title"},{level:3,title:"meta",hash:"meta"},{level:3,title:"head",hash:"head"},{level:3,title:"host",hash:"host"},{level:3,title:"port",hash:"port"},{level:3,title:"open",hash:"open"},{level:3,title:"dest",hash:"dest"}]},{level:2,title:"Styling",hash:"styling",children:[{level:3,title:"index.less",hash:"index.less"},{level:3,title:"vars.less",hash:"vars.less"}]},{level:2,title:"主题",hash:"%E4%B8%BB%E9%A2%98",children:[{level:3,title:"theme",hash:"theme"},{level:3,title:"themeConfig",hash:"themeconfig"}]},{level:2,title:"构建流程",hash:"%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B",children:[{level:3,title:"configureWebpack",hash:"configurewebpack"},{level:3,title:"chainWebpack",hash:"chainwebpack"},{level:3,title:"postcss",hash:"postcss"},{level:3,title:"stylus",hash:"stylus"},{level:3,title:"scss",hash:"scss"},{level:3,title:"sass",hash:"sass"},{level:3,title:"less",hash:"less"}]}]})}}o={},(t="components")in(e=p)?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o}.call(this,n(3))},36:function(s,a){s.exports=' <div class="content"><div class="markdown"><h1 id="%E9%85%8D%E7%BD%AE"><a class="header-anchor" href="#%E9%85%8D%E7%BD%AE">#</a> 配置</h1> <h2 id="%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE"><a class="header-anchor" href="#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE">#</a> 基本配置</h2> <h3 id="base"><a class="header-anchor" href="#base">#</a> base</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>/</code></li> </ul> <p>部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 GitHub pages，如果你想将你的网站部署到 <code>https://foo.github.io/bar/</code>，那么 <code>base</code> 应该被设置成 <code>&quot;/bar/&quot;</code>，它的值应当总是以斜杠开始，并以斜杠结束。</p> <p><code>base</code> 将会作为前缀自动地插入到所有以 <code>/</code> 开始的其他选项的链接中，所以你只需要指定一次。</p> <h3 id="title"><a class="header-anchor" href="#title">#</a> title</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>undefined</code></li> </ul> <p>网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。</p> <h3 id="meta"><a class="header-anchor" href="#meta">#</a> meta</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>{}</code></li> </ul> <p>渲染网站的 <code>&lt;meta&gt;</code> 标签到当前页面的 HTML 中。比如配置 <code>meta: {description: \'文档工具\'}</code>，渲染 <code>&lt;meta name=&quot;description&quot; content=&quot;文档工具&quot;&gt;</code>。</p> <p><a href="https://github.com/jantimon/html-webpack-plugin#configuration">html-webpack-plugin</a>的 meta 配置项。</p> <h3 id="head"><a class="header-anchor" href="#head">#</a> head</h3> <ul> <li>类型: <code>Array</code></li> <li>默认值: <code>[]</code></li> </ul> <p>额外的需要被注入到当前页面的 HTML <code>&lt;head&gt;</code> 中的标签，每个标签都可以以 <code>[tagName, { attrName: attrValue }, innerHTML?]</code> 的格式指定，举个例子，增加一个自定义的 favicon：</p> <pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n    head<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">\'link\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> rel<span class="token operator">:</span> <span class="token string">\'icon\'</span><span class="token punctuation">,</span> href<span class="token operator">:</span> <span class="token string">\'/logo.png\'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre> <h3 id="host"><a class="header-anchor" href="#host">#</a> host</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>\'0.0.0.0\'</code></li> </ul> <p>指定用于 dev server 的主机名。</p> <h3 id="port"><a class="header-anchor" href="#port">#</a> port</h3> <ul> <li>类型: <code>number</code></li> <li>默认值: <code>8080</code></li> </ul> <p>指定 dev server 的端口。</p> <h3 id="open"><a class="header-anchor" href="#open">#</a> open</h3> <ul> <li>类型: <code>boolean</code></li> <li>默认值: <code>true</code></li> </ul> <p>自动打开调试窗口。</p> <h3 id="dest"><a class="header-anchor" href="#dest">#</a> dest</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>.sdoc/dist</code></li> </ul> <p>指定 <code>sdoc build</code> 的输出目录。如果传入的是相对路径，则会基于 <code>process.cwd()</code> 进行解析。</p> <h2 id="styling"><a class="header-anchor" href="#styling">#</a> Styling</h2> <h3 id="index.less"><a class="header-anchor" href="#index.less">#</a> index.less</h3> <p>SDoc 提供了一种添加额外样式的简便方法。你可以创建一个 <code>.sdoc/styles/index.less</code> 文件。这是一个 <a href="https://less.bootcss.com/">Less</a>文件，但你也可以使用正常的 CSS 语法。</p> <pre class="language-less"><code class="language-less"><span class="token selector">.content</span> <span class="token punctuation">{</span>\n    font<span class="token operator">-</span>size 30px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre> <h3 id="vars.less"><a class="header-anchor" href="#vars.less">#</a> vars.less</h3> <p>你可以创建一个 <code>.sdoc/styles/vars.less</code> 文件。可以调整的一些变量如下:</p> <pre class="language-less"><code class="language-less"><span class="token comment">// 字体</span>\n<span class="token variable">@font-family<span class="token punctuation">:</span></span> Trebuchet MS<span class="token punctuation">,</span> <span class="token operator">-</span>apple<span class="token operator">-</span>system<span class="token punctuation">,</span> BlinkMacSystemFont<span class="token punctuation">,</span> Segoe UI<span class="token punctuation">,</span> PingFang SC<span class="token punctuation">,</span> Hiragino Sans GB<span class="token punctuation">,</span> Microsoft YaHei<span class="token punctuation">,</span> Helvetica Neue<span class="token punctuation">,</span> Helvetica<span class="token punctuation">,</span>\n    Arial<span class="token punctuation">,</span> sans<span class="token operator">-</span>serif<span class="token punctuation">,</span> Apple Color Emoji<span class="token punctuation">,</span> Segoe UI Emoji<span class="token punctuation">,</span> Segoe UI Symbol<span class="token punctuation">;</span>\n<span class="token variable">@code-family<span class="token punctuation">:</span></span> <span class="token string">\'Lucida Console\'</span><span class="token punctuation">,</span> Consolas<span class="token punctuation">,</span> Monaco<span class="token punctuation">,</span> <span class="token string">\'Andale Mono\'</span><span class="token punctuation">,</span> <span class="token string">\'Ubuntu Mono\'</span><span class="token punctuation">,</span> monospace<span class="token punctuation">;</span>\n<span class="token variable">@font-size-base<span class="token punctuation">:</span></span> 16px<span class="token punctuation">;</span>\n\n<span class="token comment">// 颜色</span>\n<span class="token variable">@primary-color<span class="token punctuation">:</span></span> #2196f3<span class="token punctuation">;</span>\n<span class="token variable">@green-6<span class="token punctuation">:</span></span> #52c41a<span class="token punctuation">;</span>\n<span class="token variable">@site-border-color-split<span class="token punctuation">:</span></span> #ebedf0<span class="token punctuation">;</span>\n<span class="token variable">@site-heading-color<span class="token punctuation">:</span></span> #0d1a26<span class="token punctuation">;</span>\n<span class="token variable">@site-text-color<span class="token punctuation">:</span></span> #314659<span class="token punctuation">;</span>\n<span class="token variable">@site-text-color-secondary<span class="token punctuation">:</span></span> #697b8c<span class="token punctuation">;</span>\n\n<span class="token comment">// 样式</span>\n<span class="token variable">@border-radius-sm<span class="token punctuation">:</span></span> 2px<span class="token punctuation">;</span>\n<span class="token variable">@border-radius-lg<span class="token punctuation">:</span></span> 12px<span class="token punctuation">;</span>\n<span class="token variable">@border-radius<span class="token punctuation">:</span></span> 6px<span class="token punctuation">;</span>\n<span class="token variable">@line-height-base<span class="token punctuation">:</span></span> 1.5<span class="token punctuation">;</span></code></pre> <blockquote> <p><strong>警告</strong></p> <p>你应该<strong>只在</strong>这个文件中定义变量。因为 <code>vars.less</code> 将在根的 less 配置文件的末尾引入，作为配置，它将被多个文件使用，所以一旦你在这里写了样式，你的样式就会被多次复制。</p> </blockquote> <h2 id="%E4%B8%BB%E9%A2%98"><a class="header-anchor" href="#%E4%B8%BB%E9%A2%98">#</a> 主题</h2> <h3 id="theme"><a class="header-anchor" href="#theme">#</a> theme</h3> <ul> <li>类型: <code>string</code></li> <li>默认值: <code>undefined</code></li> </ul> <p>当你使用自定义主题的时候，需要指定它。</p> <h3 id="themeconfig"><a class="header-anchor" href="#themeconfig">#</a> themeConfig</h3> <ul> <li>类型: <code>Object</code></li> <li>默认值: <code>{}</code></li> </ul> <p>为当前的主题提供一些配置，这些选项依赖于你正在使用的主题。</p> <p><strong>也可以参考:</strong></p> <ul> <li><a href="https://sdoc.vuejs.org/zh/theme/default-theme-config.html">默认主题</a>。</li> </ul> <h2 id="%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B"><a class="header-anchor" href="#%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B">#</a> 构建流程</h2> <h3 id="configurewebpack"><a class="header-anchor" href="#configurewebpack">#</a> configureWebpack</h3> <ul> <li>类型: <code>Object | Function</code></li> <li>默认值: <code>undefined</code></li> </ul> <p>用于修改内部的 Webpack 配置。如果给定一个对象，那么它将会被 <a href="https://github.com/survivejs/webpack-merge">webpack-merge</a>合并到最终的配置中，如果给定一个函数，它将会接受 <code>config</code> 作为第一个参数，以及 <code>isServer</code> 作为第二个参数，你可以直接更改 <code>config</code>，也可以返回一个待合并的对象。</p> <pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function-variable function">configureWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config<span class="token punctuation">,</span> isServer</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isServer<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token comment">// 修改客户端的 webpack 配置</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre> <h3 id="chainwebpack"><a class="header-anchor" href="#chainwebpack">#</a> chainWebpack</h3> <ul> <li>类型: <code>Function</code></li> <li>默认值: <code>undefined</code></li> </ul> <p>通过 <a href="https://github.com/mozilla-neutrino/webpack-chain">webpack-chain</a>来修改内部的 Webpack 配置。</p> <pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function-variable function">chainWebpack</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token comment">// config 是 ChainableConfig 的一个实例</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre> <h3 id="postcss"><a class="header-anchor" href="#postcss">#</a> postcss</h3> <ul> <li>类型: <code>Object</code></li> <li>默认值: <code>{ plugins: [require(\'autoprefixer\')] }</code></li> </ul> <p><a href="https://github.com/postcss/postcss-loader">postcss-loader</a>的选项，请注意，指定这个值，将会覆盖内置的 autoprefixer，所以你需要自己将它加进去。</p> <h3 id="stylus"><a class="header-anchor" href="#stylus">#</a> stylus</h3> <ul> <li>类型: <code>Object</code></li> <li>默认值: <code>{ preferPathResolver: \'webpack\' }</code></li> </ul> <p><a href="https://github.com/shama/stylus-loader">stylus-loader</a>的选项。</p> <h3 id="scss"><a class="header-anchor" href="#scss">#</a> scss</h3> <ul> <li>类型: <code>Object</code></li> <li>默认值: <code>{}</code></li> </ul> <p>加载 <code>*.scss</code> 文件的 <a href="https://github.com/webpack-contrib/sass-loader">sass-loader</a>的选项。</p> <h3 id="sass"><a class="header-anchor" href="#sass">#</a> sass</h3> <ul> <li>类型: <code>Object</code></li> <li>默认值: <code>{ indentedSyntax: true }</code></li> </ul> <p>加载 <code>*.sass</code> 文件的 <a href="https://github.com/webpack-contrib/sass-loader">sass-loader</a>的选项。</p> <h3 id="less"><a class="header-anchor" href="#less">#</a> less</h3> <ul> <li>类型: <code>Object</code></li> <li>Default: <code>{}</code></li> </ul> <p><a href="https://github.com/webpack-contrib/less-loader">less-loader</a>的选项。</p> </div></div> '},44:function(s,a,n){var e=n(2),t=n(36),o=n(15).default;s.exports=n(15),s.exports.default=e(o,t,[])}}]);