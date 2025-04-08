"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[4361],{1364:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>c,metadata:()=>a,toc:()=>r});const a=JSON.parse('{"id":"sdks/analytics-sdks/android/advanced-usage/android-analytics-duplicate-events","title":"Duplicate Events for Multiple Accounts","description":"Duplicate events across multiple RAT Accounts","source":"@site/docs/sdks/analytics-sdks/android/advanced-usage/duplicate-events.md","sourceDirName":"sdks/analytics-sdks/android/advanced-usage","slug":"/analytics-sdk/android/android-duplicate-events","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-duplicate-events","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8,"id":"android-analytics-duplicate-events","slug":"/analytics-sdk/android/android-duplicate-events","title":"Duplicate Events for Multiple Accounts","added_version":"7.3.0","updated_version":"11.0.0","changelog":"./android-changelog"},"sidebar":"docSidebar","previous":{"title":"Automatic Event Tracking","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-auto-tracking"},"next":{"title":"Setting and Removing Member Identifier","permalink":"/rakuten-analytics-public-docs/docs/analytics-sdk/android/android-member-identifier"}}');var i=t(4848),s=t(8453);const c={sidebar_position:8,id:"android-analytics-duplicate-events",slug:"/analytics-sdk/android/android-duplicate-events",title:"Duplicate Events for Multiple Accounts",added_version:"7.3.0",updated_version:"11.0.0",changelog:"./android-changelog"},d=void 0,o={},r=[{value:"Duplicate events across multiple RAT Accounts",id:"duplicate-events-across-multiple-rat-accounts",level:2},{value:"Build time configuration",id:"build-time-configuration",level:3},{value:"Runtime Configuration",id:"runtime-configuration",level:3}];function l(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"duplicate-events-across-multiple-rat-accounts",children:"Duplicate events across multiple RAT Accounts"}),"\n",(0,i.jsxs)(n.p,{children:["RAT Tracker can be configured to mirror events to multiple RAT accounts. Once configured, the SDK will automatically duplicate any events destined for the original accountId and applicationId defined in the ",(0,i.jsxs)(n.a,{href:"./android-user-guide#2-configure-rat-tracker-in-your-apps-androidmanifestxml",children:["app's ",(0,i.jsx)(n.code,{children:"AndroidManifest.xml"})]})," to all added duplicate accounts."]}),"\n",(0,i.jsx)(n.h3,{id:"build-time-configuration",children:"Build time configuration"}),"\n",(0,i.jsxs)(n.p,{children:["Create rakuten-analytics.json file in the app's assets folder ",(0,i.jsx)(n.code,{children:"assets/rakuten-analytics.json"})," with the RAT duplicate\naccounts list. The account object will contain a RAT Account Identifier and RAT App Identifier name-value pairs and an optional RAT non-duplicated events array to disable tracking on specific events."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "ratDuplicateAccounts": [\n    {\n      "ratAccountIdentifier":199,\n      "ratAppIdentifier":2,\n      "ratNonDuplicatedEventsList":[]\n\n    },\n    {\n      "ratAccountIdentifier":200,\n      "ratAppIdentifier":1,\n      "ratNonDuplicatedEventsList":[\n        "_rem_init_launch"\n      ]\n    }\n  ]\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"runtime-configuration",children:"Runtime Configuration"}),"\n",(0,i.jsx)(n.p,{children:"User can also add secondary accounts at runtime. Custom events will be mirrored to accounts declared at runtime. Ignores the build-time ratNonDuplicatedEventsList when set."}),"\n",(0,i.jsx)(n.p,{children:"\u26a0\ufe0f Won't duplicate an event if that event on the main account is disabled."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"RatTracker.instance().addDuplicateAccount(myRATACC2, myRATAID2)\nRatTracker.instance().addDuplicateAccount(myRATACC3, myRATAID3)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Disabling an event at runtime:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'RATTracker.shouldDuplicateRATEventHandler { eventName, duplicateAccountId ->\n  eventName != "_rem_end_session" && duplicateAccountId == 999\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>d});var a=t(6540);const i={},s=a.createContext(i);function c(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);