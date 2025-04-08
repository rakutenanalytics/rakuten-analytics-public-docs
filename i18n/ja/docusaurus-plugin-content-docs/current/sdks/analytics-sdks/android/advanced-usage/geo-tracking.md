---
sidebar_position: 13
id: android-analytics-geo-tracking
slug: /analytics-sdk/android/android-geo-tracking
title: 位置情報トラッキング
added_version: 2.x
updated_version: 11.1.0
changelog: ./android-changelog
---

## 位置情報トラッキング

SDK は `GeoManager` を使用して、アプリの異なる状態に基づいて位置情報イベントを積極的にトラッキングします。

`GeoManager` は、バックグラウンドまたは終了状態で使用されている場合、デバイスの位置が大きく変化した際や定期的な間隔で位置情報を更新します。詳細は [Background Location Limits documentation](https://developer.android.com/about/versions/oreo/background-location-limits#apis) を参照してください。`GeoManager` は、`RatTracker` のバッチング遅延に基づいて、キャプチャされた位置情報を定期的に送信します。

この機能を有効にするには、以下の手順を実行してください。

### 1- 位置情報権限のリクエスト

アプリが **フォアグラウンド** で使用されているときに位置情報イベントを更新するには、以下のスニペットに示すように、`ACCESS_COARSE_LOCATION` または `ACCESS_FINE_LOCATION` 権限をリクエストする必要があります。

```xml
<manifest ... >
  <!-- Always include this permission -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

  <!-- Include only if your app benefits from precise location access. -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

アプリが **バックグラウンド** で使用されているときに位置情報イベントを更新するには、アプリが Android 10 (API レベル 29) 以上をターゲットとしている場合、ランタイムでバックグラウンド位置情報アクセスをリクエストするために、アプリのマニフェストで `ACCESS_BACKGROUND_LOCATION` 権限を宣言する必要があります。Android の以前のバージョンでは、アプリがフォアグラウンド位置情報アクセスを受け取ると、自動的にバックグラウンド位置情報アクセスも受け取ります。

```xml
<manifest ... >
  <!-- Required only when requesting background location access on
       Android 10 (API level 29) and higher. -->
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>
```

### 2- 位置情報収集の開始

`GeoManager` は、デフォルトの `GeoConfiguration` を使用して位置情報イベントをトラッキングする共有シングルトンです。また、位置情報イベントをトラッキングするための希望の設定を指定することもできます。

#### デフォルト設定の使用

デフォルト設定またはカスタム設定を使用して位置情報収集プロセスを開始します。

```kotlin
val configuration = Configuration.Builder(context).build()
```

デフォルトの `Configuration` オブジェクトは、`00:00` から `23:59` までの間に、`300秒` の定期的な間隔で `.HIGH` 精度の位置情報をキャプチャします。

#### カスタム設定の使用

```kotlin
val configuration = Configuration.Builder(context)
            .setAccuracy(Accuracy.NO_POWER) // The accuracy you want to receive. The default is [Accuracy.High].
            .setStartTime(GeoTime()) // Default is 00:00
            .setEndTime(GeoTime(17u, 30u)) // Default is 23:59
            .setCollectionTimeInterval(420) // Default is 300 seconds, and the range is 60~1800 seconds.
            .build() // to create the custom configuration.
```

> **警告:** カスタム設定を作成する際、設定プロパティが指定された条件を満たさない場合、そのプロパティのデフォルト値が使用されます：
>
> 1. `accuracy` は `Accuracy` 型で指定された値である必要があります。
> 2. `startTime` は `endTime` と等しくないか、またはそれを超えない必要があります。
> 3. `collectionTimeInterval` は `60~1800` 秒の範囲内である必要があります。

`Configuration` が構築されると、それは `SharedPreference` に保存されます。次回、パラメータを変更せずに構築すると、前回作成したものと同じになります。

その後、以下のように構成を使用して位置情報収集を開始します。

```kotlin
GeoManager.instance().startLocationCollection(context, configuration)
```

### 位置情報収集の停止

進行中の位置情報収集プロセスを停止し、設定されたカスタム構成を削除します。

```kotlin
GeoManager.instance().stopLocationCollection(context)
```

### 設定の取得

位置情報収集を開始する際に設定された構成を返します。構成が設定されていない場合は `null` を返します。

```kotlin
GeoManager.instance().getConfiguration()
```

### 位置情報のリクエスト

ユーザーの現在の位置情報を一度だけ取得します。

```kotlin
// for example:
GeoManager.instance().requestLocation(context, LocationCallback({
          location -> // ...
      }, {
          exception ->  // ...
      }))

//or by using lambda function:
  //1- create your function e.g.
  fun getLocation(success: (response: Location?) -> Unit, failure: (exception: Exception?) -> Unit
    ){
        GeoManager.instance().requestLocation(context, LocationCallback (success, failure))
    }

  // 2- get the response
  getLocation({
      it?.accuracy // ...
    },{
      it?.message //...
    })
```

位置情報更新をリクエストする際、以下のようにオプションの `ActionParameters` を含めることができます。

```kotlin
val actionParameters = ActionParameters(
                actionType = "ButtonClick",
                actionLog = "Login page button click",
                actionId = "123",
                actionDuration = "3 seconds",
                additionalLog = "SSO Login")
GeoManager.instance().requestLocation(context, LocationCallback({}, {}), actionParameters)
```

### Geo Location Tracker の制限

- アプリが古いバージョンから更新された場合、Geo Location Tracker は次のスケジュールされた開始時間まで位置情報イベントのトラッキングを停止します。
- GeoTracker の構成は SharedPreferences に保存されます。ファイルが破損した場合や難読化の問題が発生した場合、SharedPreferences の構成は `null` にリセットされます。この予防措置により、デフォルト構成を使用した位置情報トラッキングが防止されます。詳細については [CONRAT-37432](https://jira.rakuten-it.com/jira/browse/CONRAT-37432) を参照してください。
