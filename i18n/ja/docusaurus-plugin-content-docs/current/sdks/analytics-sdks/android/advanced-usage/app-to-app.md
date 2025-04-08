---
sidebar_position: 10
id: android-analytics-app-to-app
slug: /analytics-sdk/android/android-app-to-app
title: アプリ間トラッキング
added_version: 7.3.0
updated_version: 11.1.0
changelog: ./android-changelog
---

## アプリ間トラッキング

App to App Tracking 機能により、"referral" アプリから "referred" アプリへのディープリンク URI に含まれる詳細をトラッキングできます。

Analytics SDK v7.3.0 以降が referred アプリに統合されている場合、SDK は自動的に以下の 2 つのイベントを RAT に送信します：

- etype `pv` 訪問イベントが **referred** アプリの RAT アカウントに送信されます。
- etype `deeplink` イベントが **referral** アプリの RAT アカウントに送信されます。

### Referred Apps

referred アプリがバックグラウンドで既に実行中の場合、referral アプリがディープリンクまたはアプリリンクを介して開いたときに、SDK は referral パラメータを取得できません。

これを処理するには、以下をアプリに追加する必要があります：

1. ディープリンクを処理するアクティビティで `onNewIntent` をオーバーライドし、新しいインテントをアクティビティのインテントに設定します。

```kotlin
class YourActivity : Activity() {
...
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        this.intent = intent
    }
...
}
```

### Referral App

以下の形式でディープリンク URL を使用し、クエリパラメータの値が正しくエンコードされていることを確認してください。

```kotlin
private fun createDeeplinkUriString(): String {
    val scheme = "samplescheme" // referred app's deeplink scheme
    val host = "samplehost" // referred app's deeplink host
    val packageName = "referral.app.package.name" // referral app's package name

    val builder = StringBuilder()
    builder.append("$scheme://$host?ref=$packageName")

    val acc = "123" // referral app's RAT account ID
    builder.append("&ref_acc=${URLEncoder.encode(acc, StandardCharsets.UTF_8.displayName())}")

    val aid = "456" // referral app's RAT application ID
    builder.append("&ref_aid=${URLEncoder.encode(aid, StandardCharsets.UTF_8.displayName())}")

    // the following values are optional parameters
    val link = "campaign-abc" // unique identifier of the referral trigger
    builder.append("&ref_link=${URLEncoder.encode(link, StandardCharsets.UTF_8.displayName())}")

    val comp = "checkout" // component in the referral app
    builder.append("&ref_comp=${URLEncoder.encode(comp, StandardCharsets.UTF_8.displayName())}")

    // below are the custom parameters that can use any String as parameter key
    // there is currently no limit on the number of custom parameters
    val param1 = "param1" // custom parameter with "custom1" key and "param1" value
    builder.append("&custom1=${URLEncoder.encode(param1, StandardCharsets.UTF_8.displayName())}")

    val param2 = "param2" // custom parameter with "custom2" key and "param2" value
    builder.append("&custom2=${URLEncoder.encode(param2, StandardCharsets.UTF_8.displayName())}")

    return builder.toString()
}
```

作成したディープリンク URI を使用して referred アプリを起動します。

```kotlin
private fun onLaunchApp() {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(createDeeplinkUriString()))
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        Log.e(TAG, e.localizedMessage, e.cause)
    }
}
```

v8.1.0 以降、正しい形式で URI を簡単に生成するためのヘルパークラスが利用可能です。

```kotlin
val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
val host = "samplehost" // referred app's deeplink host
val packageName = "referral.app.package.name" // referral app's package name
val acc = 123 // referral app's RAT account ID
val aid = 456 // referral app's RAT application ID

val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
// uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"

// with optional parameters
val link = "campaignabc" // unique identifier of the referral trigger
val comp = "checkout" // component in the referral app
val customParam = mapOf<String, Any>("custom1" to "param1", "custom2" to "param2")

val uriOptional = ReferralAppModel(packageName, acc, aid, link, comp, customParam).getReferralUri(scheme, host)
// uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456&ref_link=campaignabc&ref_comp=checkout&custom1=param1&custom2=param2"
```

**注意:** 生成された URI は、キーと値のすべての文字が [`RFC 3986`](https://datatracker.ietf.org/doc/html/rfc3986) に従ってエンコードされていることを保証します。これは、有効な URL クエリ文字列を作成するために重要です。

#### `ReferralAppModel` クラスのパラメータ

- `packageName` - referral アプリのパッケージ名を表す必須プロパティ
- `acc` - referral アプリのアカウント識別子を表す必須プロパティ
- `aid` - referral アプリのアプリケーション識別子を表す必須プロパティ
- `link` - referral トリガーの一意の識別子を表すオプションプロパティ
- `comp` - referral アプリのコンポーネントを表すオプションプロパティ
- `customParams` - カスタムキーと値のパラメータを表すオプションプロパティ

#### `ReferralAppModel.getReferralUri()` メソッドのパラメータ

- `scheme` - URI の referred アプリのスキームを表す必須プロパティ (例: "https", "appscheme" など)。
- `host` - URI の referred アプリのホストを表す必須プロパティ (例: "rakuten.co.jp", "apphost" など)。オプションのパスコンポーネントを `host` パラメータに追加して、referred アプリが起動するコンポーネントを決定するために使用できます (例: "rakuten.co.jp/home", "appscheme/settings" など)。

v11.1.0 以降、`ReferralAppModel` の `packageName` パラメータが空文字列に設定されている場合、referral URI を生成する際に `packageName` パラメータ値としてアプリケーションのパッケージ名がデフォルトで使用されます。

例 1: `packageName` パラメータに実際のアプリのパッケージ名を渡す

```kotlin
val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
val host = "samplehost" // referred app's deeplink host
val packageName = "referral.app.package.name" // referral app's package name
val acc = 123 // referral app's RAT account ID
val aid = 456 // referral app's RAT application ID

val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
// uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"
```

例 2: `packageName` パラメータに任意の値を渡す

```kotlin
val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
val host = "samplehost" // referred app's deeplink host
val packageName = "anyValue" // any value
val acc = 123 // referral app's RAT account ID
val aid = 456 // referral app's RAT application ID

val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
// uri will result to "samplescheme://samplehost?ref=anyValue&ref_acc=123&ref_aid=456"
// "anyValue" is used as ref parameter value
```

例 3: `packageName` パラメータに空文字列を渡す

```kotlin
// when packageName is set to empty string
val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
val host = "samplehost" // referred app's deeplink host
val packageName = "" // empty string
val acc = 123 // referral app's RAT account ID
val aid = 456 // referral app's RAT application ID

val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
// uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"
// application's package name is used as ref parameter value
```

### App-to-App referral トラッキングの有効化/無効化

デフォルトでは、SDK は自動的に App-to-App referral トラッキングを行い、`pv` および `deeplink` イベントをトラッキングします。自動トラッキングは、無効化イベントリストに `_rem_applink` を追加することで無効にできます。詳細は [Automatic Event Tracking Configuration](./android-auto-tracking) セクションを参照してください。
