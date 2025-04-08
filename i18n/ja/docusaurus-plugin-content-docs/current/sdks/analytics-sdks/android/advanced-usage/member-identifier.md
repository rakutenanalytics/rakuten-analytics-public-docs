---
sidebar_position: 9
id: android-analytics-member-identifier
slug: /analytics-sdk/android/android-member-identifier
title: メンバー識別子の設定と削除
added_version: 7.2.0
updated_version: 9.0.0
changelog: ./android-changelog
---

## メンバー識別子の設定と削除

以下の API は、Analytics SDK にメンバー識別子 (ID SDK Compatibility モジュールから) を提供し、ログイン/ログアウトイベントを送信するために使用されます。

### メンバー識別子の設定とログインイベントの送信

ID SDK でのログインが成功した場合、ID SDK Compatibility モジュールを使用してメンバー識別子を `String` 形式で抽出し、それを `AnalyticsManager` に渡してログイン (例: "_rem_login") イベントを送信します。

```kotlin
AnalyticsManager.instance()?.setMemberIdentifier(memberIdentifier)
```

### メンバー識別子の削除とログアウトイベントの送信

ID SDK でログアウトする際、`AnalyticsManager` からメンバー識別子を削除してログアウト (例: "_rem_logout") イベントを送信します。

```kotlin
AnalyticsManager.instance()?.removeMemberIdentifier()
```

### ログイン失敗イベントの送信

ID SDK でのログインが失敗した場合、受信した `Exception` を `AnalyticsManager` に渡してログイン失敗 (例: "_rem_login_failure") イベントを送信します。

エラーメッセージはペイロードに含まれます。

```kotlin
AnalyticsManager.instance()?.setMemberError(error)
```

### メンバー識別子の安全な保存

デフォルトでは、メンバー識別子はプレーンテキストとしてデバイスに保存されます。メンバー識別子を安全に保存するには、Identity Container を使用してください。詳細については、[Identity Container](identity-store.md) を参照してください。
