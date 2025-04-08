---
sidebar_position: 11
id: android-analytics-app-to-web
slug: /analytics-sdk/android/android-app-to-web
title: App to WebView Tracking
added_version: 6.8.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## App to WebView tracking

You can configure the SDK to inject a special tracking cookie called `ra_uid`, enabling RAT to track events between the app and in-app WebViews. This functionality allows you to track either a single domain or multiple domains.
Two key parameters used in the `ra_uid` cookie are `ckp` and `cka`:
- **ckp**: This is the unique device identifier, used to track the device across all Rakuten applications.
- **cka**: This is the Advertising ID, a unique, user-resettable identifier. It is used for advertising and analytics purposes. If the Advertising ID is not available, a default value of `00000000-0000-0000-0000-000000000000` is used.

### `ra_uid` Cookie Format
The cookie is formatted using the `COOKIE_FORMAT`, which is defined as:
```kotlin
COOKIE_FORMAT = "rat_uid=%s;a_uid=%s"
```
In this format:  
* `rat_uid` takes the value of `ckp`.
* `a_uid` takes the value of `cka`.

#### Example of the `ra_uid` cookie value
For each domain you configure, the cookie will appear as follows in the request content:

```kotlin
// Advertisiong ID is available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3Dad7ab8a4-83c8-4ae2-b31f-20b453a62621
// Advertisiong ID is not available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3D00000000-0000-0000-0000-000000000000
```

### For single domain tracking

Starting v6.8.0, app to WebView tracking can be enabled to include device and advertising identifier to WebView cookie for specific domain.
Please refer to [Configuration](./android-user-guide#configuration) sections for details on how to enable app to WebView tracking at build time. App to WebView Tracking can also be enabled or disabled at runtime.

```kotlin
AnalyticsManager.instance()?.enableWebTracking(true)
```

By default, app to WebView tracking will use __".rakuten.co.jp"__ as target domain. You can configure a different domain at runtime by extending from the `WebCookieConfig` class and setting to `AnalyticsManager`.

```kotlin
AnalyticsManager.instance()?.setCookieConfig(object : WebCookieConfig() {
      override fun domainForTrackingCookie() =".your.target.domain"
    })
```

You can also reset the app to WebView tracking to use the default domain by setting the cookie config to null.

```kotlin
AnalyticsManager.instance()?.setCookieConfig(null)
```

If the app expects the device and advertising identifier to be included in WebView cookie, make sure that `CookieManager#setAcceptCookie()` is not set to `false`.

### For multi-domain tracking

Starting with version 11.0.0, you can optionally set custom domain(s) on the tracking cookie using the `setCookieConfig(cookieConfigs: Iterable<WebCookieConfig>)` API.

```kotlin
AnalyticsManager.instance()?.setCookieConfig(
    listOf(
        object : WebCookieConfig() {
            override fun domainForTrackingCookie() = ".your.target.domain1"
        },
        object : WebCookieConfig() {
            override fun domainForTrackingCookie() = ".your.target.domain2"
        },
    )
)
```

### Checking the Set WebCookieConfig

You can also verify the `WebCookieConfig` you have set by using the `getCookieConfigs()` API.

```kotlin
val webCookieConfigList = AnalyticsManager.instance()?.getCookieConfigs()
```
