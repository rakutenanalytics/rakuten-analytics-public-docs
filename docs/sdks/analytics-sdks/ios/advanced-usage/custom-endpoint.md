---
sidebar_position: 1
id: ios-analytics-custom-endpoint
slug: /analytics-sdk/ios/ios-custom-endpoint
title: Custom Endpoint
added_version: 3.1.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## Configure a custom endpoint

To use a custom endpoint when talking to the analytics backend add a `RATEndpoint` key to the app's info.plist and set it to the custom endpoint.

A custom endpoint can also be configured at runtime as below:

```swift
AnalyticsManager.shared().set(endpointURL: URL(string: "%custom_endpoint_url%"))
```

⚠️ The runtime endpoint you set is not persisted and is intended only for developer/QA testing.

**Note**: If you have implemenented a [custom tracker](./ios-custom-tracker) ensure that you have added your tracker to the manager before calling the set endpoint function.
