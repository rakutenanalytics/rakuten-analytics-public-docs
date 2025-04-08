---
sidebar_position: 12
id: ios-analytics-rp-cookie
slug: /analytics-sdk/ios/ios-rp-cookie
title: Rp Cookie
added_version: 2.13.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## RP Cookieの取得

RakutenAnalyticsは、`RAnalyticsRpCookieFetcher`クラスをインスタンス化することでRP Cookieを取得するためのパブリックAPIを提供します。

注意: `getRpCookieCompletionHandler`の完了ハンドラーはバックグラウンドキューで呼び出される場合があります。

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
