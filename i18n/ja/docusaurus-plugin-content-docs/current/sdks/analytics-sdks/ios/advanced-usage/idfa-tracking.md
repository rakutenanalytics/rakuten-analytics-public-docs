---
sidebar_position: 3
id: ios-analytics-idfa-tracking
slug: /analytics-sdk/ios/ios-idfa-tracking
title: IDFAトラッキング
added_version: 2.6.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## IDFAトラッキング

SDKはデフォルトで[広告識別子 (IDFA)](https://developer.apple.com/reference/adsupport/asidentifiermanager)を自動的にトラッキングしますが、`shouldTrackAdvertisingIdentifier`を`false`に設定することで無効にすることができます:

```swift
AnalyticsManager.shared().shouldTrackAdvertisingIdentifier = false
```

### iOS 14.x以降でのIDFAトラッキング

⚠️ 利用可能なIDFA値が有効（ゼロでない）場合、RakutenAnalytics SDKはそれを使用します。この変更は、Appleの[発表](https://developer.apple.com/news/?id=hx9s63c5)に対応して実装されました。この発表では、ユーザートラッキングの許可を得るための要件が2021年初頭まで延期されたことが述べられています。

アプリがiOS 14 SDKでビルドされ、[AppTrackingTransparencyフレームワーク](https://developer.apple.com/documentation/apptrackingtransparency)を埋め込んでいる場合、Analytics SDKは、ユーザーがトラッキングを許可した場合にのみ、iOS 14.x以降でIDFAを使用します。アプリは、Info.plistに`NSUserTrackingUsageDescription`キーを追加し、[requestTrackingAuthorization関数](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547037-requesttrackingauthorization)を呼び出すことで、IDFAトラッキング許可ポップアップを表示できます。

```swift
ATTrackingManager.requestTrackingAuthorization { status in
    switch status {
    case .authorized:
        // トラッキングが許可されたので、IDFAを取得できます
        let idfa = ASIdentifierManager.shared().advertisingIdentifier

    default: () // IDFAは許可されていません
    }
}
```
