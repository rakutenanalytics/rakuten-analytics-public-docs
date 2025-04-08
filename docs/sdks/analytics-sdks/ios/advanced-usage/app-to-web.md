---
sidebar_position: 8
id: ios-analytics-app-to-web
slug: /analytics-sdk/ios/ios-app-to-web
title: App to WebView Tracking
added_version: 5.3.0
updated_version: 9.4.0
changelog: ./ios-changelog
---

## App to web tracking

You can configure the SDK to inject a special tracking cookie called `ra_uid`, which allows RAT to track events between the app and in-app webviews. This functionality allows you to track either a single domain or multiple domains. The cookie is only injected on iOS 11.0 and later versions. This feaure is OFF by default. It can be enabled by setting `enableAppToWebTracking` to true.

```swift
AnalyticsManager.shared().enableAppToWebTracking = true
```

By default the cookie's domain will be set to the top-level Rakuten domain. Optionally, you can set a custom domain(s) on the tracking cookie with `setWebTrackingCookieMultipleDomains(:)` method:

```swift
// To set a custom tracking cookie to a domain
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp"])

// To set custom tracking cookies to more than 1 domain
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp", ".example-domain.com"])
```

Both `setWebTrackingCookieMultipleDomains` and `setWebTrackingCookieMultipleDomains` have an optional completion handler. This handler returns the array of edited tracking `HTTPCookie`.

```swift
AnalyticsManager.shared().setWebTrackingCookieMultipleDomains(array: [".my-domain.co.jp", ".example-domain.com"]) { [weak self] trackingCookies in
    // Edited cookie is available here as [HTTPCookie], the number of elements depends on the passed domain(s)
}
```

⚠️ The previous set domain API `setWebTrackingCookieDomain` is deprecated so if you are using that method, we suggest to update to use `setWebTrackingCookieMultipleDomains(:)` instead.

Two key parameters used in the `ra_uid` cookie are `ckp` and `cka`:
- **ckp**: This is the unique device identifier, used to track the device across all Rakuten applications.
- **cka**: This is the Advertising ID (IDFA), a unique, user-resettable identifier. It is used for advertising and analytics purposes. If the IDFA is not available, a default value of `00000000-0000-0000-0000-000000000000` is used.

### `ra_uid` Cookie Format
The cookie is formatted using the `COOKIE_FORMAT`, which is defined as:
```swift
COOKIE_FORMAT = "rat_uid=%s;a_uid=%s"
```
In this format:  
* `rat_uid` takes the value of `ckp`.
* `a_uid` takes the value of `cka`.

### Example of the `ra_uid` cookie value

For each domain you configure, the cookie will appear as follows in the request content:

```swift
// IDFA is available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3Dad7ab8a4-83c8-4ae2-b31f-20b453a62621

// IDFA is not available
ra_uid=rat_uid%3D82b93c49c8cc62a76e26346433dee49c%3Ba_uid%3D00000000-0000-0000-0000-000000000000
```
