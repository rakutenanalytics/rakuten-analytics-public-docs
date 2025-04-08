---
sidebar_position: 3
id: android-analytics-faq
slug: /analytics-sdk/android/android-faq
title: よくある質問
---

## よくある質問

### Q: ステージング環境で Analytics データを使用してトラッキングをテストするにはどうすればよいですか？

[Kibana](https://confluence.rakuten-it.com/confluence/display/RAT/How+to+Check+Data+that+is+being+Sent+to+RAT) ツールは、ほぼリアルタイムで Analytics データを表示します。また、RAT の UI に似た [BI ツール](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=1640084655) を使用して統計を実行することもできます。

### Q: カスタムアカウント/アプリ ID にイベントをトラッキングするにはどうすればよいですか？

アカウントとアプリ ID を設定するには、["Getting Started" セクション](./android-user-guide#getting-started) を参照してください。

アプリを実行し、イベントトラッキングをトリガーした後、[Kibana](https://confluence.rakuten-it.com/confluence/display/RAT/How+to+Check+Data+that+is+being+Sent+to+RAT) で次のクエリを使用してアカウントとアプリ ID を検索することで設定を確認できます：`acc:MY_RAT_ACCOUNT_ID AND aid:MY_RAT_APPLICATION_ID`。

[advanced usage](./android-diff-accounts) に記載されているように、単一のイベントを異なるアカウントまたはアプリ ID に送信することもできます。

### Q: ユーザーの位置情報をトラッキングするにはどうすればよいですか？

ユーザーの位置情報をトラッキングするには、`android.permission.ACCESS_FINE_LOCATION` および/または `android.permission.ACCESS_COARSE_LOCATION` を `AndroidManifest.xml` に追加します。Android M をターゲットにする場合は、[ランタイムでの権限リクエスト](http://developer.android.com/training/permissions/requesting.html) が必要です。

利用可能な権限に応じて、SDK の動作は次のようになります：

- 権限なし → 位置情報のトラッキングなし。
- ACCESS_FINE_LOCATION → 他のアプリケーションやサービスが PASSIVE_PROVIDER を使用してリクエストした場合に受動的に位置情報をトラッキング。
- ACCESS_COARSE_LOCATION → NETWORK_PROVIDER を使用して、セルタワーや Wi-Fi アクセスポイントに基づいて位置情報をトラッキング。
- ACCESS_COARSE_LOCATION & ACCESS_FINE_LOCATION → 受動的な位置情報プロバイダーに基づいて位置情報をトラッキング。受動的な位置情報が利用できない場合や1日以上古い場合は、セルタワーと Wi-Fi 情報を確認。

位置情報のトラッキングはデフォルトで有効になっていますが、`AnalyticsManager.INSTANCE.enableLocation(false)` を使用して無効にすることができます。

### Q: Google Advertising Id のポリシー要件は何ですか？

Google の [サポートページ](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en&ref_topic=2364761) を確認してください。

### Q: プールされたリクエストが失われる状況はありますか？

通常の状況では、プールされたイベントが失われることはありません。イベントは送信が成功するまでデータベースに保存されます。データベースの最大サイズは 5000 レコードです。そのため、イベントが失われる可能性がある唯一の状況は、デバイスが長期間インターネット接続を失った場合であり、その場合、新しいイベントがドロップされ始めます。

### Q: RAT に送信された一部のイベントデータで `userId` フィールドが欠落している場合の修正方法は？

Analytics SDK がアプリケーションに後から追加された可能性があります。

Analytics SDK を含むバージョンに更新する前にユーザーがすでにログインしていた場合、User SDK によって暗号化された Easy ID は再度ブロードキャストされません。

これを修正するには、アプリで `setUserId` API を使用して `userId` を手動で設定できます。[manual setting of user ID](./android-manual-userid) を参照してください。

## ドキュメントと便利なリンク

+ [SDK Source Code](https://github.com/rakutenanalytics/android-analytics)
+ [RAT Home Page](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home)
+ [Mobile Development in Discourse](https://discourse.tech.rakuten-it.com/c/guilds/mobile-dev/)

ご質問がある場合は、[support page](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924) からお問い合わせください。
