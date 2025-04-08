---
sidebar_position: 5
id: android-analytics-troubleshooting
slug: /analytics-sdk/android/android-troubleshooting
title: Troubleshooting
---

## Troubleshooting

### Build Error: `java.lang.RuntimeException: Duplicate class...`
`java.lang.RuntimeException: Duplicate class com.rakuten.tech.mobile.manifestconfig.annotations.ManifestConfig`

This build error could occur if you are using older versions of other libraries from `com.rakuten.tech.mobile`.

Some of the dependencies in this SDK have changed to a new Group ID of `io.github.rakutentech` (due to the [JCenter shutdown](https://jfrog.com/blog/into-the-sunset-bintray-jcenter-gocenter-and-chartcenter/)).
This means that if you have another library in your project which depends on the older dependencies using the Group ID `com.rakuten.tech.mobile`, then you will have duplicate classes.

To avoid this, please add the following to your `build.gradle` in order to exclude the old `com.rakuten.tech.mobile` dependencies from your project.

```groovy
configurations.all {
    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-processor'
    exclude group: 'com.rakuten.tech.mobile', module: 'manifest-config-annotations'
}
```

### Fatal Exception in LocationBroadcastReceiver due to obfuscation
`Fatal Exception: java.lang.RuntimeException: Unable to start receiver com.rakuten.tech.mobile.analytics.geo.receiver.LocationBroadcastReceiver Caused by android.os.BadParcelableException: ClassNotFoundException when unmarshalling: com.google.android.gms.location.LocationAvailability`

Note: This issue is only present in versions 10.x and below. It has been fixed in version 11.0.0.

This fatal exception could occur when the LocationBroadcastReceiver in the Rakuten Mobile Analytics SDK fails to start or receive a broadcast. This issue is caused by obfuscating necessary classes from the Google Play Services Location API. To resolve this, specific ProGuard rules must be added to prevent obfuscation of these classes.

``` 
-keep class com.google.android.gms.location.**
```
