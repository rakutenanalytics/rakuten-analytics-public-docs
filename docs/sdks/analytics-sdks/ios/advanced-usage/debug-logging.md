---
sidebar_position: 7
id: ios-analytics-debug-logging
slug: /analytics-sdk/ios/ios-debug-logging
title: Debug Logging
added_version: 5.3.0
updated_version: 9.4.0
changelog: ./ios-changelog
---

## Configure debug logging

To configure the module's internal debug logging use `AnalyticsManager#set(loggingLevel:)`.

To set logging to debug level (and above i.e. also print info/warning/error logs) use the following function call: 

```swift
AnalyticsManager.shared().set(loggingLevel: .debug)
```

⚠️ For user privacy and app security the module will _not_ print **verbose** or **debug** logs in a release build.

By default the module will show error logs, even in a release build. To disable the module's logs completely call: 

```swift
AnalyticsManager.shared().set(loggingLevel: .none)
```

⚠️ The plist flag `RMSDKEnableDebugLogging` has been deprecated and has no effect now. You must use the above `AnalyticsManager` API function to configure logging levels.
