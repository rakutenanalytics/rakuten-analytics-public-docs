---
sidebar_position: 2
id: android-analytics-scheduling-strategy
slug: /analytics-sdk/android/android-scheduling-strategy
title: Scheduling Strategy
added_version: 2.x
updated_version: 11.0.0
changelog: ./android-changelog
---

## Configure the RAT Tracker Scheduling Strategy

`RATTracker` collects events and send them to the RAT backend in batches, the batching interval is  1 second by default. You can configure a different delivery strategy at runtime by extending from the `DeliveryStrategy` class and setting your custom strategy on `RATTracker`.

**Additional Info**
* When the app is sent to background, the batching interval is still measured but the interval will be reset if the App is killed. Note, however, after killing the App any saved Analytics events will be sent immediately the next time that the App is launched.
* Events will still be sent while the App is in the background if the batching interval reaches zero. However, in some cases they may not be sent from the background such as if the Android system clears the memory resources of the App. But same as above, events will be sent immediately the next time that the App is launched.
* In our internal tests ([here](https://jira.rakuten-it.com/jira/browse/SDKCF-1595) and [here](https://jira.rakuten-it.com/jira/browse/SDKCF-1883)) we noticed no significant impact on battery usage when the batching delay was reduced to 1 sec in our demo app. However you should perform your own developer testing and QA to determine the appropriate batching delay for your app.

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
