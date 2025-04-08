"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[358],{8220:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>r,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"sdks/analytics-sdks/ios/ios-troubleshooting","title":"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0","description":"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0","source":"@site/i18n/ja/docusaurus-plugin-content-docs/current/sdks/analytics-sdks/ios/troubleshooting.md","sourceDirName":"sdks/analytics-sdks/ios","slug":"/analytics-sdk/ios/ios-troubleshooting","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/ios/ios-troubleshooting","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"id":"ios-troubleshooting","slug":"/analytics-sdk/ios/ios-troubleshooting","title":"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0"},"sidebar":"docSidebar","previous":{"title":"\u3088\u304f\u3042\u308b\u8cea\u554f","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/ios/ios-faq"},"next":{"title":"Changelog","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/ios/ios-changelog"}}');var t=n(4848),o=n(8453);const c={sidebar_position:4,id:"ios-troubleshooting",slug:"/analytics-sdk/ios/ios-troubleshooting",title:"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0"},a=void 0,r={},l=[{value:"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0",id:"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0",level:2},{value:"use_frameworks! \u3092\u4f7f\u7528\u305b\u305a\u306b\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u30d3\u30eb\u30c9\u3059\u308b\u65b9\u6cd5",id:"use_frameworks-\u3092\u4f7f\u7528\u305b\u305a\u306b\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u30d3\u30eb\u30c9\u3059\u308b\u65b9\u6cd5",level:3},{value:"RakutenAnalytics Swift Package \u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u306e\u30d2\u30f3\u30c8",id:"rakutenanalytics-swift-package-\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u306e\u30d2\u30f3\u30c8",level:3}];function d(e){const s={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h2,{id:"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0",children:"\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0"}),"\n",(0,t.jsx)(s.h3,{id:"use_frameworks-\u3092\u4f7f\u7528\u305b\u305a\u306b\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u30d3\u30eb\u30c9\u3059\u308b\u65b9\u6cd5",children:"use_frameworks! \u3092\u4f7f\u7528\u305b\u305a\u306b\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3092\u30d3\u30eb\u30c9\u3059\u308b\u65b9\u6cd5"}),"\n",(0,t.jsx)(s.p,{children:"RakutenAnalytics\u306fSwift\u30d5\u30ec\u30fc\u30e0\u30ef\u30fc\u30af\u3067\u3042\u308a\u3001\u30ab\u30b9\u30bf\u30e0\u30e2\u30b8\u30e5\u30fc\u30eb\u30de\u30c3\u30d7\u3092\u542b\u3093\u3067\u3044\u307e\u3059\u3002"}),"\n",(0,t.jsxs)(s.p,{children:["\u30a2\u30d7\u30ea\u306ePodfile\u306b ",(0,t.jsx)(s.code,{children:"use_frameworks!"})," \u304c\u5b9a\u7fa9\u3055\u308c\u3066\u3044\u306a\u3044\u5834\u5408\u3001\u4ee5\u4e0b\u306eCocoapods\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3059:"]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"Using Swift static libraries with custom module maps is currently not supported."})}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"\u3053\u306e\u554f\u984c\u3092\u89e3\u6c7a\u3059\u308b\u306b\u306f\u3001\u4ee5\u4e0b\u306e\u624b\u9806\u3092\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044:"}),"\n",(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsxs)(s.li,{children:["Podfile\u306b ",(0,t.jsx)(s.code,{children:"cocoapods-user-defined-build-types"})," \u30d7\u30e9\u30b0\u30a4\u30f3\u3092\u8ffd\u52a0\u3057\u307e\u3059\u3002"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"RAnalytics"})," \u3068\u305d\u306e\u4f9d\u5b58\u95a2\u4fc2\u3092\u4ee5\u4e0b\u306e\u3088\u3046\u306b ",(0,t.jsx)(s.code,{children:"static_framework"})," \u3068\u3057\u3066\u5ba3\u8a00\u3057\u307e\u3059:"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"plugin 'cocoapods-user-defined-build-types'\nenable_user_defined_build_types!\n\ntarget 'MyApp' do\n  pod 'RAnalytics', :build_type => :static_framework\nend\n"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"\u6ce8\u610f:"})," ",(0,t.jsx)(s.code,{children:"cocoapods-user-defined-build-types"})," \u30d7\u30e9\u30b0\u30a4\u30f3\u306f\u30b5\u30fc\u30c9\u30d1\u30fc\u30c6\u30a3\u306b\u3088\u3063\u3066\u958b\u767a\u3055\u308c\u3066\u304a\u308a\u3001\u305d\u306e\u30b5\u30dd\u30fc\u30c8\u304c\u7d99\u7d9a\u3055\u308c\u308b\u3053\u3068\u3092\u4fdd\u8a3c\u3059\u308b\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002"]}),"\n",(0,t.jsx)(s.h3,{id:"rakutenanalytics-swift-package-\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u306e\u30d2\u30f3\u30c8",children:"RakutenAnalytics Swift Package \u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u306e\u30d2\u30f3\u30c8"}),"\n",(0,t.jsx)(s.p,{children:"Xcode\u3067RakutenAnalytics Swift Package\u3092\u30c1\u30a7\u30c3\u30af\u30a2\u30a6\u30c8\u3067\u304d\u306a\u3044\u5834\u5408\u3001\u4ee5\u4e0b\u306e2\u3064\u306e\u30b3\u30de\u30f3\u30c9\u30e9\u30a4\u30f3\u3092\u5b9f\u884c\u3057\u3066\u304f\u3060\u3055\u3044:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:'/usr/libexec/Plistbuddy -c "Add :IDEPackageSupportUseBuiltinSCM bool 1" ~/Library/Preferences/com.apple.dt.Xcode.plist\nxcodebuild -scheme MyScheme -resolvePackageDependencies -usePackageSupportBuiltinSCM\n'})})]})}function u(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>a});var i=n(6540);const t={},o=i.createContext(t);function c(e){const s=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(o.Provider,{value:s},e.children)}}}]);