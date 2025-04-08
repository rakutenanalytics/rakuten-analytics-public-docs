---
sidebar_position: 11
id: ios-analytics-custom-tracker
slug: /analytics-sdk/ios/ios-custom-tracker
title: カスタムトラッカー
added_version: 2.7.0
updated_version: 7.0.0
changelog: ./ios-changelog
---

## カスタムトラッカーの作成

カスタムトラッカーをマネージャーに追加することができます。

クラスを作成し、`AnalyticsTracker`プロトコルを実装してください。その`process(event:state:)`メソッドは、名前とパラメータを持つイベント、およびSDKによって自動生成された属性を持つ状態を受け取ります。

以下のコードサンプルにあるカスタムトラッカーは、いくつかの診断メッセージを出力するだけです。実際のカスタムトラッカーはデータをサーバーにアップロードすることになります。

```swift
public class CustomTracker: NSObject, AnalyticsTracker {

    public static let MyEventName = "customtracker.myeventname"

    public func process(event: AnalyticsManager.Event, state: AnalyticsManager.State) -> Bool {

        switch event.name {

        case AnalyticsManager.Event.Name.initialLaunch:
            print("I've just been launched!")
            return true

        case AnalyticsManager.Event.Name.login:
            print("User with tracking id '\(state.userid)' just logged in!")
            return true

        case MyEventName:
            print("Received my event!")
            return true

        // ...

        }

        // Unknown event
        return false
    }
}
```

その後、カスタムトラッカーを`RAnalyticsManager`に追加できます:

```swift
// Add CustomTracker to the manager
RAnalyticsManager.shared().add(CustomTracker())

// Tracking events can now be sent to the custom tracker
AnalyticsManager.Event(name: CustomTrackerMyEventName, parameters: nil).track()
```
