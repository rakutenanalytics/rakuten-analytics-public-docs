---
sidebar_position: 4
id: android-analytics-migration
slug: /analytics-sdk/android/android-migration
title: 移行ガイド
---

## 移行ガイド

## 移行ガイド 4.x.x -> 5.0.0

この新しいメジャーバージョンの Analytics SDK には多くの変更があります。Analytics SDK への推移的依存関係による競合を回避するために、クラスが存在する識別子と Java パッケージを変更しました。そのため、**同じアプリケーション内で Analytics v4 と v5 を並行して実行することが安全です**。以下の手順に従って、アプリを最新の状態に更新してください。

### 識別子の更新

Analytics モジュールのパッケージ名、Maven グループ ID、およびメタ識別子が変更されたため、以下の箇所で識別子を更新する必要があります。

#### ...`build.gradle` ファイル

```diff
{
-  compile 'jp.co.rakuten.sdtd:analytics:4.X.Y'
+  compile 'com.rakuten.tech.mobile.analytics:analytics:5.0.0'
// implementation instead of compile if you are using the android gradle plugin version 3 or newer
}
```

#### ...ソースファイル内の `import` 文

Android Studio の "Optimize Imports" アクションを使用できます。例：

```diff
- import jp.co.rakuten.sdtd.analytics.AnalyticsManager;
- import jp.co.rakuten.sdtd.analytics.Consumer;
- import jp.co.rakuten.sdtd.analytics.RATTracker;
- import jp.co.rakuten.sdtd.analytics.SendDataCallback;
- import jp.co.rakuten.sdtd.analytics.SendDataErrorCallback;

+ import com.rakuten.tech.mobile.analytics.AnalyticsManager;
+ import com.rakuten.tech.mobile.analytics.Consumer;
+ import com.rakuten.tech.mobile.analytics.RatTracker;
+ import com.rakuten.tech.mobile.analytics.SchedulingStrategy;
```

#### ...`AndroidManifest.xml` の `meta-data` タグ

```diff
<manifest>
  <application>
-    <meta-data  android:name="jp.co.rakuten.sdtd.analytics.RATAccountId"
+    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                 android:value="MY_RAT_ACCOUNT_ID" />
-    <meta-data  android:name="jp.co.rakuten.sdtd.analytics.RATApplicationId"
+    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATApplicationId"
                 android:value="MY_RAT_APPLICATION_ID" />
    </application>
</manifest>
```

### 公開 API の使用方法の更新

SDK の公開 API は大幅に変更され、バージョン 5 ではより簡潔でシンプルになりました。変更点は以下の表に記載されています。🚫 = 削除/存在しない、✅ = 変更なし。

#### インターフェース

| Analytics v4                                                | v5                                                                                     |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `Consumer`                                                  | ✅                                                                                     |
| `Tracker`                                                   | ✅                                                                                     |
| `AnalyticsManager.Event.Name`                               | 🚫                                                                                     |
| `AnalyticsManager.Event.Parameter`                          | 🚫                                                                                     |
| `NetworkStateMonitor.OnBackgroundDataMonitorChangeListener` | 🚫                                                                                     |
| `SendDataCallback`                                          | 🚫                                                                                     |
| `SendDataErrorCallback`                                     | 🚫                                                                                     |
| 🚫                                                         | [`EventDelivery`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/EventDelivery.kt) |

#### クラス

| Analytics v4                                                | v5                                                                                     |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `AnalyticsInitProvider`                                     | 🚫                                                                                     |
| `AnalyticsManager`                                          | ✅                                                                                     |
| `AnalyticsManager.Event`                                    | [`Event`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/Event.kt) |
| `AnalyticsManager.Event.Builder`                           | 🚫                                                                                     |
| `AnalyticsManager.Item`                                     | 🚫                                                                                     |
| `AnalyticsManager.Item.Builder`                            | 🚫                                                                                     |
| `AnalyticsManager.State`                                    | [`MetaData`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt) |
| `AppConfig`                                                | 🚫                                                                                     |
| `DeliveryStrategy`                                         | [`SchedulingStrategy`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/SchedulingStrategy.kt) |
| `DeviceUtil`                                               | 🚫                                                                                     |
| `GeoLocationInfo`                                          | 🚫                                                                                     |
| `GeoLocationManager`                                       | 🚫                                                                                     |
| `LogUtil`                                                  | 🚫                                                                                     |
| `NetworkStateMonitor`                                      | 🚫                                                                                     |
| `RATTracker`                                               | [`RatTracker`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt) |
| `StringUtility`                                            | 🚫                                                                                     |

#### 列挙型

| Analytics v4                                                | v5                                                                                     |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `AnalyticsManager.State.LoginMethod`                       | [`MetaData.LoginMethod`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt) |
| `AnalyticsManager.State.LogoutMethod`                      | [`MetaData.LogoutMethod`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt) |
| 🚫                                                         | [`RatEnvironment`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatEnvironment.kt) |

