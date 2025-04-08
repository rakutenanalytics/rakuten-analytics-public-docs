---
sidebar_position: 8
id: ios-analytics-app-to-web
slug: /analytics-sdk/ios/ios-app-to-web
title: アプリからWebViewトラッキング
added_version: 5.3.0
updated_version: 9.4.0
changelog: ./ios-changelog
---

## アプリからWebトラッキング

SDKを設定して、`ra_uid` と呼ばれる特別なトラッキングクッキーを注入することができます。このクッキーにより、RATはアプリとアプリ内WebView間のイベントを追跡できます。この機能を使用すると、単一のドメインまたは複数のドメインを追跡できます。クッキーはiOS 11.0以降のバージョンでのみ注入されます。この機能はデフォルトではOFFになっています。`enableAppToWebTracking` をtrueに設定することで有効にできます。

```swift
AnalyticsManager.shared().enableAppToWebTracking = true
```

デフォルトでは、クッキーのドメインはRakutenのトップレベルドメインに設定されます。オプションで、`setWebTrackingCookieMultipleDomains(:)` メソッドを使用してトラッキングクッキーにカスタムドメインを設定することができます:

```swift
// カスタムトラッキングクッキーをドメインに設定する
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp"])

// 複数のドメインにカスタムトラッキングクッキーを設定する
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp", ".example-domain.com"])
```

`setWebTrackingCookieMultipleDomains` にはオプションの完了ハンドラーがあります。このハンドラーは編集されたトラッキング `HTTPCookie` の配列を返します。

```swift
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp", ".example-domain.com"]) { [weak self] trackingCookies in
    // 編集されたクッキーはここで [HTTPCookie] として利用可能です。要素数は渡されたドメインに依存します。
}
```

⚠️ 以前のドメイン設定API `setWebTrackingCookieDomain` は非推奨となっているため、このメソッドを使用している場合は、`setWebTrackingCookieMultipleDomains(:)` に更新することをお勧めします。

`ra_uid` クッキーで使用される2つの主要なパラメータは `ckp` と `cka` です:

- **ckp**: これは一意のデバイス識別子で、すべてのRakutenアプリケーション間でデバイスを追跡するために使用されます。
- **cka**: これは広告ID (IDFA) で、一意のユーザーリセット可能な識別子です。広告および分析目的で使用されます。IDFAが利用できない場合、デフォルト値 `00000000-0000-0000-0000-000000000000` が使用されます。

### `ra_uid` クッキー形式

クッキーは `COOKIE_FORMAT` を使用してフォーマットされます。この形式は以下のように定義されています:

```swift
COOKIE_FORMAT = "rat_uid=%s;a_uid=%s"
```

この形式では:

* `rat_uid` は `ckp` の値を取ります。
* `a_uid` は `cka` の値を取ります。

### `ra_uid` クッキー値の例

設定した各ドメインに対して、クッキーはリクエストコンテンツ内で以下のように表示されます:

```swift
// IDFAが利用可能な場合
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3Dad7ab8a4-83c8-4ae2-b31f-20b453a62621

// IDFAが利用できない場合
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3D00000000-0000-0000-0000-000000000000
```
