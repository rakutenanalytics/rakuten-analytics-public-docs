---
sidebar_position: 12
id: android-analytics-user-agent
slug: /analytics-sdk/android/android-user-agent
title: アプリのユーザーエージェントを WebView に追加
added_version: 9.3.0
updated_version: 9.3.0
changelog: ./android-changelog
---

## アプリケーションのユーザーエージェント文字列を WebView に追加

RAT 拡張機能 `WebView.setAppUserAgentString()` を使用して、アプリケーションのユーザーエージェントを WebView に追加することができます。以下のように使用します:

```kotlin
// 1- get the WebView or create one
val webView = WebView(context)

// set the default App user-agent
webView.setAppUserAgentString()

// or set a custom user-agent
webView.setAppUserAgentString("myAppName/1.0.0")
```

この設定を有効または無効にするには、以下のいずれかの構成を使用します。

### 1- ビルド時の構成

マニフェストのメタデータでキー `com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled` を使用します。

```xml
<meta-data
    android:name="com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled"
    android:value="false"/>
```

### 2- ランタイム構成

```kotlin
AnalyticsManager.setWebViewAppUserAgentEnabled(enabled: Boolean = true)
```