#### `AnalyticsManager` と `RatTracker` の変更点

| Analytics v4                                                | v5                                                                                     |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `AnalyticsManager#INSTANCE`                                | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/AnalyticsManager.kt">`AnalyticsManager#instance()`</a> |
| `AnalyticsManager#initialize(Context)`                     | 🚫                                                                                     |
| `AnalyticsManager#initialize(Context, RequestQueue)`       | 🚫                                                                                     |
| `AnalyticsManager#setCallbacks(SendDataCallback, SendDataErrorCallback)` | 🚫                                                                                     |
| `AnalyticsManager#setAccountId(long)`                      | 🚫 use `meta-data`                                                                     |
| `AnalyticsManager#setApplicationId()long`                  | 🚫 use `meta-data`                                                                     |
| `AnalyticsManager#trackAdvertisingIdentifier(boolean)`     | 🚫 use `meta-data` or <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#trackAdvertisingIdentifier(boolean)`</a> |
| `AnalyticsManager#setStaging(boolean)`                     | 🚫 use `meta-data`                                                                     |
| `AnalyticsManager#add(Tracker)`                            | ✅                                                                                     |
| `AnalyticsManager#enableLocation(boolean)`                 | ✅                                                                                     |
| `RATTracker#INSTANCE`                                      | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#instance()`</a> |
| `RATTracker#event(String, Map<String, Object>)`            | ✅                                                                                     |
| `RATTracker#getAppId()`                                    | 🚫                                                                                     |
| `RATTracker#getGuid()`                                     | ✅                                                                                     |
| `RATTracker#getRpCookie(Consumer<HttpCookie>)`             | ✅                                                                                     |
| `RATTracker#initialize(Context, RequestQueue)`             | 🚫                                                                                     |
| `RATTracker#process(Event, State)`                         | ✅                                                                                     |
| `RATTracker#setApplicationtId(long)`                       | 🚫                                                                                     |
| `RATTracker#setDeliveryStrategy(DeliveryStrategy)`         | use <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#getEventDelivery()`</a> and <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/EventDelivery.kt">`EventDelivery#setSchedulingStrategy()`</a> |
| 🚫                                                         | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#trackAdvertisingIdentifier`</a> |
| 🚫                                                         | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#getEventDelivery()`</a> |

## Migration Guide 7.x.x/8.x.x -> 9.x.x

### AnalyticsManager.instance() API の変更

v9.0.0 以降、`AnalyticsManager.instance()` API は、SDK が初期化されていない場合に `SdkNotInitializedException` 例外をスローする代わりに `null` を返すようになりました。

* SDK は次回のアプリ起動時に再初期化されます。

すべての `AnalyticsManager.instance()` API へのアクセスには null チェックを追加する必要があります。

#### 例

**変更前:**

```kotlin
AnalyticsManager.instance().enableLocation(true)
AnalyticsManager.instance().getRpCookie(...)
```

**変更後:**

```kotlin
AnalyticsManager.instance()?.enableLocation(true)
AnalyticsManager.instance()?.getRpCookie(...)
```

### メンバー識別子 API の変更

v9.0.0 以降、メンバー識別子の設定と削除は `AnalyticsManager` クラスによって処理されるようになりました。

#### 例

**変更前:**

```kotlin
RatIdToken.setMemberIdentifier(memberIdentifier) // メンバー識別子を設定し、ログインイベントを送信。
...
RatIdToken.removeMemberIdentifier() // メンバー識別子を削除し、ログアウトイベントを送信。
...
RatIdToken.setMemberError(error) // ログイン失敗イベントを送信。
```

**変更後:**

```kotlin
AnalyticsManager.instance()?.setMemberIdentifier(memberIdentifier) // メンバー識別子を設定し、ログインイベントを送信。
...
AnalyticsManager.instance()?.removeMemberIdentifier() // メンバー識別子を削除し、ログアウトイベントを送信。
...
AnalyticsManager.instance()?.setMemberError(error) // ログイン失敗イベントを送信。
```

### Push SDK イベントトラッキング (Push SDK v9.11.0 に移行)

v9.3.0 以降、すべての rem push イベント `_rem_push_notify` `_rem_push_received` `_rem_push_auto_register` `_rem_push_auto_unregister` `_rem_push_cv` のトラッキングメカニズムは Push SDK に移行しました。

Push 通知のイベントをトラッキングするには、アプリに Push SDK バージョン >= 9.11.0 を使用してください：

https://github.com/rakuten-mag/android-push.git

<font color="red">注意:</font> RAT SDK v9.3.0 をアプリで使用する場合、Push SDK のバージョンを 9.11.0 にアップグレードする必要があります。そうしないと、Push イベントトラッキングは機能しません。

