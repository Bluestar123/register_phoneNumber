(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-home"],{"0c88":function(t,e,i){"use strict";i.r(e);var n=i("efe8"),a=i("a116");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("108c");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"760bf1e8",null);e["default"]=r.exports},"108c":function(t,e,i){"use strict";var n=i("ac22"),a=i.n(n);a.a},3777:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.error=e.post=e.get=void 0;var n="http://www.service10086.com:8080",a=function(t,e){var i={"content-type":"application/json"};return new Promise(function(a,o){uni.request({url:n+t,data:e,header:i,method:"GET",success:function(t){a(t)},fail:function(t){o(t)}})})};e.get=a;var o=function(t,e){var i={"content-type":"application/x-www-form-urlencoded"};return new Promise(function(a,o){uni.request({url:n+t,data:e,header:i,method:"POST",success:function(t){a(t)},fail:function(t){o(t)}})})};e.post=o;var s=function(){return uni.getNetworkType({success:function(t){uni.hideLoading(),"none"==t.networkType?uni.showToast({icon:"none",title:"网络故障请检查您的网络",duration:2e3}):uni.showToast({icon:"none",title:"系统故障请稍后重试"})}})};e.error=s},6320:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.home1[data-v-760bf1e8]{width:100%;height:%?1018?%;position:relative}.home1 .bg1[data-v-760bf1e8]{position:absolute;top:0;left:0;width:100%;height:%?1018?%;z-index:-1}.home1 .btn1[data-v-760bf1e8]{width:100%;position:absolute;top:%?900?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:0 %?100?%}.home1 .btn1 uni-image[data-v-760bf1e8]{width:%?281?%;height:%?94?%}.home2[data-v-760bf1e8]{width:100%;height:%?1083?%}.home2 uni-image[data-v-760bf1e8]{width:100%;height:100%}.home3[data-v-760bf1e8]{width:100%;height:%?685?%}.home3 uni-image[data-v-760bf1e8]{width:100%;height:100%}.home4[data-v-760bf1e8]{width:100%;height:%?1725?%}.home4 uni-image[data-v-760bf1e8]{width:100%;height:100%}.home5[data-v-760bf1e8]{width:100%;height:%?2436?%}.home5 uni-image[data-v-760bf1e8]{width:100%;height:100%}.home6[data-v-760bf1e8]{width:100%;height:%?169?%}.home6 uni-image[data-v-760bf1e8]{width:100%;height:100%}.application[data-v-760bf1e8]{width:100%;height:%?98?%}',""])},"6d42":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("3777"),a={data:function(){return{}},onLoad:function(){(0,n.get)("/mobleOrder/homeHtml").then(function(t){console.log(t)})},methods:{toChooseNum:function(){uni.navigateTo({url:"../chooseNum/chooseNum"})},toHistory:function(){uni.navigateTo({url:"../history/history"})}}};e.default=a},a116:function(t,e,i){"use strict";i.r(e);var n=i("6d42"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},ac22:function(t,e,i){var n=i("6320");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("26987b9b",n,!0,{sourceMap:!1,shadowMode:!1})},efe8:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"home1"},[i("v-uni-image",{staticClass:"bg1",attrs:{src:"/static/home1.jpg"}}),i("v-uni-view",{staticClass:"btn1"},[i("v-uni-image",{attrs:{src:"/static/11.png"},on:{click:function(e){e=t.$handleEvent(e),t.toChooseNum(e)}}}),i("v-uni-image",{attrs:{src:"/static/22.png"},on:{click:function(e){e=t.$handleEvent(e),t.toHistory(e)}}})],1)],1),i("v-uni-view",{staticClass:"home2"},[i("v-uni-image",{attrs:{src:"/static/home2.jpg",mode:""}})],1),i("v-uni-view",{staticClass:"home3"},[i("v-uni-image",{attrs:{src:"/static/home3.jpg",mode:""}})],1),i("v-uni-view",{staticClass:"home4"},[i("v-uni-image",{attrs:{src:"/static/home4.jpg",mode:""}})],1),i("v-uni-view",{staticClass:"home5"},[i("v-uni-image",{attrs:{src:"/static/home5.jpg",mode:""}})],1),i("v-uni-view",{staticClass:"home6"},[i("v-uni-image",{attrs:{src:"/static/home6.jpg",mode:""}})],1),i("v-uni-image",{staticClass:"application",attrs:{src:"/static/home_bot.jpg",mode:""},on:{click:function(e){e=t.$handleEvent(e),t.toChooseNum(e)}}})],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})}}]);