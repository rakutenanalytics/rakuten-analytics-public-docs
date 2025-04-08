---
sidebar_position: 13
id: ios-analytics-app-to-app
slug: /analytics-sdk/ios/ios-app-to-app
title: App to App Tracking
added_version: 8.3.0
updated_version: 10.3.0
changelog: ./ios-changelog
---

## App-to-App referral tracking

App to app referral tracking of deeplinks from 'referral' apps to 'referred' apps allows teams to track the behavior of users.

Note that:
- The Analytics SDK _automatically_ tracks incoming deeplinks in the referred app as long as they are in the expected format.
- To generate deeplinks in the referral app in the correct format you should use the `ReferralAppModel` helpers.

### SceneDelegate

If your app uses SceneDelegate, your app's `Info.plist` should contain `UISceneDelegateClassName` key in `UIApplicationSceneManifest` dictionary in order to make the `App-to-App referral tracking` working:
```
    <key>UIApplicationSceneManifest</key>
    <dict>
        <key>UIApplicationSupportsMultipleScenes</key>
        <false/>
        <key>UISceneConfigurations</key>
        <dict>
            <key>UIWindowSceneSessionRoleApplication</key>
            <array>
                <dict>
                    <key>UISceneDelegateClassName</key>
                    <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
                    ...
                </dict>
            </array>
        </dict>
    </dict>
```

### Create and open URL Scheme deeplink in 'referral' app
```swift
guard let  url = ReferralAppModel().urlScheme(appScheme: "app", pathComponent: "path", ref: "any"), UIApplication.shared.canOpenURL(url) else {
    return
}
UIApplication.shared.open(url, options: [:])
```

#### Parameters:

- `appScheme`: The app scheme name defined in `CFBundleURLSchemes` in the app's `Info.plist`.
- `pathComponent`: An optional path component to be appended to the app scheme. This can be used to specify a particular resource or endpoint within the domain. Example: `path/to/resource`. If this parameter is `nil` or an empty string, no path component will be added to the URL.
- `ref`: The referral identifier to be included in the URL. If this parameter is `nil` or an empty string, application bundle identifier will be added.

#### Example:

```
demoapp://app?ref=any&ref_acc=123&ref_aid=456&ref_link=campaignCode&ref_comp=news&custom_param1=japan&ref_custom_param2=rome&ref_custom_param1=italy&custom_param2=tokyo
```

Tracked Event (Kibana):

```
{
  ...
  "_source": {
    ...
    "ref": "any",
    "acc": 123,
    ...
    "etype": "deeplink",
    "aid": 456,
    ...
    "cp": {
      "custom_param1": "japan",
      "ref_type": "external",
      "ref_custom_param2": "rome",
      "custom_param2": "tokyo",
      "ref_comp": "news",
      "ref_link": "campaignCode",
      "ref_custom_param1": "italy"
    },
    ...
  },
  ...
}
```

### Create and open Universal Link deeplink in 'referral' app
```swift
guard let  url = ReferralAppModel().universalLink(domain: "domain.com", pathComponent: "path", ref: "any"), UIApplication.shared.canOpenURL(url) else {
    return
}
UIApplication.shared.open(url, options: [:])
```

#### Parameters:

- `domain`: The associated domain for the Universal Link. Example: `rakuten.co.jp`.
- `pathComponent`: An optional path component to be appended to the domain. This can be used to specify a particular resource or endpoint within the domain. Example: `path/to/resource`. If this parameter is `nil` or an empty string, no path component will be added to the URL.
- `ref`: The referral identifier to be included in the URL. If this parameter is `nil` or an empty string, application bundle identifier will be added.

#### Example:

```
https://domain.com/path?ref=any&ref_acc=123&ref_aid=456&ref_link=campaignCode&ref_comp=news&custom_param1=japan&custom_param2=tokyo&ref_custom_param2=rome&ref_custom_param1=italy
```

Tracked Event (Kibana):

```
{
  ...
  "_source": {
    ...
    "ref": "any",
    "acc": 123,
    ...
    "aid": 456,
    ...
    "etype": "deeplink",
    ...
    "cp": {
      "custom_param1": "japan",
      "ref_type": "external",
      "ref_custom_param2": "rome",
      "custom_param2": "tokyo",
      "ref_comp": "news",
      "ref_link": "campaignCode",
      "ref_custom_param1": "italy"
    },
    ...
  },
  ...
}
```

### Query in the Referral App Model

The query property in the `ReferralAppModel` creates a URL query string by encoding and joining different parameters. This property is helpful for generating a query string that can be added to a URL for HTTP requests.

#### Parameters
- `accountIdentifier`: A required property representing the account identifier.
- `applicationIdentifier`: A required property representing the application identifier.

#### Optional parameters

It is also possible to include the following _optional_ parameters when creating a deeplink:
- `link` - unique identifier of the referral trigger e.g., `"campaign-abc123"`
- `component` - component in the referral app e.g., `"checkout"`
- `customParameters` - `[String: String]` dictionary of key-value pairs e.g., `["custom1": "value1"]`

```swift
guard let model = ReferralAppModel(accountIdentifier: 123,
                                   applicationIdentifier: 456,
                                   link: "campaign-abc123",
                                   component: "checkout",
                                   customParameters: ["custom1": "value1"]) else {
    return
}
// create deeplink url from model using `urlScheme(appScheme:)` or `universalLink(domain:)`
```

#### Notes:
- The query property ensures that all characters in the keys and values are encoded according to [RFC 3986](ttps://datatracker.ietf.org/doc/html/rfc3986), which is essential for creating valid URL query strings.
- The order of parameters in the query string is determined by the order in which they are appended.

### Events sent to RAT

The SDK automatically sends two events to RAT:
- an etype `pv` visit event sent to the **referred** app's RAT account
- an etype `deeplink` event sent to the **referral** app's RAT account
