---
sidebar_position: 5
id: android-analytics-runtime-endpoint
slug: /analytics-sdk/android/android-runtime-endpoint
title: RAT エンドポイントのランタイム設定
added_version: 6.9.0
updated_version: 10.1.0
changelog: ./android-changelog
---

## RAT エンドポイントのランタイム設定

v6.9.0 以降、RAT エンドポイントをランタイムで設定できるようになりました。

エンドポイントが `null` または空文字列に設定されている場合、RAT にペイロードを送信するためにビルド構成で設定されたエンドポイントが使用されます。ビルド時にエンドポイントを設定する方法の詳細については、[Configuration](./android-user-guide#configuration) セクションを参照してください。

```kotlin
AnalyticsManager.instance()?.setEndpoint("your-new-endpoint")
```

### <font color="red">制限事項</font>

エンドポイントが変更された際にモジュールのアナリティクスイベントデータベースに既存のイベントが保存されている場合、既存のペイロードは以前に設定されたエンドポイントではなく、新しく設定されたエンドポイントに送信されます。
