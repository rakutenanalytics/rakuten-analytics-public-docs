---
sidebar_position: 14
id: android-analytics-error-callback
slug: /analytics-sdk/android/android-error-callback
title: エラーコールバック
added_version: 8.1.0
updated_version: 8.1.0
changelog: ./android-changelog
---

## エラーコールバック

v8.1.0 以降、SDK 内部で発生した非致命的な失敗の原因となった例外の詳細をアプリが受け取るためのオプションのコールバック関数を設定できるようになりました。

```kotlin
AnalyticsManager.setErrorCallback {
    // can be used for analytics or logging
    Log.e(TAG, it.localizedMessage, it)
}
```
