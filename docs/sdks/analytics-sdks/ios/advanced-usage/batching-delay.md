---
sidebar_position: 9
id: ios-analytics-batching-delay
slug: /analytics-sdk/ios/ios-batching-delay
title: Batching Delay
added_version: 2.10.0
updated_version: 10.1.0
changelog: ./ios-changelog
---

## Configure the tracker batching delay

A tracker collects events and sends them to a backend in batches.

The batching delay is a configurable value with default set to 1 second.

⚠️ In our internal testing, we noticed no significant impact on battery usage when the batching delay was reduced to 1 sec in our demo app. However you should perform your own developer testing and QA to determine the appropriate batching delay for your app.

You can configure a different delay with the `AnalyticsTracker#setBatchingDelay:` and `AnalyticsTracker#setBatchingDelayWithBlock:` methods.

### Example 1: Configure batching interval of 10 seconds

```swift
RAnalyticsRATTracker.shared().set(batchingDelay: 10.0)
```

### Example 2: Dynamic batching interval

#### - no batching for the first 10 seconds after app launch

#### - 10 second batching between 10 and 30 seconds after app launch

#### - 60 second batching after 30 seconds after app launch

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
