---
sidebar_position: 10
id: ios-analytics-app-extensions
slug: /analytics-sdk/ios/ios-app-extensions
title: アプリ拡張機能
added_version: 2.13.0
updated_version: 3.1.1
changelog: ./ios-changelog
---

## アプリ拡張機能のサポート

SDKは、アプリ拡張機能ターゲット（例: Today Widget）への依存関係として追加でき、正常にコンパイルされます。SDKのAPI（例: カスタムイベントを追跡するための `track`）は、アプリ拡張機能から使用できます。

### 必要条件

アプリ拡張機能は、[RATの設定](./ios-user-guide#configuring)の要件に従う必要があります。

* **アプリ拡張機能** の info.plist に、RATの `accountId` と `applicationId` を設定する必要があります（メインアプリの info.plist に加えて）。
* 別のエンドポイントにイベントを送信するには、**アプリ拡張機能** の info.plist に `RATEndpoint` キーを設定できます。

### Kibanaでアプリ拡張機能のイベントを表示する

Kibanaでアプリ拡張機能のイベントを検索するには、アプリケーション名ではなく、**アプリ拡張機能** の名前を使用してください。
