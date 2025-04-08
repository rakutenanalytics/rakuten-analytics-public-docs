---
sidebar_position: 6
id: ios-analytics-error-handling
slug: /analytics-sdk/ios/ios-error-handling
title: エラーハンドリング
added_version: 9.2.0
updated_version: 9.2.0
changelog: ./ios-changelog
---

## エラーの処理

以下のように`errorHandler`を設定すると、SDKは自動的にエラーを発生させます:

```swift
AnalyticsManager.shared().errorHandler = { error in
    // Example: Report the error to Crashlytics
}
```

これを使用して、SDKのエラーを[非致命的エラー](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=ios#log-excepts)としてCrashlyticsなどのバックエンドに報告することができます。
