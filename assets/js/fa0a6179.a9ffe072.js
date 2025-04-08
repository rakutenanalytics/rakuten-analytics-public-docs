"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[166],{8360:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>k,frontMatter:()=>i,metadata:()=>c,toc:()=>r});const c=JSON.parse('{"id":"sdks/analytics-sdks/android/advanced-usage/android-analytics-rpcookie-callback","title":"Rp Cookie Callbacks","description":"UI changes in AnalyticsManager#getRpCookie() callbacks","source":"@site/docs/sdks/analytics-sdks/android/advanced-usage/rpcookie-callback.md","sourceDirName":"sdks/analytics-sdks/android/advanced-usage","slug":"/analytics-sdk/android/android-rpcookie-callback","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-rpcookie-callback","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6,"id":"android-analytics-rpcookie-callback","slug":"/analytics-sdk/android/android-rpcookie-callback","title":"Rp Cookie Callbacks","added_version":"4.9.0","updated_version":"11.1.0","changelog":"./android-changelog"},"sidebar":"docSidebar","previous":{"title":"Runtime Configuration of RAT Endpoint","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-runtime-endpoint"},"next":{"title":"Automatic Event Tracking","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-auto-tracking"}}');var o=a(4848),s=a(8453);const i={sidebar_position:6,id:"android-analytics-rpcookie-callback",slug:"/analytics-sdk/android/android-rpcookie-callback",title:"Rp Cookie Callbacks",added_version:"4.9.0",updated_version:"11.1.0",changelog:"./android-changelog"},t=void 0,d={},r=[{value:"UI changes in <code>AnalyticsManager#getRpCookie()</code> callbacks",id:"ui-changes-in-analyticsmanagergetrpcookie-callbacks",level:2}];function l(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.h2,{id:"ui-changes-in-analyticsmanagergetrpcookie-callbacks",children:["UI changes in ",(0,o.jsx)(n.code,{children:"AnalyticsManager#getRpCookie()"})," callbacks"]}),"\n",(0,o.jsx)(n.p,{children:"In v6.7.0, Analytics SDK replaced Volley network client with OkHttp. Because of this change, success and error callbacks are called on a background (non-UI) thread."}),"\n",(0,o.jsxs)(n.p,{children:["If UI changes are done inside these callbacks, please execute UI changes inside ",(0,o.jsx)(n.code,{children:"runOnUiThread{}"})," or ",(0,o.jsx)(n.code,{children:"Handler(Looper.getMainLooper()).post{}"})," to avoid exceptions."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-kotlin",children:"AnalyticsManager.instance()?.getRpCookie({\n  context.runOnUiThread(() -> {\n    // execute some UI changes\n  })\n}, {\n  new Handler(Looper.getMainLooper()).post(() -> {\n    // execute some UI changes\n  })\n})\n"})})]})}function k(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>t});var c=a(6540);const o={},s=c.createContext(o);function i(e){const n=c.useContext(s);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),c.createElement(s.Provider,{value:n},e.children)}}}]);