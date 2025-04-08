---
sidebar_position: 12
id: android-analytics-user-agent
slug: /analytics-sdk/android/android-user-agent
title: App User-Agent to WebView
added_version: 9.3.0
updated_version: 9.3.0
changelog: ./android-changelog
---

## Add the application user-agent string to a WebView

It is possible to add the application user-agent to a WebView by using the RAT extension `WebView.setAppUserAgentString()` as follows:
```kotlin
// 1- get the WebView or create one
val webView = WebView(context)
 
// set the default App user-agent
webView.setAppUserAgentString()

// or set a custom user-agent
webView.setAppUserAgentString("myAppName/1.0.0")
```
Note that it is possible to enable/disable the setting by one of the following configuration:
### 1- Build time configuration 
In the manifest metadata with the key `com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled`.
```xml
  <meta-data
      android:name="com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled"
      android:value="false"/>
```
### 2- Runtime Configuration
```kotlin
 AnalyticsManager.setWebViewAppUserAgentEnabled(enabled: Boolean = true)
 ```
