---
sidebar_position: 15
id: ios-analytics-user-agent
slug: /analytics-sdk/ios/ios-user-agent
title: WKWebViewでのアプリユーザーエージェント
added_version: 9.8.0
updated_version: 9.8.0
changelog: ./ios-changelog
---

## WKWebViewでアプリユーザーエージェントを設定する方法

この機能を使用すると、デフォルトのWKWebViewのユーザーエージェントにアプリのユーザーエージェントを以下の形式で追加できます:

`{webview-user-agent} {app-bundle-identifier}/{CFBundleShortVersionString}`

### ビルド時

- アプリの`Info.plist`を設定して、WKWebViewでのアプリユーザーエージェント設定を有効にします:

```xml
<key>RATSetWebViewAppUserAgentEnabled</key>
<true/>
```

- アプリの`Info.plist`を設定して、WKWebViewでのアプリユーザーエージェント設定を無効にします:

```xml
<key>RATSetWebViewAppUserAgentEnabled</key>
<false/>
```

#### 注意

アプリの`Info.plist`に`RATSetWebViewAppUserAgentEnabled`が設定されていない場合、その値はデフォルトで`true`に設定されます。

#### 警告

`AnalyticsManager`がメインスレッドから起動されていない場合、`WKWebView`のユーザーエージェントはメインスレッドの次のループでのみ設定されます。

したがって、この特定のケースでは、起動時に`WKWebView`をインスタンス化しないでください。

### 実行時

- WKWebViewでのアプリユーザーエージェント設定を有効にする:

```swift
let webView = WKWebView()
webView.enableAppUserAgent(true)
```

- カスタム値を使用してWKWebViewでのアプリユーザーエージェント設定を有効にする:

```swift
let webView = WKWebView()
webView.enableAppUserAgent(true, with: "custom-app-user-agent-value")
```

- WKWebViewでのアプリユーザーエージェント設定を無効にする:

```swift
let webView = WKWebView()
webView.enableAppUserAgent(false)
```
