"use strict";(self.webpackChunkanalytics_sdk_extensions=self.webpackChunkanalytics_sdk_extensions||[]).push([[7744],{5208:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>y,frontMatter:()=>s,metadata:()=>i,toc:()=>o});const i=JSON.parse('{"id":"sdks/analytics-sdks/android/advanced-usage/android-analytics-identity-container","title":"\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3\u30b3\u30f3\u30c6\u30ca","description":"\u30e6\u30fc\u30b6\u30fc\u306e\u6a5f\u5bc6\u30c7\u30fc\u30bf\u306e\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8","source":"@site/i18n/ja/docusaurus-plugin-content-docs/current/sdks/analytics-sdks/android/advanced-usage/identity-store.md","sourceDirName":"sdks/analytics-sdks/android/advanced-usage","slug":"/analytics-sdk/android/identity-container","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/android/identity-container","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":9.1,"frontMatter":{"sidebar_position":9.1,"id":"android-analytics-identity-container","slug":"/analytics-sdk/android/identity-container","title":"\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3\u30b3\u30f3\u30c6\u30ca","added_version":"12.0.0","changelog":"./android-changelog"},"sidebar":"docSidebar","previous":{"title":"\u30e1\u30f3\u30d0\u30fc\u8b58\u5225\u5b50\u306e\u8a2d\u5b9a\u3068\u524a\u9664","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/android/android-member-identifier"},"next":{"title":"\u30a2\u30d7\u30ea\u9593\u30c8\u30e9\u30c3\u30ad\u30f3\u30b0","permalink":"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/android/android-app-to-app"}}');var d=t(4848),r=t(8453);const s={sidebar_position:9.1,id:"android-analytics-identity-container",slug:"/analytics-sdk/android/identity-container",title:"\u30a2\u30a4\u30c7\u30f3\u30c6\u30a3\u30c6\u30a3\u30b3\u30f3\u30c6\u30ca",added_version:"12.0.0",changelog:"./android-changelog"},a=void 0,l={},o=[{value:"\u30e6\u30fc\u30b6\u30fc\u306e\u6a5f\u5bc6\u30c7\u30fc\u30bf\u306e\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8",id:"\u30e6\u30fc\u30b6\u30fc\u306e\u6a5f\u5bc6\u30c7\u30fc\u30bf\u306e\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8",level:2},{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:2},{value:"Default Encrypted Identity Store",id:"default-encrypted-identity-store",level:3},{value:"IdentityStore \u306e\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7",id:"identitystore-\u306e\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7",level:4},{value:"Analytics SDK \u3078\u306e\u7d71\u5408",id:"analytics-sdk-\u3078\u306e\u7d71\u5408",level:4},{value:"Custom Identity Store",id:"custom-identity-store",level:3},{value:"Analytics SDK \u3078\u306e\u7d71\u5408",id:"analytics-sdk-\u3078\u306e\u7d71\u5408-1",level:4},{value:"Identity Store \u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u81ea\u52d5\u30af\u30ea\u30a2",id:"identity-store-\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u81ea\u52d5\u30af\u30ea\u30a2",level:4},{value:"ID \u306e\u4fdd\u5b58\u3068\u53d6\u5f97",id:"id-\u306e\u4fdd\u5b58\u3068\u53d6\u5f97",level:2},{value:"Analytics SDK \u3067\u306e Identity Store \u306e\u4f7f\u7528\u89e3\u9664",id:"analytics-sdk-\u3067\u306e-identity-store-\u306e\u4f7f\u7528\u89e3\u9664",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h2,{id:"\u30e6\u30fc\u30b6\u30fc\u306e\u6a5f\u5bc6\u30c7\u30fc\u30bf\u306e\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8",children:"\u30e6\u30fc\u30b6\u30fc\u306e\u6a5f\u5bc6\u30c7\u30fc\u30bf\u306e\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8"}),"\n",(0,d.jsx)(n.p,{children:"Analytics SDK \u306f\u3001\u30e6\u30fc\u30b6\u30fc\u306e ID \u3068\u6a5f\u5bc6\u30c7\u30fc\u30bf\u3092\u7ba1\u7406\u3059\u308b\u305f\u3081\u306e Identity Container \u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002\u3053\u308c\u306f\u3001\u30ad\u30fc\u3068\u5024\u306e\u30da\u30a2\u3068\u3057\u3066\u30e6\u30fc\u30b6\u30fc ID \u3092\u4fdd\u6301\u3059\u308b\u30ad\u30fc\u5024\u30b9\u30c8\u30a2\u3067\u3059\u3002"}),"\n",(0,d.jsxs)(n.p,{children:["Identity Store \u306e\u4e3b\u306a\u76ee\u7684\u306f\u3001",(0,d.jsxs)(n.a,{href:"/rakuten-analytics-public-docs/ja/docs/analytics-sdk/android/android-member-identifier",children:[(0,d.jsx)(n.code,{children:"setMemberIdentifier()"})," API"]})," \u3092\u4f7f\u7528\u3059\u308b\u969b\u306b\u3001\u30e1\u30f3\u30d0\u30fc\u8b58\u5225\u5b50\u306e\u305f\u3081\u306e\u5b89\u5168\u3067\u6c38\u7d9a\u7684\u306a\u30b9\u30c8\u30ec\u30fc\u30b8\u30e1\u30ab\u30cb\u30ba\u30e0\u3092\u63d0\u4f9b\u3059\u308b\u3053\u3068\u3067\u3059\u3002"]}),"\n",(0,d.jsx)(n.h2,{id:"\u4f7f\u7528\u65b9\u6cd5",children:"\u4f7f\u7528\u65b9\u6cd5"}),"\n",(0,d.jsx)(n.p,{children:"\u30e6\u30fc\u30b6\u30fc ID \u3092\u7ba1\u7406\u3059\u308b Identity Store \u306f\u3001\u4ee5\u4e0b\u306e 2 \u3064\u306e\u65b9\u6cd5\u3067\u69cb\u6210\u3067\u304d\u307e\u3059\uff1a"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.strong,{children:"Default Encrypted Identity Store"}),": Analytics SDK \u306b\u3088\u3063\u3066\u63d0\u4f9b\u3055\u308c\u308b\u4e8b\u524d\u69cb\u7bc9\u3055\u308c\u305f\u5b89\u5168\u306a Identity Store \u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.strong,{children:"Custom Identity Store"}),": \u7279\u5b9a\u306e\u30b3\u30f3\u30c6\u30ca\u8981\u4ef6\u306b\u5408\u308f\u305b\u305f\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u5b9f\u88c5\u3092\u4f7f\u7528\u3057\u3066\u72ec\u81ea\u306e Identity Store \u3092\u4f5c\u6210\u3057\u307e\u3059\u3002"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"default-encrypted-identity-store",children:"Default Encrypted Identity Store"}),"\n",(0,d.jsx)(n.p,{children:"\u30c7\u30d5\u30a9\u30eb\u30c8\u306e Identity Store \u306f\u6697\u53f7\u5316\u3055\u308c\u305f\u30b9\u30c8\u30a2\u3067\u3042\u308a\u3001\u6697\u53f7\u5316\u3092\u4f7f\u7528\u3057\u3066\u30e6\u30fc\u30b6\u30fc ID \u3092\u4fdd\u5b58\u3057\u307e\u3059\u3002\u30c7\u30d5\u30a9\u30eb\u30c8\u306e Identity Store \u3092\u4f7f\u7528\u3059\u308b\u306b\u306f\u3001\u4ee5\u4e0b\u306e\u624b\u9806\u306b\u5f93\u3063\u3066\u304f\u3060\u3055\u3044\u3002"}),"\n",(0,d.jsx)(n.h4,{id:"identitystore-\u306e\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7",children:"IdentityStore \u306e\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7"}),"\n",(0,d.jsx)(n.p,{children:"\u307e\u305a\u3001\u6697\u53f7\u5316\u3055\u308c\u305f ID \u30c7\u30fc\u30bf\u3092\u4fdd\u5b58\u3059\u308b\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3092\u5b9a\u7fa9\u3057\u307e\u3059\u3002\u4f8b\uff1a"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:'val storageDir = File(context.filesDir, "identity")\n'})}),"\n",(0,d.jsx)(n.p,{children:'\u6b21\u306b\u3001ID \u30c7\u30fc\u30bf\u3092\u4fdd\u8b77\u3059\u308b\u305f\u3081\u306b\u4f7f\u7528\u3059\u308b\u6697\u53f7\u5316\u30ad\u30fc\u3092\u5b9a\u7fa9\u3057\u307e\u3059\u3002\u91cd\u8981: "your-encryption-key" \u3092\u5f37\u529b\u3067\u5b89\u5168\u306b\u7ba1\u7406\u3055\u308c\u305f\u30ad\u30fc\u306b\u7f6e\u304d\u63db\u3048\u3066\u304f\u3060\u3055\u3044\u3002'}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:'val encryptionKey = "your-encryption-key".toByteArray()\n'})}),"\n",(0,d.jsx)(n.p,{children:"\u6700\u5f8c\u306b\u3001\u30b9\u30c8\u30ec\u30fc\u30b8\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3068\u6697\u53f7\u5316\u30ad\u30fc\u3092\u6307\u5b9a\u3057\u3066 Builder \u3092\u4f7f\u7528\u3057\u3066 IdentityStore \u30a4\u30f3\u30b9\u30bf\u30f3\u30b9\u3092\u4f5c\u6210\u3057\u307e\u3059\u3002"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:"val encryptedStore = IdentityStore.Builder()\n    .setEncryptedIdentityStore(storageDir, encryptionKey)\n    .build()\n"})}),"\n",(0,d.jsx)(n.h4,{id:"analytics-sdk-\u3078\u306e\u7d71\u5408",children:"Analytics SDK \u3078\u306e\u7d71\u5408"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"setIdentityStore"})," \u30e1\u30bd\u30c3\u30c9\u3092\u4f7f\u7528\u3057\u3066\u3001Analytics SDK \u306b IdentityStore \u3092\u8a2d\u5b9a\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:"encryptedStore?.let {\n    AnalyticsManager.setIdentityStorage(it)\n}\n"})}),"\n",(0,d.jsx)(n.h3,{id:"custom-identity-store",children:"Custom Identity Store"}),"\n",(0,d.jsx)(n.p,{children:"\u72ec\u81ea\u306e Identity Store \u3092\u4f5c\u6210\u3059\u308b\u306b\u306f\u3001IdentityStore \u30a4\u30f3\u30bf\u30fc\u30d5\u30a7\u30fc\u30b9\u3092\u5b9f\u88c5\u3057\u3001\u30e6\u30fc\u30b6\u30fc ID \u3092\u4fdd\u5b58\u3001\u53d6\u5f97\u3001\u304a\u3088\u3073\u524a\u9664\u3059\u308b\u305f\u3081\u306b\u5fc5\u8981\u306a\u30e1\u30bd\u30c3\u30c9\u3092\u66f4\u65b0\u3057\u307e\u3059\u3002"}),"\n",(0,d.jsx)(n.admonition,{type:"tip",children:(0,d.jsx)(n.p,{children:"\u4ee5\u4e0b\u306e\u4f8b\u306f\u3001\u30b9\u30c8\u30ec\u30fc\u30b8\u306b\u30df\u30e5\u30fc\u30bf\u30d6\u30eb\u30de\u30c3\u30d7\u3092\u4f7f\u7528\u3059\u308b\u57fa\u672c\u7684\u306a\u30ab\u30b9\u30bf\u30e0 Identity Store \u3092\u793a\u3057\u3066\u3044\u307e\u3059\u3002\u3053\u308c\u306f\u8aac\u660e\u76ee\u7684\u306e\u307f\u3067\u3059\u3002\u5b9f\u969b\u306e\u30b7\u30ca\u30ea\u30aa\u3067\u306f\u3001\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3084\u5b89\u5168\u306a\u30ad\u30fc\u5024\u30b9\u30c8\u30a2\u306a\u3069\u3001\u3088\u308a\u6c38\u7d9a\u7684\u3067\u5b89\u5168\u306a\u30b9\u30c8\u30ec\u30fc\u30b8\u30e1\u30ab\u30cb\u30ba\u30e0\u3092\u4f7f\u7528\u3057\u3001\u5fc5\u8981\u306b\u5fdc\u3058\u3066\u6697\u53f7\u5316\u65b9\u6cd5\u3092\u7d44\u307f\u8fbc\u3080\u3053\u3068\u304c\u63a8\u5968\u3055\u308c\u307e\u3059\u3002\u30ab\u30b9\u30bf\u30e0\u5b9f\u88c5\u306b\u3088\u308a\u3001\u30e6\u30fc\u30b6\u30fc ID \u306e\u30b9\u30c8\u30ec\u30fc\u30b8\u3068\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u3092\u7279\u5b9a\u306e\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u8981\u4ef6\u306b\u5408\u308f\u305b\u3066\u8abf\u6574\u3067\u304d\u307e\u3059\u3002"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:"class CustomIdentityStore : IdentityStore {\n    private val store = mutableMapOf<String, String>()\n\n    override suspend fun save(key: String, value: String) {\n        store[key] = value\n    }\n\n    override suspend fun get(key: String): String? {\n        return store[key]\n    }\n\n    override suspend fun remove(key: String) {\n        store.remove(key)\n    }\n}\n"})}),"\n",(0,d.jsx)(n.h4,{id:"analytics-sdk-\u3078\u306e\u7d71\u5408-1",children:"Analytics SDK \u3078\u306e\u7d71\u5408"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"setIdentityStore()"})," \u30e1\u30bd\u30c3\u30c9\u3092\u4f7f\u7528\u3057\u3066\u3001Analytics SDK \u306b IdentityStore \u3092\u8a2d\u5b9a\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:"val customIdentityStore = CustomIdentityStore()\nAnalyticsManager.setIdentityStorage(customIdentityStore)\n"})}),"\n",(0,d.jsx)(n.h4,{id:"identity-store-\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u81ea\u52d5\u30af\u30ea\u30a2",children:"Identity Store \u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u81ea\u52d5\u30af\u30ea\u30a2"}),"\n",(0,d.jsx)(n.admonition,{type:"warning",children:(0,d.jsxs)(n.p,{children:["Identity Store \u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3092\u30af\u30ea\u30a2\u3059\u308b\u3068\u3001\u4fdd\u5b58\u3055\u308c\u305f\u30c7\u30fc\u30bf\u304c\u5b8c\u5168\u306b\u6d88\u53bb\u3055\u308c\u3001Identity Store \u304c\u524a\u9664\u3055\u308c\u307e\u3059\u3002\u305d\u306e\u7d50\u679c\u3001",(0,d.jsx)(n.strong,{children:"\u65b0\u3057\u3044\u30ed\u30b0\u30a4\u30f3\u30a2\u30af\u30b7\u30e7\u30f3\u304c\u5b9f\u884c\u3055\u308c\u3001\u30e6\u30fc\u30b6\u30fc\u306e ID \u304c\u518d\u78ba\u7acb\u3055\u308c\u308b\u307e\u3067\u3001\u30c8\u30e9\u30c3\u30ad\u30f3\u30b0\u3055\u308c\u305f\u30a4\u30d9\u30f3\u30c8\u306e\u30da\u30a4\u30ed\u30fc\u30c9\u306b\u30e1\u30f3\u30d0\u30fc\u8b58\u5225\u5b50\u304c\u542b\u307e\u308c\u306a\u304f\u306a\u308a\u307e\u3059"}),"\u3002"]})}),"\n",(0,d.jsx)(n.h2,{id:"id-\u306e\u4fdd\u5b58\u3068\u53d6\u5f97",children:"ID \u306e\u4fdd\u5b58\u3068\u53d6\u5f97"}),"\n",(0,d.jsxs)(n.p,{children:["Identity Container \u306e\u4e3b\u306a\u6a5f\u80fd\u306f\u3001",(0,d.jsx)(n.code,{children:"setMemberIdentifier()"})," API \u3092\u4f7f\u7528\u3059\u308b\u969b\u306b\u30e1\u30f3\u30d0\u30fc\u8b58\u5225\u5b50\u306e\u30b9\u30c8\u30ec\u30fc\u30b8\u3092\u7ba1\u7406\u3059\u308b\u3053\u3068\u3067\u3059\u304c\u3001Identity Store \u306f\u4ed6\u306e\u30e6\u30fc\u30b6\u30fc ID \u3084\u6c38\u7d9a\u7684\u304b\u3064\u4fdd\u8b77\u3055\u308c\u305f\u30b9\u30c8\u30ec\u30fc\u30b8\u3092\u5fc5\u8981\u3068\u3059\u308b\u6a5f\u5bc6\u30c7\u30fc\u30bf\u3092\u5b89\u5168\u306b\u4fdd\u5b58\u304a\u3088\u3073\u53d6\u5f97\u3059\u308b\u305f\u3081\u306b\u3082\u4f7f\u7528\u3067\u304d\u307e\u3059\u3002"]}),"\n",(0,d.jsxs)(n.p,{children:["IdentityStore \u306b\u30c7\u30fc\u30bf\u3092\u4fdd\u5b58\u3059\u308b\u306b\u306f\u3001",(0,d.jsx)(n.code,{children:"save"})," \u30e1\u30bd\u30c3\u30c9\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:'encryptedStorage?.save("key", "value")\n'})}),"\n",(0,d.jsxs)(n.p,{children:["IdentityStore \u304b\u3089\u30c7\u30fc\u30bf\u3092\u53d6\u5f97\u3059\u308b\u306b\u306f\u3001",(0,d.jsx)(n.code,{children:"get"})," \u30e1\u30bd\u30c3\u30c9\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:'val value = encryptedStorage?.get("key")\n'})}),"\n",(0,d.jsxs)(n.p,{children:["IdentityStore \u304b\u3089\u30c7\u30fc\u30bf\u3092\u524a\u9664\u3059\u308b\u306b\u306f\u3001",(0,d.jsx)(n.code,{children:"remove"})," \u30e1\u30bd\u30c3\u30c9\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:'encryptedStorage?.remove("key")\n'})}),"\n",(0,d.jsx)(n.h2,{id:"analytics-sdk-\u3067\u306e-identity-store-\u306e\u4f7f\u7528\u89e3\u9664",children:"Analytics SDK \u3067\u306e Identity Store \u306e\u4f7f\u7528\u89e3\u9664"}),"\n",(0,d.jsx)(n.p,{children:"Analytics SDK \u3067 Identity Store \u306e\u4f7f\u7528\u3092\u524a\u9664\u3059\u308b\u306b\u306f\u3001Identity Store \u3092 null \u306b\u8a2d\u5b9a\u3057\u307e\u3059\u3002"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-kotlin",children:"AnalyticsManager.setIdentityStorage(null)\n"})}),"\n",(0,d.jsx)(n.admonition,{type:"info",children:(0,d.jsxs)(n.p,{children:["Analytics SDK \u3067 Identity Store \u306e\u4f7f\u7528\u3092\u524a\u9664\u3059\u308b\u3068\u3001\u4ee5\u524d\u306b\u4fdd\u5b58\u3055\u308c\u305f\u30e1\u30f3\u30d0\u30fc\u8b58\u5225\u5b50\u304c\u30c7\u30d5\u30a9\u30eb\u30c8\u306e\u30ed\u30fc\u30ab\u30eb\u30b9\u30c8\u30a2\u306b\u79fb\u884c\u3055\u308c\u307e\u3059\u3002\u3053\u306e\u30c7\u30d5\u30a9\u30eb\u30c8\u306e\u30ed\u30fc\u30ab\u30eb\u30b9\u30c8\u30a2\u306f ",(0,d.jsx)(n.strong,{children:"\u6697\u53f7\u5316\u3055\u308c\u3066\u3044\u307e\u305b\u3093"}),"\u3002"]})})]})}function y(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var i=t(6540);const d={},r=i.createContext(d);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);