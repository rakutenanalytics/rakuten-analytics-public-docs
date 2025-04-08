---
sidebar_position: 6
id: android-analytics-rpcookie-callback
slug: /analytics-sdk/android/android-rpcookie-callback
title: Rp Cookie Callbacks
added_version: 4.9.0
updated_version: 11.1.0
changelog: ./android-changelog
---

## UI changes in `AnalyticsManager#getRpCookie()` callbacks

In v6.7.0, Analytics SDK replaced Volley network client with OkHttp. Because of this change, success and error callbacks are called on a background (non-UI) thread.

If UI changes are done inside these callbacks, please execute UI changes inside `runOnUiThread{}` or `Handler(Looper.getMainLooper()).post{}` to avoid exceptions.

```kotlin
AnalyticsManager.instance()?.getRpCookie({
  context.runOnUiThread(() -> {
    // execute some UI changes
  })
}, {
  new Handler(Looper.getMainLooper()).post(() -> {
    // execute some UI changes
  })
})
```
