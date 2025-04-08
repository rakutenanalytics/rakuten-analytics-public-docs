---
sidebar_position: 1
id: android-analytics-custom-tracker
slug: /analytics-sdk/android/android-custom-tracker
title: カスタムトラッカーの作成
added_version: 4.1.0
updated_version: 4.1.0
changelog: ./android-changelog
---

## カスタムトラッカーの作成

カスタムトラッカーを追加するには、`Tracker` インターフェースを実装する必要があります。`Tracker#process(Event, MetaData)` はすべてのイベントに対して呼び出され、`Event` オブジェクトにはイベント名とパラメータが含まれ、`MetaData` オブジェクトには SDK によって自動生成された属性が含まれます。

```java
class LoggingTracker implements Tracker {

  final static String TAG = LoggingTracker.class.getSimpleName();

  @Override public boolean process(@NonNull Event event, @NonNull MetaData metaData) {
    StringBuilder sb = new StringBuilder();
    sb.append("{");
    for(String key: event.parameters.keySet()) {
      sb.append("\n\t").append(key).append(" -> ").append(event.parameters.get(key));
    }
    sb.append("\n}");
    log("Event = [%s, %s]", event.name, sb.toString());
    log("EventState = [id = %s, adId = %s, sessionId = %s]",
        metaData.userId, metaData.advertisingId, metaData.sessionId);
  }

  private void log(String format, Objects... args) {
    Log.d(TAG, String.format(format, args));
  }
}

// Add custom tracker to AnalyticsManager
AnalyticsManager.getInstance().add(new LoggingTracker());

// Tracking events is now processed by all trackers - including the LoggingTracker
Map<String, Object> params = new HashMap<>();
params.put("foo", "bar");

new AnalyticsManager.Event("myEvent", params).track();
```
