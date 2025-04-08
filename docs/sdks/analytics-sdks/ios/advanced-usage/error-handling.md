---
sidebar_position: 6
id: ios-analytics-error-handling
slug: /analytics-sdk/ios/ios-error-handling
title: Error Handling
added_version: 9.2.0
updated_version: 9.2.0
changelog: ./ios-changelog
---

## Handling errors

The SDK will automatically raise errors if the `errorHandler` is set as below:

```swift
AnalyticsManager.shared().errorHandler = { error in
    // Example: Report the error to Crashlytics
}
```

Use it to report the SDK errors to a backend such as Crashlytics as a [non-fatal error](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=ios#log-excepts).
