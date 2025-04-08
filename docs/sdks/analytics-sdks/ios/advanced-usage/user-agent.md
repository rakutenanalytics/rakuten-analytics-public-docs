---
sidebar_position: 15
id: ios-analytics-user-agent
slug: /analytics-sdk/ios/ios-user-agent
title: App User-Agent in WKWebView
added_version: 9.8.0
updated_version: 9.8.0
changelog: ./ios-changelog
---

## How to set the app user agent in WKWebView

This feature allows to append the app user agent to the default WKWebView's user agent with this format:

`{webview-user-agent} {app-bundle-identifier}/{CFBundleShortVersionString}`

### At buildtime

- Enable the app user agent setting in WKWebView by configuring the app's Info.plist':
```xml
<key>RATSetWebViewAppUserAgentEnabled</key>
<true/>
```

- Disable the app user agent setting in WKWebView by configuring the app's Info.plist':
```xml
<key>RATSetWebViewAppUserAgentEnabled</key>
<false/>
```

#### Notes

If `RATSetWebViewAppUserAgentEnabled` is not set in the app's Info.plist, its value is set to true by default.

#### Warning

If `AnalyticsManager` is not launched from the main thread, then the `WKWebView` user agent will be set only in the next loop of the main Thread.
Therefore, `WKWebView` should not be instantiated at launch in this specific case.

### At runtime

- Enable the app user agent setting in WKWebView:
```swift
let webView = WKWebView()
webView.enableAppUserAgent(true)
```

- Enable the app user agent setting in WKWebView with a custom value:
```swift
let webView = WKWebView()
webView.enableAppUserAgent(true, with: "custom-app-user-agent-value")
```

- Disable the app user agent setting in WKWebView:
```swift
let webView = WKWebView()
webView.enableAppUserAgent(false)
```
