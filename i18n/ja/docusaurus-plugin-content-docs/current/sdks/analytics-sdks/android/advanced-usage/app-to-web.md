---
sidebar_position: 11
id: android-analytics-app-to-web
slug: /analytics-sdk/android/android-app-to-web
title: アプリから WebView トラッキング
added_version: 6.8.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## アプリから WebView トラッキング

SDK を構成して、`ra_uid` と呼ばれる特別なトラッキングクッキーを注入することができます。これにより、アプリとアプリ内 WebView 間のイベントを RAT でトラッキングできるようになります。この機能を使用すると、単一ドメインまたは複数ドメインをトラッキングできます。

`ra_uid` クッキーで使用される 2 つの主要なパラメータは `ckp` と `cka` です：

- **ckp**: これは一意のデバイス識別子で、すべての Rakuten アプリケーション間でデバイスをトラッキングするために使用されます。
- **cka**: これは広告 ID で、一意でユーザーがリセット可能な識別子です。広告および分析目的で使用されます。広告 ID が利用できない場合、デフォルト値 `00000000-0000-0000-0000-000000000000` が使用されます。

### `ra_uid` クッキー形式

クッキーは、以下の `COOKIE_FORMAT` を使用してフォーマットされます：

```kotlin
COOKIE_FORMAT = "rat_uid=%s;a_uid=%s"
```

この形式では：

- `rat_uid` は `ckp` の値を取ります。
- `a_uid` は `cka` の値を取ります。

#### `ra_uid` クッキー値の例

設定した各ドメインに対して、リクエストコンテンツ内でクッキーは以下のように表示されます：

```kotlin
// Advertisiong ID is available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3Dad7ab8a4-83c8-4ae2-b31f-20b453a62621

// Advertisiong ID is not available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3D00000000-0000-0000-0000-000000000000
```

### 単一ドメインのトラッキング

v6.8.0 以降、特定のドメインに対してデバイスおよび広告識別子を WebView クッキーに含めるように App to WebView トラッキングを有効にできます。

ビルド時に App to WebView トラッキングを有効にする方法の詳細については、[Configuration](./android-user-guide#configuration) セクションを参照してください。App to WebView トラッキングは、ランタイムでも有効または無効にできます。

```kotlin
AnalyticsManager.instance()?.enableWebTracking(true)
```

デフォルトでは、App to WebView トラッキングは __".rakuten.co.jp"__ をターゲットドメインとして使用します。`WebCookieConfig` クラスを拡張し、`AnalyticsManager` に設定することで、ランタイムで異なるドメインを構成できます。

```kotlin
AnalyticsManager.instance()?.setCookieConfig(object : WebCookieConfig() {
      override fun domainForTrackingCookie() =".your.target.domain"
    })
```

デフォルトドメインを使用するように App to WebView トラッキングをリセットするには、クッキー設定を null に設定します。

```kotlin
AnalyticsManager.instance()?.setCookieConfig(null)
```

アプリが WebView クッキーにデバイスおよび広告識別子を含めることを期待する場合、`CookieManager#setAcceptCookie()` が `false` に設定されていないことを確認してください。

### 複数ドメインのトラッキング

バージョン 11.0.0 以降、`setCookieConfig(cookieConfigs: Iterable<WebCookieConfig>)` API を使用して、トラッキングクッキーにカスタムドメインをオプションで設定できます。

```kotlin
AnalyticsManager.instance()?.setCookieConfig(
    listOf(
        object : WebCookieConfig() {
            override fun domainForTrackingCookie() = ".your.target.domain1"
        },
        object : WebCookieConfig() {
            override fun domainForTrackingCookie() = ".your.target.domain2"
        },
    )
)
```

### 設定された WebCookieConfig の確認

設定した `WebCookieConfig` を `getCookieConfigs()` API を使用して確認することもできます。

```kotlin
val webCookieConfigList = AnalyticsManager.instance()?.getCookieConfigs()
```
