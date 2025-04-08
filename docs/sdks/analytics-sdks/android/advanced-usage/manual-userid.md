---
sidebar_position: 4
id: android-analytics-manual-userid
slug: /analytics-sdk/android/android-manual-userid
title: Manual Setting of `userId`
added_version: 6.7.0
updated_version: 6.7.0
changelog: ./android-changelog
---

## Manual setting of `userId` state property

In earlier versions (v6.6.0 and below), `userId` value is internally set by receiving the encrypted easy Id broadcasted by UserSDK.

Starting v6.7.0, app can now set the `userId` manually using a public API. Any unique user identifier value can be used for this property.
* Example:
  * App retrieves the encrypted easy ID using other SDKs or REST API then set it using the `setUserId` API.
  * App can do this every time the app is launched/opened, or when new user logs in.
  * App then should set it to null when the user logs out.

```kotlin
AnalyticsManager.instance()?.setUserId("your-user-id")
```
