---
sidebar_position: 14
id: ios-analytics-database-path
slug: /analytics-sdk/ios/ios-database-path
title: データベースディレクトリパス
added_version: 9.0.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## データベースディレクトリパスの設定方法

アプリの`Info.plist`でデータベースディレクトリパスを変更することが可能です。

デフォルトではデータベースディレクトリパスは`Documents`に設定されています。データベースファイルを`Library/Application Support`に保存することも可能です:

- `Library/Application Support`ストレージを有効にする:

```xml
<key>RATStoreDatabaseInApplicationSupportDirectory</key>
<true/>
```

- `Library/Application Support`ストレージを無効にする:

```xml
<key>RATStoreDatabaseInApplicationSupportDirectory</key>
<false/>
```

⚠️ **データベースの移行はサポートされていない**ため、この設定を既存のアプリで使用す
