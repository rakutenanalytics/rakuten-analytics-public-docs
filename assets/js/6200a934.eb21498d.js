"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[5684],{834:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"sdks/analytics-sdks/ios/advanced-usage/ios-analytics-idfa-tracking","title":"IDFA Tracking","description":"IDFA tracking","source":"@site/docs/sdks/analytics-sdks/ios/advanced-usage/idfa-tracking.md","sourceDirName":"sdks/analytics-sdks/ios/advanced-usage","slug":"/analytics-sdk/ios/ios-idfa-tracking","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/ios/ios-idfa-tracking","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"id":"ios-analytics-idfa-tracking","slug":"/analytics-sdk/ios/ios-idfa-tracking","title":"IDFA Tracking","added_version":"2.6.0","updated_version":"9.0.0","changelog":"./ios-changelog"},"sidebar":"docSidebar","previous":{"title":"Location Tracking","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/ios/ios-location-tracking"},"next":{"title":"Automatic Tracking","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/ios/ios-automatic-tracking"}}');var t=n(4848),s=n(8453);const r={sidebar_position:3,id:"ios-analytics-idfa-tracking",slug:"/analytics-sdk/ios/ios-idfa-tracking",title:"IDFA Tracking",added_version:"2.6.0",updated_version:"9.0.0",changelog:"./ios-changelog"},c=void 0,o={},d=[{value:"IDFA tracking",id:"idfa-tracking",level:2},{value:"IDFA tracking on iOS 14.x and above",id:"idfa-tracking-on-ios-14x-and-above",level:3}];function l(e){const a={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h2,{id:"idfa-tracking",children:"IDFA tracking"}),"\n",(0,t.jsxs)(a.p,{children:["The SDK automatically tracks the ",(0,t.jsx)(a.a,{href:"https://developer.apple.com/reference/adsupport/asidentifiermanager",children:"advertising identifier (IDFA)"})," by default but you can still disable it by setting ",(0,t.jsx)(a.code,{children:"shouldTrackAdvertisingIdentifier"})," to ",(0,t.jsx)(a.code,{children:"false"}),":"]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-swift",children:"AnalyticsManager.shared().shouldTrackAdvertisingIdentifier = false\n"})}),"\n",(0,t.jsx)(a.h3,{id:"idfa-tracking-on-ios-14x-and-above",children:"IDFA tracking on iOS 14.x and above"}),"\n",(0,t.jsxs)(a.p,{children:["\u26a0\ufe0f If the available IDFA value is valid (non-zero'd) the RakutenAnalytics SDK will use it. This change was implemented in response to Apple's ",(0,t.jsx)(a.a,{href:"https://developer.apple.com/news/?id=hx9s63c5",children:"announcement"})," that they have delayed the below requirement to obtain permission for user tracking until early 2021."]}),"\n",(0,t.jsxs)(a.p,{children:["If the app is built with the iOS 14 SDK and embeds the ",(0,t.jsx)(a.a,{href:"https://developer.apple.com/documentation/apptrackingtransparency",children:"AppTrackingTransparency framework"}),", the Analytics SDK uses IDFA on iOS 14.x and greater only when the user has authorized tracking. Your app can display the IDFA tracking authorization popup by adding a ",(0,t.jsx)(a.code,{children:"NSUserTrackingUsageDescription"})," key in your Info.plist and calling the ",(0,t.jsx)(a.a,{href:"https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547037-requesttrackingauthorization",children:"requestTrackingAuthorization function"}),"."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-swift",children:"ATTrackingManager.requestTrackingAuthorization { status in\n    switch status {\n    case .authorized:\n        // Now that tracking is authorized we can get the IDFA\n        let idfa = ASIdentifierManager.shared().advertisingIdentifier\n        \n    default: () // IDFA is not authorized\n    }\n}\n"})})]})}function u(e={}){const{wrapper:a}={...(0,s.R)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,a,n)=>{n.d(a,{R:()=>r,x:()=>c});var i=n(6540);const t={},s=i.createContext(t);function r(e){const a=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function c(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:a},e.children)}}}]);