---
sidebar_position: 2
id: ios-analytics-location-tracking
slug: /analytics-sdk/ios/ios-location-tracking
title: 位置情報トラッキング
added_version: 1.0.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## 位置情報トラッキング

> アプリは、Appleの[CoreLocationドキュメント](https://developer.apple.com/documentation/corelocation?language=objc)に示されているように、有効な理由で位置情報サービスを使用する許可を最初にリクエストする必要があります。**トラッキング以外の目的がないデバイスの位置情報の監視は、Appleによってアプリが拒否されます。**

> 位置情報更新のリクエスト方法については、[Location and Maps Programming Guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html)を参照してください。

### 最後に確認された位置情報のトラッキング

> **警告:** ユーザーがアプリへのアクセスを許可し、`shouldTrackLastKnownLocation`プロパティが`true`に設定されている場合でも、SDKはデバイスの位置情報を_積極的に_トラッキングしません。代わりに、アプリケーションによってキャプチャされた位置情報更新を受動的に監視します。

位置情報トラッキングはデフォルトで有効になっています。SDKが最後に確認された位置情報をトラッキングしないようにする場合は、`shouldTrackLastKnownLocation`を`false`に設定できます:

```swift
AnalyticsManager.shared().shouldTrackLastKnownLocation = false
```

### ジオロケーショントラッキング

SDKは`GeoManager`を使用して、位置情報サービスへのアクセスレベルに基づいてアプリの異なる状態で位置情報イベントを積極的にトラッキングします。

| 認可ステータス | アプリ状態でのトラッキング |
| :---:   | :---: |
| `notDetermined`, `restricted`, `denied` | なし |
| `authorizedAlways` | フォアグラウンド、バックグラウンド、終了状態 |
| `authorizedWhenInUse` | フォアグラウンドとバックグラウンド |

位置情報イベントをトラッキングする際、`GeoManager`はアプリがアクティブに使用されている場合、定期的な間隔で、またはデバイスの位置が大きく変化した際に位置情報をキャプチャします。

アプリがアクティブに使用されていない場合、`GeoManager`はデバイスの位置が大きく変化した場合のみ位置情報を収集します。

`GeoManager`には`GeoTracker`が含まれており、デフォルトのバッチング遅延として`60秒`ごとにキャプチャされた位置情報をスプールします。

**注意:** 開発者はXcodeの`Signing & Capabilities`で`Background Modes`の`Location Updates`を有効にする必要があります。また、ユーザーが位置情報サービスに対して`常に許可`を付与していない場合、`GeoManager`は終了状態でデバイスの位置情報をトラッキングできません。

#### 位置情報収集の開始

`GeoManager`は、位置情報イベントをトラッキングするためのデフォルトの`GeoConfiguration`を備えた共有シングルトンです。また、位置情報イベントをトラッキングするための希望する設定を指定することもできます。

デフォルト設定またはカスタム設定に基づいて位置情報収集プロセスを開始します。

##### デフォルト設定を使用

以下のようにデフォルト設定を使用して位置情報収集を開始します:

```
GeoManager.shared.startLocationCollection()
```

デフォルトの`GeoConfiguration`オブジェクトは、`00:00`から`23:59`までの間に`300秒`ごとの定期的な間隔で、または`300メートル`ごとに`.best`精度の位置情報をキャプチャします。

##### カスタム設定を使用

> **警告:** カスタム設定を作成する際、設定のプロパティが指定された範囲内に収まらない場合、そのプロパティのデフォルト値が使用されます。

**注意**:
1. `timeInterval`は`60〜1800`秒の範囲内である必要があります。
2. `distanceInterval`は`200〜500`メートルの範囲内である必要があります。
3. `accuracy`は`GeoAccuracy`タイプで指定された値である必要があります。
4. `startTime`は`endTime`と等しくないか、それを超えない必要があります。

> **警告:** タイマー間隔に基づく収集はアプリがフォアグラウンドにある場合にのみ機能します。距離に基づく収集は、ユーザーが位置情報サービスへの常時アクセスを許可している場合、アプリのすべての状態で機能します。

以下のように、`08:00`から`20:00`までの間に`300秒`ごとの定期的な間隔で、または`400メートル`ごとに`.hundredMeters`精度の位置情報をキャプチャする`GeoConfiguration`オブジェクトを作成できます:

```
let configuration = GeoConfiguration(distanceInterval: 400,
                                      timeInterval: 300,
                                      accuracy: .hundredMeters,
                                      startTime: GeoTime(hours: 8, minutes: 0),
                                      endTime: GeoTime(hours: 20, minutes: 0))
```

以下のようにカスタム設定を使用して位置情報収集を開始します:

```
GeoManager.shared.startLocationCollection(configuration: configuration)
```

- 注意: この関数はメインスレッドで呼び出す必要があります。そうでない場合、位置情報収集の開始が保証されません。

#### 位置情報収集の停止

進行中の位置情報収集プロセスを停止し、設定されたカスタム設定を削除します。

```
GeoManager.shared.stopLocationCollection()
```

- 注意: この関数はメインスレッドで呼び出す必要があります。そうでない場合、位置情報収集の停止が保証されません。

#### 設定の取得

開始された位置情報収集で設定されたカスタム設定を返します。設定がされていない場合は`nil`を返します。

```
guard let configuration = GeoManager.shared.getConfiguration() else {
    return
}
```

#### 位置情報のリクエスト

ユーザーの現在の位置情報を一度だけ取得します。

```
GeoManager.shared.requestLocation { result in
    switch result {
    case .success(let locationModel):
        // 位置情報リクエストの処理
    case .failure(let error):
        // 位置情報リクエストのエラー処理
    }
}
```

位置情報更新のリクエストには、以下のようにオプションの`GeoActionParameters`を含めることができます:

```
let actionParameters = GeoActionParameters(actionType: "ButtonClick",
                                           actionLog: "Login page button click",
                                           actionId: "123",
                                           actionDuration: "3 seconds",
                                           additionalLog: "SSO Login")
                                           
GeoManager.shared.requestLocation(actionParameters: actionParameters) { result in
    switch result {
    case .success(let locationModel):
        // 位置情報リクエストの処理
    case .failure(let error):
        // 位置情報リクエストのエラー処理
    }
}
```

- 注意: この関数はメインスレッドで呼び出す必要があります。そうでない場合、位置情報収集のリクエストが保証されません。
