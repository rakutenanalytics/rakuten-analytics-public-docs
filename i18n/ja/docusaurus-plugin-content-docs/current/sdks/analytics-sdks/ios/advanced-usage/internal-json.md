---
sidebar_position: 16
id: ios-analytics-internal-json
slug: /analytics-sdk/ios/ios-internal-json
title: 内部JSONシリアライゼーション
added_version: 8.1.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## 内部JSONシリアライゼーション

iOSのネイティブJSONシリアライゼーションに浮動小数点数に関するバグがあるため、イベントパラメータに浮動小数点数を含むイベントをトラッキングするiOSアプリでは、内部JSONシリアライゼーションを使用する必要があります。

この特定のケースでは、アプリの`Info.plist`に`RATEnableInternalSerialization`キーを`true`に設定してください:

```
<key>RATEnableInternalSerialization</key>
<true/>
```
