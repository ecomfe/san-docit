!function(e){function t(t){for(var n,s,a=t[0],c=t[1],d=t[2],h=0,u=[];h<a.length;h++)s=a[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&u.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(l&&l(t);u.length;)u.shift()();return o.push.apply(o,d||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var c=r[a];0!==i[c]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},i={2:0},o=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r=i[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=n);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.src=function(e){return s.p+"static/js/"+({}[e]||e)+".js"}(e);var c=new Error;o=function(t){a.onerror=a.onload=null,clearTimeout(d);var r=i[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",c.name="ChunkLoadError",c.type=n,c.request=o,r[1](c)}i[e]=void 0}};var d=setTimeout((function(){o({type:"timeout",target:a})}),12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/san-docit/",s.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var d=0;d<a.length;d++)t(a[d]);var l=c;o.push([63,0]),r()}([,,,,function(e,t,r){var n,i,o;!function(s){function a(e){var t={hash:"",queryString:"",params:{},query:{},path:e},r=t.path.indexOf("#");r>=0&&(t.hash=t.path.slice(r+1),t.path=t.path.slice(0,r));var n=t.query,i=t.path.indexOf("?");if(i>=0){t.queryString=t.path.slice(i+1),t.path=t.path.slice(0,i);for(var o=t.queryString.split("&"),s=0;s<o.length;s++){var a=o[s],c=a.indexOf("="),d="";c>0&&(d=a.slice(c+1),a=a.slice(0,c));var l=decodeURIComponent(a);d=decodeURIComponent(d),n.hasOwnProperty(l)?n[l]=[].concat(n[l],d):n[l]=d}}return t}function c(e,t){var r=a(e),n=a(t),i=r.path;if(0===i.indexOf("/"))return e;var o=i.split("/"),s=n.path.split("/");s.pop();for(var c=0;c<o.length;c++){var d=o[c];switch(d){case"..":s.pop();break;case".":break;default:s.push(d)}}return""!==s[0]&&s.unshift(""),s.join("/")+(r.queryString?"?"+r.queryString:"")}var d="undefined"!=typeof window;function l(){}function h(){if(!d)return"";var e=location.href.indexOf("#");return e<0?"/":location.href.slice(e+1)||"/"}function u(){this.current=h(),this.referrer="";var e=this;this.hashChangeHandler=function(){e.redirect(h())}}function p(){return d?location.pathname+location.search:""}function f(){this.current=p(),this.referrer="";var e=this;this.popstateHandler=function(){e.referrer=e.current,e.current=p(),e.fire("redirect",{url:e.current,referrer:e.referrer})}}l.prototype.on=function(e,t){"function"==typeof t&&(this._eventListeners||(this._eventListeners={}),this._eventListeners[e]||(this._eventListeners[e]=[]),this._eventListeners[e].push(t))},l.prototype.un=function(e,t){if(this._eventListeners&&this._eventListeners[e])if(t)for(var r=this._eventListeners[e],n=r.length;n--;)r[n]===t&&r.splice(n,1);else this._eventListeners[e]=[]},l.prototype.fire=function(e,t){if(!e)throw new Error("No event type specified");var r=this._eventListeners&&this._eventListeners[e];if(r)for(var n=0;n<r.length;n++)r[n](t)},u.prototype=new l,u.prototype.constructor=u,u.prototype.start=function(){window.addEventListener&&window.addEventListener("hashchange",this.hashChangeHandler,!1),window.attachEvent&&window.attachEvent("onhashchange",this.hashChangeHandler)},u.prototype.stop=function(){window.removeEventListener&&window.removeEventListener("hashchange",this.hashChangeHandler,!1),window.detachEvent&&window.detachEvent("onhashchange",this.hashChangeHandler)},u.prototype.redirect=function(e,t){t=t||{},e=c(e,this.current);var r=this.current,n=e!==r;n?(this.referrer=r,this.current=e,location.hash=e):r=this.referrer,!n&&!t.force||t.silent||this.fire("redirect",{url:e,referrer:r})},u.prototype.reload=function(){this.redirect(this.current,{force:!0})},f.prototype=new l,f.prototype.constructor=u,f.prototype.start=function(){window.addEventListener("popstate",this.popstateHandler)},f.prototype.stop=function(){window.removeEventListener("popstate",this.popstateHandler)},f.prototype.redirect=function(e,t){t=t||{},e=c(e,this.current);var r=this.current,n=e!==r;n&&(this.referrer=r,this.current=e,history.pushState({},"",e)),!n&&!t.force||t.silent||this.fire("redirect",{url:e,referrer:r})},f.prototype.reload=function(){this.fire("redirect",{url:this.current,referrer:this.referrer})};var m=365611;function v(e){return e.prototype&&(5===e.prototype.nodeType||"san-cmpt"===e.prototype._type)}function g(e){return function(t){for(var r,n=a(t.url),i=0;i<e.routes.length;i++){var o=e.routes[i],s=o.rule.exec(n.path);if(s){r=o;for(var c=o.keys||[],d=1;d<s.length;d++){var l=c[d]||d,h=s[d];n.query[l]=h,n.params[l]=h}n.referrer=t.referrer,n.config=o.config;break}}i=0;var u=1,p={url:t.url,hash:n.hash,queryString:n.queryString,query:n.query,path:n.path,referrer:n.referrer,config:n.config,resume:m,suspend:function(){u=0},stop:function(){u=-1}};function f(){u>0&&(i<e.listeners.length?(e.listeners[i].call(e,p,n.config),u>0&&m()):function(){if(r)e.doRoute(r,n);else for(var t=e.routeAlives.length;t--;)e.routeAlives[t].component.dispose(),e.routeAlives.splice(t,1)}())}function m(){u=1,i++,f()}f()}}function w(e){var t=(e=e||{}).mode||"hash";this.routes=[],this.routeAlives=[],this.listeners=[],this.afterListeners=[],this.locatorRedirectHandler=g(this),this.setMode(t)}w.prototype.listen=function(e){this.listeners.push(e)},w.prototype.afterEach=function(e){this.afterListeners.push(e)},w.prototype.unlisten=function(e){for(var t=this.listeners.length;t--;)this.listeners[t]===e&&this.listeners.splice(t,1);for(t=this.afterListeners.length;t--;)this.afterListeners[t]===e&&this.afterListeners.splice(t,1)},w.prototype.start=function(){return this.isStarted||(this.isStarted=!0,this.locator.on("redirect",this.locatorRedirectHandler),this.locator.start(),this.locator.reload()),this},w.prototype.stop=function(){return this.locator.un("redirect",this.locatorRedirectHandler),this.locator.stop(),this.isStarted=!1,this},w.prototype.setMode=function(e){if(e=e.toLowerCase(),this.mode!==e){this.mode=e;var t=!1;switch(this.isStarted&&(this.stop(),t=!0),e){case"hash":this.locator=new u;break;case"html5":this.locator=new f}return t&&this.start(),this}},w.prototype.doRoute=function(e,t){for(var r=!1,n=this.routeAlives.length;n--;){var i=this.routeAlives[n];i.id===e.id?(i.component.data.set("route",t),i.component._callHook("route"),r=!0):(i.component.dispose(),this.routeAlives.splice(n,1))}if(!r)if(e.Component)if(v(e.Component))this.attachCmpt(e,t);else{var o=this;e.Component().then((function(r){v(r)?e.Component=r:r.__esModule&&v(r.default)&&(e.Component=r.default),o.attachCmpt(e,t)}))}else e.handler.call(this,t)},w.prototype.attachCmpt=function(e,t){var r=new e.Component;r.data.set("route",t),r._callHook("route");var n=function(e){switch(typeof e){case"object":return e;case"string":return document.querySelector?document.querySelector(e):document.getElementById(e.replace(/#/i,""))}}(e.target);if(!n)throw new Error('[SAN-ROUTER ERROR] Attach failed, target element "'+e.target+'" is not found.');r.attach(n),this.routeAlives.push({component:r,id:e.id}),this.afterListeners.forEach(t=>{t.call(y.router,e)})},w.prototype.add=function(e){var t=e.rule,r=[""];if("string"==typeof t){var n=t.replace(/\/:([a-z0-9_-]+)(?=\/|$)/gi,(function(e,t){return r.push(t),"/([^/\\s]+)"}));t=new RegExp("^"+n+"$","i")}if(!(t instanceof RegExp))throw new Error("[SAN-ROUTER ERROR] Rule must be string or RegExp!");var i=(++m).toString();return this.routes.push({id:i,rule:t,handler:e.handler,keys:r,target:e.target||"#main",Component:e.Component,config:e}),this};var y={Link:r(1).defineComponent({template:'<a href="{{hrefPrefix}}{{href}}" onclick="return false;" on-click="clicker($event)" target="{{target}}" class="{{isActive ? activeClass : \'\'}}"><slot/></a>',clicker:function(e){var t=this.data.get("href");"string"==typeof t&&y.router.locator.redirect(t.replace(/^#/,"")),e.preventDefault?e.preventDefault():e.returnValue=!1},inited:function(){var e=this;this.routeListener=function(t){e.data.set("isActive",t.url===e.data.get("href"))},this.routeListener({url:y.router.locator.current}),y.router.listen(this.routeListener)},disposed:function(){y.router.unlisten(this.routeListener),this.routeListener=null},initData:function(){return{isActive:!1,hrefPrefix:"hash"===y.router.mode?"#":""}},computed:{href:function(){return c(this.data.get("to")||"",y.router.locator.current)}}}),router:null,Router:w,HashLocator:u,HTML5Locator:f,resolveURL:c,parseURL:a,version:"1.2.2"};i=[],void 0===(o="function"==typeof(n=y)?n.apply(t,i):n)||(e.exports=o)}()},function(e,t,r){"use strict";const n="/san-docit/".length>1?"/san-docit/".slice(0,-1):"",i=(e,t)=>{e&&(t(e),e.children&&e.children.forEach(e=>{t(e),e.children&&i(e,t)}))};t.a={base:n,treeWalk:i}},function(e,t,r){"use strict";(function(e){var n=r(1);const i=new n.Component({});e.hub=i,t.a=i}).call(this,r(3))},,function(e,t,r){var n=r(2),i=r(54),o=r(25).default;e.exports=r(25),e.exports.default=n(o,i,[])},,,,,,,,,,,function(e,t,r){"use strict";r.r(t);var n=r(1),i=r(4),o=r(27),s=r.n(o),a=r(8),c=r.n(a),d=r(29),l=r.n(d),h=r(6),u=r(5);t.default={components:{"router-link":i.Link,"content-area":s.a,drawer:l(),tree:c()},dataTypes:{docit:n.DataTypes.object},computed:{sidebar(){const e=this.data.get("docit"),t=e.themeConfig.sidebar,r=e.pathname||location.pathname;if(t[r])return t[r];for(let e in t){let n=t[e];for(let e=0;e<n.length;e++)if(n[e].path===r)return n}return t["/"]||[]}},initData:()=>({isShowSidebar:!0,selectedNode:[]}),inited(){h.a.on("router-changed",this.isActive.bind(this))},isActive(e){const t=[],r=u.a.base,n=this.data.get("sidebar");u.a.treeWalk(n,n=>{r+n.path===e.path&&t.push(n)}),this.data.set("selectedNodes",t)},getPath:e=>u.a.base+e.path}},function(e,t,r){"use strict";r.r(t),function(e){var n=r(9),i=r.n(n),o=r(10),s=r.n(o),a=r(8),c=r.n(a),d=r(5);t.default={components:{tree:c()},initData:()=>({toc:{},isShowToc:!0,selectedNodes:[]}),inited(){let t={};const r=this.data.get("docit");r&&r.toc?t=r.toc:e.SAN_DOCIT&&e.SAN_DOCIT.toc&&(t=e.SAN_DOCIT.toc),this.data.set("toc",t)},attached(){e.hub.on("changed",this.onChanged.bind(this)),this.__onScroll=this.onScroll.bind(this),this.__onResize=this.onResize.bind(this),i()(e,"scroll",this.__onScroll),i()(e,"resize",this.__onResize),this.initScroll(),this.resize(),this.ref("view").innerHTML=""},getHash(e){const t=this.data.get("docit");return(t.pathname?d.a.base+t.pathname:location.pathname)+"#"+e},onChanged(e){this.data.set("toc",e),this.nextTick(this.initScroll.bind(this)),this.resize()},getTocCount(){const e=this.data.get("toc");let t=0;return d.a.treeWalk(e,()=>t++),t},onResize(){this.timer&&e.clearTimeout(this.timer),this.timer=e.setTimeout(()=>{this.resize(),this.timer=null},10)},resize(){const e=document.documentElement.clientWidth||document.body.clientWidth,t=e>1e3&&this.getTocCount()>2;t!==this.data.get("isShowToc")&&this.data.set("isShowToc",t);const r=e>800;r!==this.parent.data.get("isShowSidebar")&&this.parent.data.set("isShowSidebar",r)},initScroll(){const e=this.ref("view").querySelectorAll("H2, H3");if(!e)return;this.postions=[],this.hashs=[],e.forEach(e=>{this.postions.push(e.offsetTop),this.hashs.push(e.id)});const t=this.hashs.length;this.postions[t]=Number.MAX_VALUE,this.hashs[t]=this.hashs[this.hashs.length-1];const r=this.data.get("toc");r&&r.children&&r.children.length>0&&this.data.set("selectedNodes",[r.children[0]])},onScroll(t){this.timer&&e.clearTimeout(this.timer),this.timer=e.setTimeout(()=>{this.scrollPostion(),this.timer=null},10)},scrollPostion(){const e=document.documentElement.scrollTop||document.body.scrollTop,t=this.postions.findIndex(t=>t>=e);-1!==t&&this.changeSelected(this.hashs[t])},changeSelected(e){if(this.selected===e)return;const t=[],r=this.data.get("toc");d.a.treeWalk(r,r=>{r.hash===e&&t.push(r)}),this.data.set("selectedNodes",t),this.selected=e},detached(){s()(e,"scroll",this.__onScroll),s()(e,"resize",this.__onResize)}}}.call(this,r(3))},function(e,t,r){"use strict";r.r(t);var n=r(1);t.default={components:{},dataTypes:{treeNode:n.DataTypes.object},getNodeId:e=>e.path||e.hash}},function(e,t,r){"use strict";r.r(t),t.default={initData:()=>({isOpened:!1}),onClick(){this.data.set("isOpened",!this.data.get("isOpened"))}}},function(e,t,r){"use strict";r.r(t),t.default={initData:()=>({isExpand:!1}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))}}},function(e,t,r){"use strict";r.r(t),t.default={}},function(e,t,r){"use strict";r.r(t);var n=r(1),i=r(28),o=r.n(i);const s=(e,t)=>new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className);var a=(e,t)=>{s(e,t)||(e.className+=" "+t)},c=(e,t)=>{if(!s(e,t))return;const r=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(r,"")};t.default={components:{"tree-node":o.a},dataTypes:{treeData:n.DataTypes.object,selectedNodes:n.DataTypes.array},attached(){this.watch("selectedNodes",this.active);const e=this.data.get("selectedNodes");e&&e.length>0&&this.active(e)},active(e){const t=this.el.querySelectorAll("li[data-id]");for(let r=0;r<t.length;r++){const n=t[r],i=n.getAttribute("data-id");void 0!==e.find(e=>i===(e.path||e.hash))?a(n,"active"):c(n,"active")}}}},function(e,t,r){var n=r(2);r(51);var i=r(52),o=r(19).default;e.exports=r(19),e.exports.default=n(o,i,[])},function(e,t,r){var n=r(2),i=r(53),o=r(20).default;e.exports=r(20),e.exports.default=n(o,i,[])},function(e,t,r){var n=r(2),i=r(55),o=r(21).default;e.exports=r(21),e.exports.default=n(o,i,[])},function(e,t,r){var n=r(2);r(56);var i=r(57),o=r(22).default;e.exports=r(22),e.exports.default=n(o,i,[])},function(e,t,r){var n=r(2);r(58);var i=r(59),o=r(23).default;e.exports=r(23),e.exports.default=n(o,i,[])},function(e,t,r){var n=r(2),i=r(60),o=r(24).default;e.exports=r(24),e.exports.default=n(o,i,[])},,,,,,,,,,,,,,,,,,,,function(e,t,r){"use strict";r.r(t)},function(e,t){e.exports=' <div id="site"> <header id="header"> <a href="{{docit.base}}" class="navbar"> <img src="{{ docit.base + docit.themeConfig.logo }}" alt="Home" class="logo"> <span>{{ docit.title }}</span> </a> <ul> <li s-for="nav in docit.themeConfig.nav"> <a target="{{nav.target || \'_blank\'}}" href="{{nav.link}}"> {{ nav.text }} </a> </li> </ul> </header> <aside s-if="isShowSidebar" id="sidebar" class="sidebar"> <tree treeData="{{sidebar}}" selectedNodes="{{selectedNodes}}"> <router-link s-if="treeNode.path" to="{{getPath(treeNode)}}"> {{ treeNode.title }} </router-link> <span s-else>{{ treeNode.title }}</span> </tree> </aside> <drawer s-else class="sidebar" style="width:0"> <tree treeData="{{sidebar}}" selectedNodes="{{selectedNodes}}" style="padding:50px 0"> <router-link s-if="treeNode.path" to="{{getPath(treeNode)}}"> {{ treeNode.title }} </router-link> <span s-else>{{ treeNode.title }}</span> </tree> </drawer> <content-area docit="{{docit}}" class="{{isShowSidebar ? \'\' : \'hidden\'}}"/> </div> '},function(e,t){e.exports=' <article id="content"> <div id="router-view" s-ref="view" class="router-view {{isShowToc ? \'\' : \'hidden\'}}"> {{ docit.content | raw }} </div> <aside s-if="isShowToc" class="toc"> <tree treeData="{{toc}}" selectedNodes="{{selectedNodes}}"> <a href="{{getHash(treeNode.hash)}}">{{ treeNode.title }}</a> </tree> </aside> </article> '},function(e,t){e.exports=' <ul class="tree"> <tree-node s-for="treeNode in treeData.children" treeNode="{{treeNode}}" selectedNodes="{{selectedNodes}}"> <slot var-treeNode="treeNode"></slot> </tree-node> </ul> '},function(e,t){e.exports=' <li data-id="{{getNodeId(treeNode)}}"> <slot var-treeNode="treeNode"></slot> <ul s-if="treeNode.children"> <li s-for="treeNode2 in treeNode.children" data-id="{{getNodeId(treeNode2)}}"> <slot var-treeNode="treeNode2"></slot> <ul s-if="treeNode2.children"> <li s-for="treeNode3 in treeNode2.children" data-id="{{getNodeId(treeNode3)}}"> <slot var-treeNode="treeNode3"></slot> <ul s-if="treeNode3.children"> <li s-for="treeNode4 in treeNode3.children" data-id="{{getNodeId(treeNode4)}}"> <slot var-treeNode="treeNode4"></slot> </li> </ul> </li> </ul> </li> </ul> </li> '},function(e,t,r){"use strict";r.r(t)},function(e,t){e.exports=' <div class="drawer-wrapper"> <div class="drawer drawer-left {{isOpened ? \'drawer-open\' : \'\'}}"> <div class="drawer-mask" on-click="onClick"></div> <div class="drawer-content-wrapper"> <div class="drawer-content"> <slot></slot> </div> <div class="drawer-handle" on-click="onClick"> <i class="drawer-handle-icon"></i> </div> </div> </div> </div> '},function(e,t,r){"use strict";r.r(t)},function(e,t){e.exports=' <section class="code-box {{isExpand ? \'expand\' : \'\'}}"> <section class="code-box-demo"> <slot name="code-preview"></slot> </section> <section class="code-box-meta"> <slot name="text-place-holder"></slot> <span class="code-expand-icon" on-click="toggleExpand"> <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand ? \'code-expand-icon-hide\':\'code-expand-icon-show\'}}"> <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand ? \'code-expand-icon-show\' : \'code-expand-icon-hide\'}}"> </span> </section> <section class="highlight-wrapper {{isExpand ? \'highlight-wrapper-expand\' : \'\'}}"> <slot s-if="isExpand" name="code-place-holder"></slot> </section> </section> '},function(e,t){e.exports=" <div>Not Found</div> "},,function(e,t){function r(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}r.keys=function(){return[]},r.resolve=r,e.exports=r,r.id=62},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return E}));var n=r(0),i=r(1),o=r(26),s=r.n(o),a=r(6),c=r(30);const d={codebox:r.n(c).a};function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object(n.b)(d);class h extends i.Component{}l(h,"components",{layout:s.a}),l(h,"dataTypes",{docit:i.DataTypes.object}),l(h,"template",'<layout docit="{{docit}}"><layout>');var u=r(4),p=r.n(u),f=r(7),m=r.n(f);const v="/san-docit/".length>1?"/san-docit/".slice(0,-1):"";var g=r(31),w=r.n(g);r(61);const y=new p.a.Router({mode:"html5"});p.a.router=y;const b={"/":()=>r.e(13).then(r.t.bind(null,40,7)),"/quick-start/":()=>r.e(14).then(r.t.bind(null,41,7)),"/directory-structure/":()=>r.e(12).then(r.t.bind(null,42,7)),"/basic-config/":()=>r.e(10).then(r.t.bind(null,43,7)),"/config/":()=>r.e(11).then(r.t.bind(null,44,7)),"/theme/using/":()=>r.e(16).then(r.t.bind(null,45,7)),"/theme/writing/":()=>r.e(17).then(r.t.bind(null,46,7)),"/theme/default-theme-config/":()=>r.e(15).then(r.t.bind(null,47,7))},x={"/":{children:[{title:"指南",children:[{path:"/",filename:"introduce.md",title:"介绍"},{path:"/quick-start/",filename:"/home/runner/work/san-docit/san-docit/docs/quick-start.md",title:"快速上手"},{path:"/directory-structure/",filename:"/home/runner/work/san-docit/san-docit/docs/directory-structure.md",title:"目录结构"},{path:"/basic-config/",filename:"/home/runner/work/san-docit/san-docit/docs/basic-config.md",title:"基本配置"},{path:"/config/",filename:"/home/runner/work/san-docit/san-docit/docs/config.md",title:"配置"}]},{title:"样式",children:[{path:"/theme/using/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/using.md",title:"使用主题"},{path:"/theme/writing/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/writing.md",title:"开发主题"},{path:"/theme/default-theme-config/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/default-theme-config.md",title:"默认主题配置"}]}]}},N=(e,t)=>{e&&(t(e),e.children&&e.children.forEach(e=>{t(e),e&&e.children&&N(e,t)}))};Object.keys(x).forEach(e=>{N(x[e],e=>(e=>{if(!e||!e.path)return;const t=e.path;let n=b[t]?b[t]:/\.js$/.test(e.filename)?r(62)(e.filename):"";n&&u.router.add({rule:v+t,Component:n,target:"#router-view"})})(e))});[{path:".*",component:w.a}].forEach(e=>{u.router.add({rule:v+e.path,Component:e.component,target:"#router-view"})}),u.router.listen(e=>{e.path!==e.referrer?(m.a.isRendered&&m.a.remove(),m.a.inc(),a.a.fire("router-changed",e)):e.stop()}),u.router.afterEach(e=>{m.a.done(!0)});var k=u.router;function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class E extends n.a{attached(){k.start()}}S(E,"components",{index:h}),S(E,"template",'<index docit="{{docit}}"><index>'),S(E,"computed",{docit:()=>({base:"/san-docit/",title:"sdoc",head:[["link",{rel:"icon",href:"/san-docit/favicon.ico"}]],meta:{description:"文档，文档工具，建站"},dest:".sdoc/dist",open:!0,theme:"@sdoc/theme-default",themeConfig:{logo:"logo.svg",nav:[{text:"GitHub",link:"https://github.com/kidnes/san-docit"}],sidebar:{"/":{children:[{title:"指南",children:[{path:"/",filename:"introduce.md",title:"介绍"},{path:"/quick-start/",filename:"/home/runner/work/san-docit/san-docit/docs/quick-start.md",title:"快速上手"},{path:"/directory-structure/",filename:"/home/runner/work/san-docit/san-docit/docs/directory-structure.md",title:"目录结构"},{path:"/basic-config/",filename:"/home/runner/work/san-docit/san-docit/docs/basic-config.md",title:"基本配置"},{path:"/config/",filename:"/home/runner/work/san-docit/san-docit/docs/config.md",title:"配置"}]},{title:"样式",children:[{path:"/theme/using/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/using.md",title:"使用主题"},{path:"/theme/writing/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/writing.md",title:"开发主题"},{path:"/theme/default-theme-config/",filename:"/home/runner/work/san-docit/san-docit/docs/theme/default-theme-config.md",title:"默认主题配置"}]}]}}},headHtmlSnippet:'<link rel="icon" href="/san-docit/favicon.ico"></link>'})}),new E({el:document.getElementById("site")})}]);