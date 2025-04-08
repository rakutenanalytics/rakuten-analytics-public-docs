---
sidebar_position: 3
id: ios-analytics-idfa-tracking
slug: /analytics-sdk/ios/ios-idfa-tracking
title: IDFA Tracking
added_version: 2.6.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## IDFA tracking

The SDK automatically tracks the [advertising identifier (IDFA)](https://developer.apple.com/reference/adsupport/asidentifiermanager) by default but you can still disable it by setting `shouldTrackAdvertisingIdentifier` to `false`:

```swift
AnalyticsManager.shared().shouldTrackAdvertisingIdentifier = false
```

### IDFA tracking on iOS 14.x and above

⚠️ If the available IDFA value is valid (non-zero'd) the RakutenAnalytics SDK will use it. This change was implemented in response to Apple's [announcement](https://developer.apple.com/news/?id=hx9s63c5) that they have delayed the below requirement to obtain permission for user tracking until early 2021.


If the app is built with the iOS 14 SDK and embeds the [AppTrackingTransparency framework](https://developer.apple.com/documentation/apptrackingtransparency), the Analytics SDK uses IDFA on iOS 14.x and greater only when the user has authorized tracking. Your app can display the IDFA tracking authorization popup by adding a `NSUserTrackingUsageDescription` key in your Info.plist and calling the [requestTrackingAuthorization function](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/3547037-requesttrackingauthorization).

```swift
ATTrackingManager.requestTrackingAuthorization { status in
    switch status {
    case .authorized:
        // Now that tracking is authorized we can get the IDFA
        let idfa = ASIdentifierManager.shared().advertisingIdentifier
        
    default: () // IDFA is not authorized
    }
}
```