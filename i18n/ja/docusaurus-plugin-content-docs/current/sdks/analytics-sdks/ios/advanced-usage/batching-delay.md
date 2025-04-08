---
sidebar_position: 9
id: ios-analytics-batching-delay
slug: /analytics-sdk/ios/ios-batching-delay
title: バッチング遅延
added_version: 2.10.0
updated_version: 10.1.0
changelog: ./ios-changelog
---

## トラッカーバッチング遅延の設定

トラッカーはイベントを収集し、それらをバッチでバックエンドに送信します。

バッチング遅延は設定可能な値で、デフォルトは1秒に設定されています。

⚠️ 内部テストでは、デモアプリでバッチング遅延を1秒に短縮してもバッテリー使用量に大きな影響は見られませんでした。ただし、適切なバッチング遅延を決定するために、開発者テストとQAを実施することをお勧めします。

`AnalyticsTracker#setBatchingDelay:`および`AnalyticsTracker#setBatchingDelayWithBlock:`メソッドを使用して、異なる遅延を設定できます。

### 例1: バッチング間隔を10秒に設定

```swift
RAnalyticsRATTracker.shared().set(batchingDelay: 10.0)
```

### 例2: 動的なバッチング間隔

#### - アプリ起動後最初の10秒間はバッチングなし

#### - アプリ起動後10秒から30秒の間は10秒間隔でバッチング

#### - アプリ起動後30秒以降は60秒間隔でバッチング

```swift
public class CustomClass: NSObject {

    fileprivate var startTime: TimeInterval

    override init() {
        startTime = NSDate().timeIntervalSinceReferenceDate
        super.init()
    }

    public func setup() {
        RAnalyticsRATTracker.shared().set(batchingDelayBlock: { () -> TimeInterval in
            let secondsSinceStart = NSDate().timeIntervalSinceReferenceDate - startTime

            if (secondsSinceStart < 10)
            {
                return 0
            }
            else if (secondsSinceStart < 30)
            {
                return 10
            }
            else
            {
                return 60
            }
        })
    }
}
```
