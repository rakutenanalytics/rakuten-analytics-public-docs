---
sidebar_position: 1
id: android-user-guide
slug: /analytics-sdk/android/android-user-guide
title: ユーザーガイド
---

## Android Analytics ユーザーガイド

Analytics モジュールは、アプリケーションがユーザーのアクティビティを記録し、トラッキングイベントを [Rakuten Analytics Tracker](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home) に自動的に送信できるようにします。

## 必要条件

### 対応 Android バージョン

この SDK は Android API レベル 26 (Oreo) 以上をサポートしています。

### RAT 資格情報

[Rakuten Analytics Tracker](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home) を使用してイベントをトラッキングするには、アカウント ID と RAT エンドポイント (PROD または STG) が必要です。これらの資格情報は、RAT サイトの [フォーム](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=5574865556) から申請してください。

ご質問がある場合は、[support page](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924) からお問い合わせください。

## はじめに

サポートをより良くするために、[問い合わせ](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924) を作成する *前に* 以下を実行してください：

- DLM `dev-rat-data-collection` に git ソースリポジトリへのアクセスを許可し、問い合わせチケットにリポジトリ URL を含めてください。
- 可能であれば、DLM `dev-rat-data-collection` のメンバーに Firebase Crashlytics などのクラッシュレポートダッシュボードへのアクセスも許可してください。

### #1 アプリの `build.gradle` に依存関係を追加

```groovy
repositories {
    mavenCentral()
}

dependency {
  implementation 'io.github.rakutenanalytics:analytics:${version}'
}
```

