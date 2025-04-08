---
sidebar_position: 7
id: ios-analytics-debug-logging
slug: /analytics-sdk/ios/ios-debug-logging
title: デバッグロギング
added_version: 5.3.0
updated_version: 9.4.0
changelog: ./ios-changelog
---

## デバッグロギングの設定

モジュールの内部デバッグロギングを設定するには、`AnalyticsManager#set(loggingLevel:)`を使用してください。

デバッグレベル（およびそれ以上、つまりinfo/warning/errorログも出力）にロギングを設定するには、以下の関数呼び出しを使用します:

```swift
AnalyticsManager.shared().set(loggingLevel: .debug)
```

⚠️ ユーザープライバシーとアプリのセキュリティのため、モジュールはリリースビルドでは**verbose**または**debug**ログを出力しません。

デフォルトでは、モジュールはリリースビルドでもエラーログを表示します。モジュールのログを完全に無効にするには、以下を呼び出してください:

```swift
AnalyticsManager.shared().set(loggingLevel: .none)
```

⚠️ plistフラグ`RMSDKEnableDebugLogging`は廃止され、現在は効果がありません。ロギングレベルを設定するには、上記の`AnalyticsManager` API関数を使用する必要があります。
