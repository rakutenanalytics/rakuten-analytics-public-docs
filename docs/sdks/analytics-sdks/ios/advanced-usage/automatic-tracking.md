---
sidebar_position: 4
id: ios-analytics-automatic-tracking
slug: /analytics-sdk/ios/ios-automatic-tracking
title: Automatic Tracking
added_version: 2.7.0
updated_version: 9.5.0
changelog: ./ios-changelog
---

## Configure automatic tracking

### Public API

If your app is coded in Objective-C, please import this header file in order to use our public Swift classes: 

```objc
#import <RakutenAnalytics/RAnalytics-Swift.h>
```

If your app is coded in Swift, please import the RakutenAnalytics framework: 

```swift
import RakutenAnalytics
```

### Automatics events tracking configuration

#### Build time configuration

* Create and add this file to your Xcode project: `RAnalyticsConfiguration.plist`
* Open the file and add the events you do not want to track to a `RATDisabledEventsList` string array. For example, to disable all the automatic events: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>RATDisabledEventsList</key>
    <array>
    <string>_rem_init_launch</string>
    <string>_rem_launch</string>
    <string>_rem_end_session</string>
    <string>_rem_update</string>
    <string>_rem_login</string>
    <string>_rem_login_failure</string>
    <string>_rem_logout</string>
    <string>_rem_install</string>
    <string>_rem_visit</string>
    <string>_rem_applink</string>
    <string>_rem_push_received</string>
    <string>_rem_push_auto_register</string>
    <string>_rem_push_auto_unregister</string>
    <string>_rem_push_notify</string>
    <string>_rem_sso_credential_found</string>
    <string>_rem_login_credential_found</string>
    <string>_rem_credential_strategies</string>
    <string>_analytics_custom</string>
    </array>
</dict>
</plist>
```

#### Runtime configuration

It's also possible to enable or disable events at runtime:

* Enable all events at runtime 

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { _ in true }
```

* Disable all events at runtime 

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { _ in false }
```

* Disable a given event at runtime 

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { eventName in
    eventName != AnalyticsManager.Event.Name.sessionStart
}
```

Note: The runtime configuration overrides the build time configuration. If an event is disabled in the build time configuration and enabled in the runtime configuration the event will be tracked by RakutenAnalytics.

In order to override the build time configuration at runtime set `AnalyticsManager.shared().shouldTrackEventHandler` in `application(_:willFinishLaunchingWithOptions:)`: 

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, willFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        AnalyticsManager.shared().shouldTrackEventHandler = { eventName in
            ...
        }
        return true
    }
}
```
