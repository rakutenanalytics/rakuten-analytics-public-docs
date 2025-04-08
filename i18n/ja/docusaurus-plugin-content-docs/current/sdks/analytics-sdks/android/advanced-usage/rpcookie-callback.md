---
sidebar_position: 6
id: android-analytics-rpcookie-callback
slug: /analytics-sdk/android/android-rpcookie-callback
title: Rp Cookie コールバック
added_version: 4.9.0
updated_version: 11.1.0
changelog: ./android-changelog
---

## `AnalyticsManager#getRpCookie()` コールバックでの UI 変更

v6.7.0 では、Analytics SDK が Volley ネットワーククライアントを OkHttp に置き換えました。この変更により、成功およびエラーのコールバックはバックグラウンド (非 UI) スレッドで呼び出されるようになりました。

これらのコールバック内で UI の変更を行う場合、例外を回避するために `runOnUiThread{}` または `Handler(Looper.getMainLooper()).post{}` 内で UI の変更を実行してください。

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
