---
sidebar_position: 5
id: android-analytics-troubleshooting
slug: /analytics-sdk/android/android-troubleshooting
title: トラブルシューティング
---

## トラブルシューティング

### ビルドエラー: `java.lang.RuntimeException: Duplicate class...`

`java.lang.RuntimeException: Duplicate class com.rakuten.tech.mobile.manifestconfig.annotations.ManifestConfig`

このビルドエラーは、`com.rakuten.tech.mobile` の古いバージョンの他のライブラリを使用している場合に発生する可能性があります。

この SDK の一部の依存関係は、[JCenter の終了](https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/) に伴い、新しい Group ID `io.github.rakutentech` に変更されました。

つまり、プロジェクト内に Group ID `com.rakuten.tech.mobile` を使用している古い依存関係に依存する別のライブラリがある場合、クラスの重複が発生します。

これを回避するには、以下を `build.gradle` に追加して、プロジェクトから古い `com.rakuten.tech.mobile` 依存関係を除外してください。

```groovy
configurations.all {
    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-processor'
    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-annotations'
}
```

### LocationBroadcastReceiver の致命的な例外 (難読化による)

`Fatal Exception: java.lang.RuntimeException: Unable to start receiver com.rakuten.tech.mobile.analytics.geo.receiver.LocationBroadcastReceiver Caused by android.os.BadParcelableException: ClassNotFoundException when unmarshalling: com.google.android.gms.location.LocationAvailability`

注意: この問題はバージョン 10.x 以下でのみ発生します。バージョン 11.0.0 で修正されています。

この致命的な例外は、Rakuten Mobile Analytics SDK の LocationBroadcastReceiver が起動またはブロードキャストの受信に失敗した場合に発生する可能性があります。この問題は、Google Play Services Location API の必要なクラスが難読化されることによって引き起こされます。この問題を解決するには、これらのクラスの難読化を防ぐために特定の ProGuard ルールを追加する必要があります。

```
-keep class com.google.android.gms.location.**
```
