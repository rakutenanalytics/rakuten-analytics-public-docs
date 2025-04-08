---
sidebar_position: 13
id: ios-analytics-app-to-app
slug: /analytics-sdk/ios/ios-app-to-app
title: アプリ間トラッキング
added_version: 8.3.0
updated_version: 10.3.0
changelog: ./ios-changelog
---

## アプリ間リファラルトラッキング

アプリ間リファラルトラッキングは、「リファラー」アプリから「リファード」アプリへのディープリンクを追跡し、ユーザーの行動を追跡することを可能にします。

注意点:

- Analytics SDKは、期待される形式であれば、リファードアプリ内の受信ディープリンクを _自動的に_ 追跡します。
- リファラーアプリで正しい形式のディープリンクを生成するには、`ReferralAppModel` ヘルパーを使用する必要があります。

### SceneDelegate

アプリがSceneDelegateを使用している場合、`App-to-App referral tracking` を機能させるには、アプリの `Info.plist` に `UIApplicationSceneManifest` 辞書内で `UISceneDelegateClassName` キーを含める必要があります:

```xml
<key>UIApplicationSceneManifest</key>
<dict>
    <key>UIApplicationSupportsMultipleScenes</key>
    <false/>
    <key>UISceneConfigurations</key>
    <dict>
        <key>UIWindowSceneSessionRoleApplication</key>
        <array>
            <dict>
                <key>UISceneDelegateClassName</key>
                <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
                ...
            </dict>
        </array>
    </dict>
</dict>
```

### リファラーアプリでのURLスキームディープリンクの作成とオープン

```swift
guard let url = ReferralAppModel().urlScheme(appScheme: "app", pathComponent: "path", ref: "any"), UIApplication.shared.canOpenURL(url) else {
    return
}
UIApplication.shared.open(url, options: [:])
```

#### パラメータ:

- `appScheme`: アプリの `Info.plist` 内の `CFBundleURLSchemes` に定義されたアプリスキーム名。
- `pathComponent`: アプリスキームに追加されるオプションのパスコンポーネント。このパラメータが `nil` または空文字列の場合、パスコンポーネントはURLに追加されません。
- `ref`: URLに含めるリファラ識別子。このパラメータが `nil` または空文字列の場合、アプリケーションバンドル識別子が追加されます。

#### 例:

```
demoapp://app?ref=any&ref_acc=123&ref_aid=456&ref_link=campaignCode&ref_comp=news&custom_param1=japan&ref_custom_param2=rome&ref_custom_param1=italy&custom_param2=tokyo
```

追跡イベント (Kibana):

```json
{
  ...
  "_source": {
    ...
    "ref": "any",
    "acc": 123,
    ...
    "etype": "deeplink",
    "aid": 456,
    ...
    "cp": {
      "custom_param1": "japan",
      "ref_type": "external",
      "ref_custom_param2": "rome",
      "custom_param2": "tokyo",
      "ref_comp": "news",
      "ref_link": "campaignCode",
      "ref_custom_param1": "italy"
    },
    ...
  },
  ...
}
```

### リファラーアプリでのユニバーサルリンクディープリンクの作成とオープン

```swift
guard let url = ReferralAppModel().universalLink(domain: "domain.com", pathComponent: "path", ref: "any"), UIApplication.shared.canOpenURL(url) else {
    return
}
UIApplication.shared.open(url, options: [:])
```

#### パラメータ:

- `domain`: ユニバーサルリンクの関連ドメイン。例: `rakuten.co.jp`。
- `pathComponent`: ドメインに追加されるオプションのパスコンポーネント。このパラメータが `nil` または空文字列の場合、パスコンポーネントはURLに追加されません。
- `ref`: URLに含めるリファラ識別子。このパラメータが `nil` または空文字列の場合、アプリケーションバンドル識別子が追加されます。

#### 例:

```
https://domain.com/path?ref=any&ref_acc=123&ref_aid=456&ref_link=campaignCode&ref_comp=news&custom_param1=japan&custom_param2=tokyo&ref_custom_param2=rome&ref_custom_param1=italy
```

追跡イベント (Kibana):

```json
{
  ...
  "_source": {
    ...
    "ref": "any",
    "acc": 123,
    ...
    "aid": 456,
    ...
    "etype": "deeplink",
    ...
    "cp": {
      "custom_param1": "japan",
      "ref_type": "external",
      "ref_custom_param2": "rome",
      "custom_param2": "tokyo",
      "ref_comp": "news",
      "ref_link": "campaignCode",
      "ref_custom_param1": "italy"
    },
    ...
  },
  ...
}
```

### Referral App Modelでのクエリ

`ReferralAppModel` のクエリプロパティは、異なるパラメータをエンコードして結合することでURLクエリ文字列を作成します。このプロパティは、HTTPリクエスト用のURLに追加するクエリ文字列を生成するのに役立ちます。

#### パラメータ

- `accountIdentifier`: アカウント識別子を表す必須プロパティ。
- `applicationIdentifier`: アプリケーション識別子を表す必須プロパティ。

#### オプションパラメータ

ディープリンクを作成する際に、以下の _オプション_ パラメータを含めることも可能です:

- `link` - リファラトリガーの一意識別子。例: `"campaign-abc123"`
- `component` - リファラーアプリ内のコンポーネント。例: `"checkout"`
- `customParameters` - キーと値のペアの `[String: String]` 辞書。例: `["custom1": "value1"]`

```swift
guard let model = ReferralAppModel(accountIdentifier: 123,
                                   applicationIdentifier: 456,
                                   link: "campaign-abc123",
                                   component: "checkout",
                                   customParameters: ["custom1": "value1"]) else {
    return
}

// create deeplink url from model using `urlScheme(appScheme:)` or `universalLink(domain:)`
```

#### 注意:

- クエリプロパティは、キーと値のすべての文字が[RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)に従ってエンコードされることを保証します。これは、有効なURLクエリ文字列を作成するために重要です。
- クエリ文字列内のパラメータの順序は、追加される順序によって決まります。

### RATに送信されるイベント

SDKは自動的に2つのイベントをRATに送信します:

- etype `pv` 訪問イベント（**リファード** アプリのRATアカウントに送信）
- etype `deeplink` イベント（**リファラー** アプリのRATアカウントに送信）
