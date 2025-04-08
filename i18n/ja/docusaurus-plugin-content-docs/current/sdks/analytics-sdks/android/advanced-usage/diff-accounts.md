---
sidebar_position: 3
id: android-analytics-diff-accounts
slug: /analytics-sdk/android/android-diff-accounts
title: 異なる RAT アカウントへのイベント送信
added_version: 5.0.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## 特定のイベントを異なる RAT アカウント ID / アプリ ID に送信

イベントは、`AndroidManifest.xml` に指定された値以外の異なる RAT アカウント ID またはアプリ ID に送信することができます。イベントパラメータに代替のアカウント ID を "acc" に、アプリ ID を "aid" に設定してください。この値は、整数、long、または整数に変換可能な String である必要があります。キーの値が無効な場合、`AndroidManifest.xml` の値が代わりに使用されます。

```java
Map<String, Object> params = new HashMap<>();
params.put("acc", 123);
params.put("aid", 456);

RatTracker.instance().event("anEvent", params).track();
```
