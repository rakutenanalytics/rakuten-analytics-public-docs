---
sidebar_position: 4
id: android-analytics-manual-userid
slug: /analytics-sdk/android/android-manual-userid
title: userId の手動設定
added_version: 6.7.0
updated_version: 6.7.0
changelog: ./android-changelog
---

## `userId` 状態プロパティの手動設定

以前のバージョン (v6.6.0 以下) では、`userId` の値は UserSDK によってブロードキャストされた暗号化された Easy ID を受信することで内部的に設定されていました。

v6.7.0 以降、アプリは公開 API を使用して `userId` を手動で設定できるようになりました。このプロパティには任意の一意のユーザー識別子値を使用できます。

- **例:**
  - アプリが他の SDK や REST API を使用して暗号化された Easy ID を取得し、それを `setUserId` API を使用して設定します。
  - アプリは、アプリが起動/開かれるたび、または新しいユーザーがログインするたびにこれを実行できます。
  - ユーザーがログアウトした場合、アプリはこれを `null` に設定する必要があります。

```kotlin
AnalyticsManager.instance()?.setUserId("your-user-id")
```
