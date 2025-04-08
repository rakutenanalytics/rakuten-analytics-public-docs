---
sidebar_position: 7
id: android-analytics-auto-tracking
slug: /analytics-sdk/android/android-auto-tracking
title: 自動イベントトラッキング
added_version: 4.1.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## 自動イベントトラッキングの設定

v7.1.0 以降、Analytics SDK によってトラッキングされる自動イベントは、ビルド時またはランタイムで有効または無効にすることができます。

### ビルド時の設定

アプリの `res/values/string.xml` に `RATDisabledEventsList` リソース名を持つ配列リソースを定義します。

配列リソースにリストされているすべてのイベント (文字列) は、SDK によってトラッキングされません。

```xml
    // サンプルリスト
    <string-array name="RATDisabledEventsList">
        <item>_rem_install</item>
        <item>_rem_update</item>
        <item>_rem_init_launch</item>
        <item>_rem_launch</item>
        <item>_rem_end_session</item>
        <item>_rem_end_session</item>
        <item>_rem_push_notify</item>
        <item>_rem_login</item>
        <item>_rem_logout</item>
        <item>_rem_visit</item>
        <item>_rem_applink</item>
        <item>_rem_discover_discoverpage_visit</item>
        <item>_rem_discover_discoverpage_tap</item>
    </string-array>
```

イベントリストについては、[Standard Event section](./android-user-guide#-standard-events) を参照してください。

### ランタイム設定

ランタイムでイベントを有効または無効にすることも可能です。

`ShouldTrackEventHandler` クラスの実装を AnalyticsManager に追加して、トラッキングイベントハンドラーを設定します。

設定されていない場合、すべてのイベントがランタイム設定で有効であると見なされます。

- ランタイムで全イベントを有効にする:

```java
AnalyticsManager.setShouldTrackEventHandler { true }
```

- ランタイムで全イベントを無効にする:

```java
AnalyticsManager.setShouldTrackEventHandler { false }
```

- ランタイムで特定のイベントを無効にする:

```java
AnalyticsManager.setShouldTrackEventHandler {
    it != Event.Name.APP_INSTALL
}
```

一部の自動イベントは、OS によってアプリが実際に作成/起動される前にトラッキングされます (例: `_rem_install`)。そのため、ランタイム設定のトラッキングイベントハンドラーは、`Application` クラスの `onCreate()` ではなく、アプリの `attachBaseContext()` で定義する必要があります。

<font color="red">注意:</font> ランタイム設定はビルド時設定を上書きします。

ビルド時設定で無効化されているイベントがランタイム設定で有効化されている場合、このイベントは Analytics SDK によってトラッキングされます。
