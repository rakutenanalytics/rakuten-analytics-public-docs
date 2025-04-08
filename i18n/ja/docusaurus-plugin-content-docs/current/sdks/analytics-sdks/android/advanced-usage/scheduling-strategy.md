---
sidebar_position: 2
id: android-analytics-scheduling-strategy
slug: /analytics-sdk/android/android-scheduling-strategy
title: スケジューリング戦略
added_version: 2.x
updated_version: 11.0.0
changelog: ./android-changelog
---

## RAT Tracker スケジューリング戦略の構成

`RATTracker` はイベントを収集し、それらをバッチで RAT バックエンドに送信します。バッチング間隔はデフォルトで 1 秒です。`DeliveryStrategy` クラスを拡張し、`RATTracker` にカスタム戦略を設定することで、ランタイムで異なる配信戦略を構成できます。

**追加情報**

- アプリがバックグラウンドに送られた場合でも、バッチング間隔は測定されますが、アプリが終了すると間隔はリセットされます。ただし、アプリが終了した後、保存されたアナリティクスイベントは次回アプリが起動されたときに即座に送信されます。
- バッチング間隔がゼロに達した場合、アプリがバックグラウンドにある間でもイベントは送信されます。ただし、Android システムがアプリのメモリリソースをクリアした場合など、一部のケースではバックグラウンドから送信されないことがあります。しかし、上記と同様に、イベントは次回アプリが起動されたときに即座に送信されます。
- 内部テスト ([こちら](https://jira.rakuten-it.com/jira/browse/SDKCF-1595) および [こちら](https://jira.rakuten-it.com/jira/browse/SDKCF-1883)) において、デモアプリでバッチング遅延を 1 秒に減らした場合でもバッテリー使用量に大きな影響は見られませんでした。ただし、適切なバッチング遅延を決定するために、独自の開発者テストと QA を実施する必要があります。

```java
// Example 1: Configure batching interval of 10 seconds
RatTracker.instance().getEventDelivery().setSchedulingStrategy(new SchedulingStrategy() {
      @Override public int batchingDelay() {
        return 10;
      }
    });

// Example 2: dynamic batching interval, no batching
// - no batching for the first 10 seconds after app launch
// - 10 second batching between 10 and 30 seconds after app launch
// - 60 second batching after 30 seconds after app launch
class DynamicSchedulingStrategy extends SchedulingStrategy {
  final long startTime;

  DynamicDeliveryStrategy() {
    startTime = SystemClock.elapsedRealtime();
  }

  @Override
  public int batchingDelay() {
    int secondsSinceStart = (SystemClock.elapsedRealtime() - startTime) / 1000;
    if (secondsSinceStart < 10) {
      return 0;
    } else if (secondsSinceStart < 30) {
      return 10;
    } else {
      return 60;
    }
  }
}

// NOTE: you need to declare the custom application subclass in your AndroidManifest.xml <application> tag
// see https://developer.android.com/guide/topics/manifest/application-element.html#nm
public class MyApp extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    RatTracker.instance().getEventDelivery().setSchedulingStrategy(new DynamicSchedulingStrategy());
  }
}
```
