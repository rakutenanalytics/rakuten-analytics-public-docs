"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[4942],{2104:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"sdks/analytics-sdks/android/android-analytics-troubleshooting","title":"Troubleshooting","description":"Troubleshooting","source":"@site/docs/sdks/analytics-sdks/android/troubleshooting.md","sourceDirName":"sdks/analytics-sdks/android","slug":"/analytics-sdk/android/android-troubleshooting","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-troubleshooting","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"id":"android-analytics-troubleshooting","slug":"/analytics-sdk/android/android-troubleshooting","title":"Troubleshooting"},"sidebar":"docSidebar","previous":{"title":"Migration Guide","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-migration"},"next":{"title":"Changelog","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-changelog"}}');var t=n(4848),a=n(8453);const s={sidebar_position:5,id:"android-analytics-troubleshooting",slug:"/analytics-sdk/android/android-troubleshooting",title:"Troubleshooting"},r=void 0,c={},d=[{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Build Error: <code>java.lang.RuntimeException: Duplicate class...</code>",id:"build-error-javalangruntimeexception-duplicate-class",level:3},{value:"Fatal Exception in LocationBroadcastReceiver due to obfuscation",id:"fatal-exception-in-locationbroadcastreceiver-due-to-obfuscation",level:3}];function l(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,t.jsxs)(o.h3,{id:"build-error-javalangruntimeexception-duplicate-class",children:["Build Error: ",(0,t.jsx)(o.code,{children:"java.lang.RuntimeException: Duplicate class..."})]}),"\n",(0,t.jsx)(o.p,{children:(0,t.jsx)(o.code,{children:"java.lang.RuntimeException: Duplicate class com.rakuten.tech.mobile.manifestconfig.annotations.ManifestConfig"})}),"\n",(0,t.jsxs)(o.p,{children:["This build error could occur if you are using older versions of other libraries from ",(0,t.jsx)(o.code,{children:"com.rakuten.tech.mobile"}),"."]}),"\n",(0,t.jsxs)(o.p,{children:["Some of the dependencies in this SDK have changed to a new Group ID of ",(0,t.jsx)(o.code,{children:"io.github.rakutentech"})," (due to the ",(0,t.jsx)(o.a,{href:"https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/",children:"JCenter shutdown"}),").\nThis means that if you have another library in your project which depends on the older dependencies using the Group ID ",(0,t.jsx)(o.code,{children:"com.rakuten.tech.mobile"}),", then you will have duplicate classes."]}),"\n",(0,t.jsxs)(o.p,{children:["To avoid this, please add the following to your ",(0,t.jsx)(o.code,{children:"build.gradle"})," in order to exclude the old ",(0,t.jsx)(o.code,{children:"com.rakuten.tech.mobile"})," dependencies from your project."]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-groovy",children:"configurations.all {\n    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-processor'\n    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-annotations'\n}\n"})}),"\n",(0,t.jsx)(o.h3,{id:"fatal-exception-in-locationbroadcastreceiver-due-to-obfuscation",children:"Fatal Exception in LocationBroadcastReceiver due to obfuscation"}),"\n",(0,t.jsx)(o.p,{children:(0,t.jsx)(o.code,{children:"Fatal Exception: java.lang.RuntimeException: Unable to start receiver com.rakuten.tech.mobile.analytics.geo.receiver.LocationBroadcastReceiver Caused by android.os.BadParcelableException: ClassNotFoundException when unmarshalling: com.google.android.gms.location.LocationAvailability"})}),"\n",(0,t.jsx)(o.p,{children:"Note: This issue is only present in versions 10.x and below. It has been fixed in version 11.0.0."}),"\n",(0,t.jsx)(o.p,{children:"This fatal exception could occur when the LocationBroadcastReceiver in the Rakuten Mobile Analytics SDK fails to start or receive a broadcast. This issue is caused by obfuscating necessary classes from the Google Play Services Location API. To resolve this, specific ProGuard rules must be added to prevent obfuscation of these classes."}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{children:"-keep class com.google.android.gms.location.**\n"})})]})}function u(e={}){const{wrapper:o}={...(0,a.R)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,o,n)=>{n.d(o,{R:()=>s,x:()=>r});var i=n(6540);const t={},a=i.createContext(t);function s(e){const o=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(a.Provider,{value:o},e.children)}}}]);