* Analytics SDK バージョン v10.1.0 より古いバージョンを使用する場合は、[Maven package repository migration](./android-migration#-maven-package-repository-migration) を参照してください。

### #2 アプリの `AndroidManifest.xml` に RAT Tracker を設定

```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                android:value="MY_RAT_ACCOUNT_ID" />
  </application>
</manifest>
```

### #3 イベントをトラッキング

```java
// Create Map for Parameters
Map<String, Object> params = new HashMap<>();
params.put("foo", "bar");

// Create event track it
RatTracker.event("click", params).track();
```

🎉

これで最初のイベントを RAT にトラッキングしました！[RAT's kibana](http://grp01.kibana.geap.intra.rakuten-it.com/) にアクセスして確認してください。ステージング環境を使用している場合は、[STG kibana](https://rat.intra.rakuten-it.com/stg-kibana/) を使用してください。

Kibana でログを検索するには、アカウント ID (`acc`)、アプリ ID (`aid`)、またはイベントタイプ (`etype`) を使用して次のようなクエリを実行します：`acc:MY_RAT_ACCOUNT_ID AND aid:MY_RAT_APPLICATION_ID AND etype:_rem_launch`。

## 次のステップ

### トラッキングの仕組み

Analytics SDK は、イベント、トラッカー、`AnalyticsManager` の 3 つのコアコンセプトを中心に構成されています。

- Event: トラッキングしたいデータ。
- AnalyticsManager: トラッカーを管理し、メタデータを生成し、イベントをトラッカーに配信。
- Trackers: イベントを消費するもの。例: `RatTracker` はイベントを RAT に送信。

`RATTracker` は自動的に登録され、[Rakuten Analytics Tracker (RAT)](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home) と連携します。`RatTracker#event(String, Map<String, Object>)` を使用して RAT をターゲットとする RAT イベントを作成できます（他のトラッカーもこれらのイベントを受信可能）。

以下のスニペットは、これらの異なるコンポーネントがどのように連携するかを示しています：

```java
// Create an event
Map<String, Object> params = new HashMap<>();
params.put("foo", "bar");
Event event = new Event("click", params);

// track an event
event.track(); // -> passed to all trackers, but RatTracker does not send it to RAT

// RAT tracker will only send events created via RatTracker#event(Map<String, Object>)
// Create & track an event for RAT
Event ratEvent = RatTracker.event("click", params);
ratEvent.track(); // -> passed to all trackers and RatTracker sends it to RAT

// Add a new tracker
Tracker loggingTracker = (Event event, MetaData metaData) -> {
    Log.d("TrackerLog", event.name);
    return false;
};
AnalyticsManager.add(loggingTracker);

// track events again
event.track(); // -> logged by loggingTracker, but RatTracker does not send it to RAT
ratEvent.track(); // -> logged by loggingTracker and RatTracker sends it to RAT
```

### 設定

Analytics SDK は、マニフェストのメタデータを介して構成されます。構成可能な値は以下の通りです：

| Field                                   | Datatype | Manifest Key                                           | Optional | Default                     |
|----------------------------------------|----------|-------------------------------------------------------|----------|-----------------------------|
| RAT account ID                         | integer  | `com.rakuten.tech.mobile.analytics.RATAccountId`      | ❌        | 🚫                          |
| RAT application ID                     | integer  | `com.rakuten.tech.mobile.analytics.RATApplicationId`  | ✅        | 1                           |
| RAT API Base URL                       | String   | `com.rakuten.tech.mobile.analytics.RATEndpoint`       | ✅        | `https://rat.rakuten.co.jp/`|
| Track Advertising ID                   | boolean  | `com.rakuten.tech.mobile.analytics.TrackAdvertisingId`| ✅        | `true`                      |
| Track Location                         | boolean  | `com.rakuten.tech.mobile.analytics.EnableLocation`    | ✅        | `true`                      |
| Track `mno` Parameters                 | boolean  | `com.rakuten.tech.mobile.analytics.TrackMnoParams`    | ✅        | `false`                     |
| Enable Debug Log                       | boolean  | `com.rakuten.tech.mobile.analytics.EnableDebugLog`    | ✅        | `false`                     |
| Disable sending RAT cookies to non-RAT domains | boolean  | `com.rakuten.tech.mobile.analytics.SetRatCookiesGlobally` | ✅        | `true`                      |
| Enable App to WebView Tracking         | boolean  | `com.rakuten.tech.mobile.analytics.EnableWebTracking` | ✅        | `false`                     |
| Enable the App user-agent setting into a WebView | boolean  | `com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled` | ✅ | `true` |

STG RAT にデータを送信する場合は、以下の完全な例に示すように、`com.rakuten.tech.mobile.analytics.RATEndpoint` の値としてステージングエンドポイントを使用してください。

[RAT Credentials](./android-user-guide#rat-credentials) を参照してエンドポイントを取得してください。

#### 完全な例

```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                android:value="MY_RAT_ACCOUNT_ID" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATApplicationId"
                android:value="MY_RAT_APPLICATION_ID" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATEndpoint"
                android:value="MY_RAT_STG_ENDPOINT" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.TrackAdvertisingId"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableLocation"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableDebugLog"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.SetRatCookiesGlobally"
                android:value="false"/>
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableWebTracking"
                android:value="true" />
  </application>
</manifest>
```

#### Location Tracking

SDK は、他のアプリケーションやサービスがリクエストした場合に受動的に位置情報を受信するか、ネットワーク (Wi-Fi/セルタワー) の位置情報をトラッキングできます。位置情報はすべてのトラッカーに送信されます。位置情報トラッキングを有効にするには、トラッキングしたい権限をリクエストする必要があります (Android M 以降ではランタイムでこれらの権限をリクエストする必要があります。詳細は [公式開発者ドキュメント](http://developer.android.com/training/permissions/requesting.html) を参照してください)。例：

```xml
<manifest>
  <!-- track location (optional) -->
  <!-- fine location will request passively locations -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <!-- coarse location will request locations from wifi and cell towers -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
</manifest>
```

位置情報を完全に無効にするには、マニフェストメタデータから設定を削除します (例: 他の機能のために位置情報権限を使用したいが、SDK が更新を登録しないようにしたい場合)。

```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableLocation"
                android:value="false" />
  </application>
</manifest>
```

> **警告:** SDK は、ユーザーがアプリへのアクセスを許可し、位置情報トラッキングが有効になっている場合でも、デバイスの位置情報を _積極的に_ トラッキングしません。代わりに、アプリケーションによってキャプチャされた位置情報の更新を受動的に監視します。

> デバイスの位置情報を _積極的に_ トラッキングするには、[Geo Location Tracking](./android-geo-tracking) セクションを参照してください。

#### <a name="mobile-network-parameters"></a> Mobile Network Automatic Parameters

SDK は、送信するすべてのイベントに対して、モバイルキャリアネットワーク `mcn` とモバイルネットワークタイプ `mnetw` のパラメータを追加します。

Android N 以降では、デュアル SIM 機能のためにモバイルキャリアネットワーク `mcnd` とモバイルネットワークタイプ `mnetwd` のパラメータもトラッキングできます。

この機能を有効にするには、ランタイムで READ_PHONE_STATE 権限をリクエストする必要があります (詳細は [公式開発者ドキュメント](http://developer.android.com/training/permissions/requesting.html) を参照してください)。例：

```xml
<manifest>
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
</manifest>
```

詳細については、[Automatic Parameters](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticParameters) を参照してください。

#### <a name="mno-parameters"></a> `mno` Parameters

SDK は、セル情報や信号強度などの詳細なモバイルネットワーク関連情報をトラッキングできます。`mno` ネットワークトラッキングはデフォルトで無効になっています。

この機能を有効にするには、

1. マニフェストメタデータを設定します。

```xml
<manifest>
  <application>
    <meta-data android:name="com.rakuten.tech.mobile.analytics.TrackMnoParams"
               android:value="true" />
  </application>
</manifest>
```

2. ランタイムで Phone と Location 権限をリクエストします (詳細は [公式開発者ドキュメント](http://developer.android.com/training/permissions/requesting.html) を参照してください)。例：

```xml
<manifest>
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

詳細については、[Automatic Parameters](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticParameters) を参照してください。

## <a name="standard-Events"></a> 標準イベント

SDK は、特定のアクションに対して Rakuten Analytics Tracker にイベントを自動的に送信します。これらのイベントのイベントタイプパラメータはすべて `_rem_` で始まります。

例：

| Event Name            | Event Description                                      |
|-----------------------|-------------------------------------------------------|
| `_rem_init_launch`    | アプリケーションが初めて起動された。                   |
| `_rem_launch`         | アプリケーションが起動された。                         |
| `_rem_end_session`    | アプリケーションがバックグラウンドに移行した。         |
| `_rem_update`         | アプリケーションが起動され、バージョン番号が前回の起動時と一致しない。 |
| `_rem_login`          | ユーザーが正常にログインした。                         |
| `_rem_logout`         | ユーザーがログアウトした。                             |
| `_rem_install`        | アプリケーションバージョンが初めて起動された。         |

完全なリストについては、[SDK Standard Event Spec](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticsEvents) を参照してください。

### 対応 SDK バージョン

他の SDK モジュールの自動イベントトラッキングは、以下のバージョンでサポートされています：

| SDK module            | Support since version |
|-----------------------|-----------------------|
| User SDK              | v4.1.1               |
| Push SDK              | v3.1.1               |
| Device Information    | v2.0.1               |
| Discover SDK          | v3.2.0               |
| Feedback SDK          | v2.0.3               |
| Ping SDK              | v3.0.1               |
| Points SDK            | v2.1.1               |
| InAppMessaging SDK    | v6.0.0               |

#### 自動生成される状態属性

SDK は、アプリとデバイスの状態に関する特定の属性を生成します。これらの属性は自動的に生成され、すべてのトラッカー (`RATTracker` を含む) に送信されます。これらは `MetaData` オブジェクトとして `Tracker#process(Event, MetaData)` のすべての呼び出しに渡されるため、[カスタムトラッカー](./android-custom-tracker) でもアクセスできます。

| State Property        | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `userId`              | 現在ログインしているユーザーを一意に識別する文字列。v6.7.0 以降、このプロパティは `AnalyticsManager#setUserId` API を使用してアプリケーションで手動設定可能。 |
| `loggedIn`            | ユーザーの現在のログイン状態を表すブール値。                                                 |
| `advertisingId`       | Google Advertising Identifier。                                                             |
| `sessionId`           | グローバルに一意の文字列。新しいセッションが開始されるたびに更新される。                     |
| `sessionStart`        | 新しいセッションが開始された日時。                                                           |
| `deviceId`            | すべての Rakuten アプリケーションで現在のデバイスを一意に識別するグローバルな文字列。         |
| `lastKnownLocation`   | デバイスの最後に知られている位置情報。                                                       |
| `currentVersion`      | 現在のアプリバージョン。                                                                     |
| `lastVersion`         | アプリが最後に実行されたときのバージョン。                                                   |
| `lastVersionLaunches` | 最後に実行されたバージョンが起動された回数。                                                 |
| `initialLaunch`       | アプリケーションが初めて起動された日時。                                                     |
| `lastLaunch`          | 現在の実行前にアプリケーションが最後に起動された日時。                                       |
| `lastUpdate`          | 最後に実行されたバージョンが初めて起動された日時。                                           |

## <a name="rat-Examples"></a> RAT の例

すべての RAT Analytics イベントは、[Kibana](http://grp01.kibana.geap.intra.rakuten-it.com/) (または [Kibana STG](http://grp01.kibana.geap.intra.rakuten-it.com/stg-kibana/)) でリアルタイムに確認できます。アプリのすべての Analytics データを見つけるには、アカウント ID とアプリケーション ID を検索し、`acc:477 and aid:999` のような検索を使用します。特定のイベントタイプ (例: [standard events](./android-user-guide#-standard-events)) のデータを見つけるには、検索クエリに `etype` を追加します。例：`aid:999 AND etype:_rem_launch`。Kibana のデータ保持期間は非常に短いことに注意してください。

RAT には特定のユースケースに特化したパラメータがあります。例: 購入データやショッピングカートデータのトラッキング、ページトラッキングなど。これらのパラメータは [RAT Parameter Specifications](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Parameter+Specifications) に記載されています。以下は、RAT 固有のパラメータを使用したさまざまなユースケースの例です：

#### Page Tracking

```java
Map<String, Object> params = new HashMap<>();
params.put("pgn", "Main"); // page name
params.put("target", "search_btn"); // Element clicked
params.put("gol", "Improve marketing effectiveness"); // Goal Id - Goals are specific strategies you'll leverage to accomplish your business objectives.

RATTracker.event("click", params).track();
```

#### Purchase Data Tracking

```java
String[] arrayOfItemIds = {"shopid/item_1_id", "shopid/item_2_id"};
String[] arrayOfItemGenres = {"item 1 genre", "item 2 genre"};
int[] arrayOfItemQuantities = {1, 3};
float[] arrayOfItemPrices = {50.9f, 3.3f};

Map<String, String> variationColor = new HashMap<>();
variationColor.put("color", "red");

Map<String, String> variationSize = new HashMap<>();
variationSize.put("size", "s");

List<Map> variationsList = new ArrayList<>();
variationsList.add(variationColor);
variationsList.add(variationSize);

interface CheckoutStage {
  int LOGIN = 10;
  int SHIPPING_DETAILS = 20;
  int SUMMARY = 30;
  int PAYMENT = 40;
  int VERIFICATION = 50;    
}

Map<String, Object> params = new HashMap<>();
params.put("pgn", "checkout");                  // Page Name
params.put("pgt", "cart_checkout");             // Page Type
params.put("cycode", "JPY");                    // Currency Code - must be three characters
params.put("chkout", CheckoutStage.PAYMENT);    // Checkout Stage - must be the value 10, 20, 30, 40, or 50
params.put("cntln", "fr_CA");                   // Content Language
params.put("itemid", arrayOfItemIds);           // Item IDs in the form "shopid/itemID"
params.put("igenre", arrayOfItemGenres);        // Genre for each item
params.put("ni", arrayOfItemQuantities);        // Quantity of Items for each item
params.put("price", arrayOfItemPrices);         // Price for each item
params.put("variation", variationsList);        // Variations of the items

RATTracker.event("pv", params).track();
```

#### Search Results

```java
Map<String, Object> params = new HashMap<>();
params.put("pgn", "shop_search");                       // Page Name
params.put("pgt", "search");                            // Page Type
params.put("lang", "English");                          // Search selected language
params.put("sq", "really cool shoes");                  // Search Query
params.put("oa", "a");                                  // Search method - "a" for AND - "o" for OR
params.put("esq", "lame shoes");                        // Excluded search query
params.put("genre", "shoes");                           // Genre or category
params.put("tag", new String[] {"tag 1", "tag 2"});     // An array of tags

RATTracker.event("pv", params).track();
```

#### Custom Events

RAT にカスタムイベントを送信するには、新しい (未使用の) イベントタイプを選択し、カスタムパラメータ (例: [RAT Parameter Specifications](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Parameter+Specifications) に記載されていないパラメータ) をフラットな JSON オブジェクトとして `cp` パラメータに渡します。`cp` はネストされた JSON オブジェクトをサポートしていないため、より構造化されたデータを送信する場合は、自分で文字列にシリアライズする必要があります。

```java
Map<String, Object> params = new HashMap<>();
params.put("cp", new JSONObject()       // Custom Parameters
                        .put("custom_param", "value")
                        .put("custom_param_2", "value"));

RATTracker.event("custom_event", params).track();
```
