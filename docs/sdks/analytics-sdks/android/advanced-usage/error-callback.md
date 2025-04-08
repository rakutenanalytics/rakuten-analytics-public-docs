---
sidebar_position: 14
id: android-analytics-error-callback
slug: /analytics-sdk/android/android-error-callback
title: Error Callback
added_version: 8.1.0
updated_version: 8.1.0
changelog: ./android-changelog
---

## Error Callback

Starting v8.1.0, an optional callback function can be set for app to receive the exception details that caused internal non-fatal failures in the SDK.

```kotlin
  AnalyticsManager.setErrorCallback {
      // can be used for analytics or logging
      Log.e(TAG, it.localizedMessage, it)
  }
```
