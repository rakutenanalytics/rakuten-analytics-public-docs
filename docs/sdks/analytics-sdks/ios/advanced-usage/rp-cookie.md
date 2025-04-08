---
sidebar_position: 12
id: ios-analytics-rp-cookie
slug: /analytics-sdk/ios/ios-rp-cookie
title: Rp Cookie
added_version: 2.13.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## Fetching a RP Cookie

RakutenAnalytics provides a public API to fetch the RP Cookie by instantiating `RAnalyticsRpCookieFetcher` class.

Note: the completion handler of `getRpCookieCompletionHandler` may be called on a background queue.

```swift
// Create a RP Cookie Fetcher
let fetcher = RAnalyticsRpCookieFetcher(cookieStorage: HTTPCookieStorage.shared)

// Get the RP Cookie
fetcher?.getRpCookieCompletionHandler({ cookie, _ in
    guard let cookie = cookie else {
        return
    }
    print(cookie)
})
```
