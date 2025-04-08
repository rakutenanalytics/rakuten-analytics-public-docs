---
sidebar_position: 3
id: ios-faq
slug: /analytics-sdk/ios/ios-faq
title: よくある質問
---

## よくある質問

### モジュールのビルドと実行

* [iOS analytics リポジトリ](https://github.com/rakutenanalytics/ios-analytics) をクローンまたはフォークします。
* リポジトリフォルダに移動します: `cd`。
* `bundle install --path vendor/bundle` を実行します。

#### ユニットテスト

* 依存関係をインストールするには、`bundle exec pod install` を実行します。
* Xcodeで `UnitTestApp.xcworkspace` を開き、ビルド/実行します。

#### App Store用アプリのビルド

Xcode 13では、アプリのバージョン番号を自動的に管理するオプションが導入されました（デフォルトで有効）。このオプションを有効にしたままアプリをエクスポートすると、Analytics SDKのフレームワークバージョントラッキング機能が動作しなくなります。

App Store用にエクスポートする際は、Xcode UIの「Manage Version and Build Number」オプションを無効にしてください。このオプションを有効のままにする場合、SDKは埋め込まれたSDK/フレームワークのバージョンを追跡できなくなることに注意してください。

### 同一プロジェクトでのRakutenAnalyticsとRAnalytics依存関係の処理

プロジェクトに `RakutenAnalytics` と `RAnalytics`（他のフレームワークの一部として）が含まれる場合、以下のような問題が発生する可能性があります:

```swift
import RakutenAnalytics
import %SomeFrameworkWithRAnalyticsDependency%

let analyticsManager = AnalyticsManager.shared() // エラー: 'shared()' の曖昧な使用
```

これは、異なるモジュールや名前空間間でクラス名が重複しているために発生します。軽微な問題に対する一時的な解決策として、すべてのフレームワーク関連の呼び出しに直接モジュール名を指定することをお勧めします。例:

```swift
import RakutenAnalytics
import %SomeFrameworkWithRAnalyticsDependency%

let analyticsManager = RakutenAnalytics.AnalyticsManager.shared() // コンパイルエラーなし。RakutenAnalyticsインスタンスを直接宣言して呼び出します。
```

ただし、このアプローチはすべてのケースで機能するわけではなく、フレームワークの使用方法に依存します。重大な問題については、`RAnalytics` 依存関係を `RakutenAnalytics` に更新するフレームワークのリリースを待つことをお勧めします。

### ページビューの自動トラッキング方法

メソッドスウィズリングを使用して、新しいビューコントローラーが表示されるたびに訪問イベントを自動的にトリガーします。ただし、以下の場合は除きます:

* ビューコントローラーが、`UINavigationController`、`UISplitViewController`、`UIPageViewController`、`UITabBarController` のいずれかである場合。
* ビューコントローラーがシステムポップアップ（`UIAlertView`、`UIActionSheet`、`UIAlertController`、`_UIPopoverView`）を表示している場合。
* ビューコントローラー、そのビュー、またはそれがアタッチされているウィンドウがAppleのプライベートクラス（名前に `_` プレフィックスがあり、システムフレームワークから提供されるクラス）のインスタンスである場合。
* ビューコントローラーがアタッチされているウィンドウのクラスが、システムフレームワークから提供される `UIWindow` のサブクラスである場合。

これらの訪問イベントはすべてのトラッカーで利用可能であり、イベントの対象となるビューコントローラーは、`RAnalyticsTracker#processEvent:state:` に渡されるイベント状態の `currentPage` プロパティに見つけることができます。

RATトラッカーはさらに、タイトル、ナビゲーションアイテムのタイトル、またはURLがないビューコントローラーを無視します。ただし、アプリケーションまたはアプリケーションに埋め込まれたフレームワークのいずれかによってサブクラス化されている場合を除きます。これにより、アプリケーション内でどのページが訪問されたかについての情報を提供しないイベント（例: `UIViewController` という名前のページを報告するイベント）がフィルタリングされます。タイトル、ナビゲーションアイテムのタイトル、またはURLを持つビューコントローラーの場合、ライブラリは `pv` イベントに `cp.title` および `cp.url` フィールドも設定します。

### RATでの検索結果のトラッキング

以下のコードは、検索ページでどの結果が表示されるかをトラッキングするために送信できるイベントの例を示しています。これは、以前の例で使用された標準の `pv` RATイベントと、いくつかの標準RATパラメータを使用します。使用されるパラメータは次のとおりです:

| RATパラメータ | 説明 |
| -------- | -------- |
| `lang` | 検索に使用される言語。 |
| `sq` | 検索語句。 |
| `oa` | すべての検索語句（AND）を要求する場合は `a`、いずれか1つ（OR）を要求する場合は `o`。 |
| `esq` | 結果から除外する語句。 |
| `genre` | 結果のカテゴリ。 |
| `tag` | タグの配列。 |

```swift
RAnalyticsRATTracker.shared().event(eventType: "pv",
parameters:["pgn": "shop_search",
"pgt": "search",
"lang": "English",
"sq": "search query",
"oa": "a",
"esq": "excluded query",
"genre": "category",
"tag": ["tag 1", "tag 2"]]).track()
```

### RATトラフィックの監視

`RAnalyticsWillUploadNotification`、`RAnalyticsUploadFailureNotification`、`RAnalyticsUploadSuccessNotification` 通知をリッスンすることで、トラッカーネットワークアクティビティを監視できます。

### 正しい統合の確認

SDKが正しく統合されている場合、ログインユーザーに送信されるRATイベントには、ユーザーのメンバー識別子を含む `easyid` フィールドが含まれます。RATに送信されたイベントを確認する方法については、[こちら](./ios-user-guide#using-kibana-to-verify-successful-integration) を参照してください。

### Core Telephony値のトラッキング: CTCarrierの非推奨

**注意:** SDKバージョン10.3.0以降、RakutenAnalyticsSDKからCTCarrier値が削除されます。[iOS 16.4 リリースノート](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-16_4-release-notes)

[CTCarrier](https://developer.apple.com/documentation/coretelephony/ctcarrier) APIを使用して以下の値をトラッキングしていました:

- `carrierName`
- `mobileCountryCode`
- `mobileNetworkCode`
- `isoCountryCode`
- `allowsVOIP`

iOS 16.4以降、`CTCarrier` は **非推奨** API となり、将来的に **置き換えなしで削除** されます。非推奨プロセスの一環として、`CTCarrier` 値は常に **空文字列** または **65535** を **デフォルト値** として返します。

`CTCarrier` は `mcn`、`mcnd`、`simopn`、`simop` 値を提供するために使用されていました。`CTCarrier` の変更に伴い、`CTCarrier` APIのサポートを終了し、AppleがこのAPIを将来のiOSアップデートで `Core Telephony` から削除した後に **削除** します。

**CTCarrier非推奨前後の `mcn`、`mcnd`、`simopn`、`simop` 値の例:**

| キー | 説明 | iOS 16.4以前の値 | iOS 16.4以降の値 |
| -------- | -------- | -------- | -------- |
| `mcn` | プライマリキャリアの名前 | `Rakuten` | `--` |
| `mcnd` | セカンダリキャリアの名前 | `Rakuten` または空文字列 | `--` |
| `simopn` | サービスプロバイダ名 | `Rakuten` | `--` |
| `simop` | SIMオペレーターコード | `44011` | `6553565535` |
