---
sidebar_position: 8
id: android-analytics-duplicate-events
slug: /analytics-sdk/android/android-duplicate-events
title: 複数アカウントへのイベント複製
added_version: 7.3.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## 複数の RAT アカウント間でのイベント複製

RAT Tracker は、イベントを複数の RAT アカウントにミラーリングするように構成できます。一度設定すると、SDK は、[アプリの `AndroidManifest.xml`](./android-user-guide#2-configure-rat-tracker-in-your-apps-androidmanifestxml) に定義された元の accountId と applicationId に送信されるすべてのイベントを、追加された重複アカウントにも自動的に複製します。

### ビルド時の設定

アプリのアセットフォルダ `assets/rakuten-analytics.json` に `rakuten-analytics.json` ファイルを作成し、RAT 重複アカウントリストを記述します。アカウントオブジェクトには、RAT アカウント識別子と RAT アプリ識別子の名前と値のペア、および特定のイベントのトラッキングを無効にするためのオプションの RAT 非複製イベント配列が含まれます。

```json
{
  "ratDuplicateAccounts": [
    {
      "ratAccountIdentifier":199,
      "ratAppIdentifier":2,
      "ratNonDuplicatedEventsList":[]
    },
    {
      "ratAccountIdentifier":200,
      "ratAppIdentifier":1,
      "ratNonDuplicatedEventsList":[
        "_rem_init_launch"
      ]
    }
  ]
}
```

### ランタイム設定

ランタイムでセカンダリアカウントを追加することもできます。カスタムイベントはランタイムで宣言されたアカウントにミラーリングされます。この場合、ビルド時の `ratNonDuplicatedEventsList` は無視されます。

⚠️ メインアカウントで無効化されているイベントは複製されません。

```java
RatTracker.instance().addDuplicateAccount(myRATACC2, myRATAID2)
RatTracker.instance().addDuplicateAccount(myRATACC3, myRATAID3)
```

ランタイムでイベントを無効化する:

```java
RATTracker.shouldDuplicateRATEventHandler { eventName, duplicateAccountId ->
  eventName != "_rem_end_session" && duplicateAccountId == 999
}
```