## Migration Guide 10.x.x -> 11.x.x

v11.0.0 以降、以下の User SDK ログインイベントの自動トラッキングが無効になりました：

* `_rem_login` イベント。
* `_rem_logout` イベント。
* ユーザーがログインしている場合のすべてのイベントペイロードの `userid` パラメータ。

アプリケーションでイベントトラッキングを有効にするには、以下の手順に従ってください：

#### 1. アプリの `build.gradle` ファイルに `LocalBroadcastManager` を追加します。

```groovy
implementation 'androidx.localbroadcastmanager:localbroadcastmanager:1.1.0'
```

#### 2. `Application` クラスの `onCreate()` メソッドで `SDKBroadcastReceiver` を初期化して登録します。

```kotlin
import android.app.Application
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.rakuten.tech.mobile.analytics.SdkBroadcastReceiver

class MyApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        
        SdkBroadcastReceiver.getInstance().apply {
            LocalBroadcastManager.getInstance(this@MyApplication)
                .registerReceiver(this, sdkIntentFilter)
        }
    }
}
```

詳細については、以下のドキュメントを参照してください：

* [Discontinued automatic tracking of User SDK login events on v11.0.0](https://confluence.rakuten-it.com/confluence/display/RAT/Analytics+SDK%3A+%5BAndroid%5D+Discontinued+automatic+tracking+of+User+SDK+login+events+on+v11.0.0)
* サンプルアプリリポジトリ: [android-user-sdk-login-sample](https://ghe.rakuten-it.com/rakutenanalytics/android-user-sdk-login-sample)

## Migration Guide 9.x.x -> 10.x.x

### Maven パッケージリポジトリの移行

v10.1.0 以降、Analytics SDK Maven コンポーネントのリポジトリが変更されました。そのため、`build.gradle` ファイルのリポジトリ URL を以下のように更新する必要があります：

プロジェクトレベルで、リポジトリに Maven Central を追加します：

```groovy
repositories{
    ...
    mavenCentral()
    ...
}
```

アプリモジュールの `build.gradle` ファイルで、プロジェクトの依存関係を以下のように更新して、Analytics SDK の新しいバージョンを使用します：

```groovy
dependencies{
    ...
    // 'com.rakuten.tech.mobile.analytics:analytics:...' を新しいグループ ID、アーティファクト ID に置き換えます：
    // 1- これを削除
    implementation "com.rakuten.tech.mobile.analytics:analytics:OLD_VERSION"
    // 2 - これを追加
    implementation "io.github.rakutenanalytics:analytics:10.1.0"
}
```

### 問題の処理

Analytics SDK バージョン 10.1.0 以降を使用しており、Analytics SDK バージョン 10.0.1 より古いバージョンに厳密に依存している他の SDK を使用している場合、Maven パッケージリポジトリの移行によりビルド時の問題が発生する可能性があります。

この問題を解決するには、以下の例のように、実装している SDK から Analytics SDK `com.rakuten.tech.mobile.analytics` の古いバージョンを除外する必要があります：

```groovy
implementation "io.github.rakutenanalytics:analytics:10.1.0"
implementation ('com.rakuten.tech.mobile.mysdk:mysdk:${version}'){
    exclude group: 'com.rakuten.tech.mobile.analytics', module:'analytics-core'
}
```

Analytics バージョン 10.0.x から 10.1.x への公開 API に大きな変更はありません。10.1.x バージョンのバグ修正と改善の詳細については、[Changelog](./android-changelog) セクションを参照してください。

## 廃止された API の削除

10.0.0 以降、以下の廃止された API が削除されました。新しい API に注意してください。

1. `AnalyticsManager.getRpCookie(callback: RpCookieConsumer, fetchError: RpCookieErrorListener?)`
2. `AnalyticsManager.enablePageViewTracking(trackPageViews: Boolean)`
3. `AnalyticsManager.setShouldTrackEventHandler(handler: ShouldTrackEventHandler?)`

**変更前:**

```kotlin
AnalyticsManager.instance()?.getRpCookie(callback: RpCookieConsumer, fetchError: RpCookieErrorListener?)

AnalyticsManager.setShouldTrackEventHandler(handler: ShouldTrackEventHandler?)

AnalyticsManager.instance()?.enablePageViewTracking(trackPageViews: Boolean)
```

**変更後:**

```kotlin
AnalyticsManager.instance()?.getRpCookie(callback: (value: HttpCookie?) -> Unit, fetchError: ((exception: Exception?) -> Unit)?)

AnalyticsManager.setShouldTrackEventHandler(handler: (eventName: String) -> Boolean)

//enablePageViewTracking uses setShouldTrackEventHandler(ShouldTrackEventHandler) instead
```
