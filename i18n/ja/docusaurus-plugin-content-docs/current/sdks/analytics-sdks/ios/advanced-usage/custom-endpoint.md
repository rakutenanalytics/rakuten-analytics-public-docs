---
sidebar_position: 1
id: ios-analytics-custom-endpoint
slug: /analytics-sdk/ios/ios-custom-endpoint
title: カスタムエンドポイント
added_version: 3.1.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## カスタムエンドポイントの設定

分析バックエンドと通信する際にカスタムエンドポイントを使用するには、アプリのinfo.plistに`RATEndpoint`キーを追加し、それをカスタムエンドポイントに設定してください。

カスタムエンドポイントは以下のように実行時に設定することもできます:

```swift
AnalyticsManager.shared().set(endpointURL: URL(string: "%custom_endpoint_url%"))
```

⚠️ 実行時に設定したエンドポイントは永続化されず、開発者/QAテスト専用として意図されています。

**注意**: [カスタムトラッカー](./ios-custom-tracker)を実装している場合、エンドポイント設定関数を呼び出す前にトラッカーをマネージャーに追加していることを確認してください。
