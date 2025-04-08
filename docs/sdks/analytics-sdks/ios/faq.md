---
sidebar_position: 3
id: ios-faq
slug: /analytics-sdk/ios/ios-faq
title: Frequently Asked Questions
---

## Frequently Asked Questions

### Build and run module

* Clone or fork the [iOS analytics repository](https://github.com/rakutenanalytics/ios-analytics)  
* `cd` to the repository folder
* Run `bundle install --path vendor/bundle`

#### Unit tests

* Run `bundle exec pod install` to install dependencies
* Open `UnitTestApp.xcworkspace` in Xcode then build/run

#### Building app for App Store

Xcode 13 introduced an option (**enabled** by default) to automatically manage app version numbering. Exporting your app with this option enabled breaks the Analytics SDK’s framework version tracking feature. 

When exporting for the App Store please disable the option “Manage Version and Build Number” in the Xcode UI. If you prefer to keep this option enabled, be aware that the SDK will not be able to track the versions of your embedded SDKs/frameworks.

### Handle RakutenAnalytics and RAnalytics dependencies at the same project

The situations where the project contains both `RakutenAnalytics` and `RAnaltyics` (as a part of other framework) dependencies can cause isses similar to: 

```swift
import RakutenAnalytics
import %SomeFrameworkWithRAnalyticsDependency%  

let analyticsManager = AnalyticsManager.shared() // ERROR: Ambiguous use of 'shared()'
```

It happens because of dublicated class names between different modules and namespaces. As temporary solution for minor issues we can recommend to specify direct module name for all framework related calls. Example:

```swift
import RakutenAnalytics
import %SomeFrameworkWithRAnalyticsDependency%  

let analyticsManager = RakutenAnalytics.AnalyticsManager.shared() // No compilation error. We declare and call directly RakutenAnalytics instance.
```

Unfortunately, this approach does not work for all the cases and really depends on framework usage. For major issues we recommend to wait until framework with `RAnalytics` dependency will update their dependency to `RakutenAnalytics`.

### How page views are automatically tracked

We use method swizzling to automatically trigger a visit event every time a new view controller is presented, unless:
* The view controller is one of the known "chromes" used to coordinate "content" view controllers, i.e. one of `UINavigationController`, `UISplitViewController`, `UIPageViewController` and `UITabBarController`.
* The view controller is showing a system popup, i.e. `UIAlertView`, `UIActionSheet`, `UIAlertController` or `_UIPopoverView`.
* Either the view controller, its view or the window it's attached to is an instance of an Apple-private class, i.e. a class whose name has a `_` prefix and which comes from a system framework. This prevents many on-screen system accessories from generating bogus page views.
* The class of the window the view controller is attached to is a subclass of `UIWindow` coming from a system framework, i.e. the window is not a normal application window. Certain on-screen system accessories, such as the system keyboard's autocompletion word picker, would otherwise trigger events as well.

Those visit events are available to all trackers, and the view controller being the event's subject can be found in the currentPage property of the event state passed to `RAnalyticsTracker#processEvent:state:`.

The RAT tracker furthermore ignores view controllers that have no title, no navigation item title, and for which no URL was found on any webview part of their view hierarchy at the time `-viewDidLoad` was called, unless they have been subclassed by the application or one of the frameworks embedded in the application. This filters out events that would give no information about what page was visited in the application, such as events reporting a page named `UIViewController`. For view controllers with either a title, navigation item title or URL, the library also sets the `cp.title` and `cp.url` fields to the `pv` event it sends to RAT.

### Tracking search results with RAT

The code below shows an example of an event you could send to track which results get shown on a search page. It uses the standard `pv` RAT event used in the previous examples, and a number of standard RAT parameters. The parameters used are:

| RAT param | Description |
|  -------- | -------- |
| `lang` | The language used for the search. |
| `sq` | The search terms. |
| `oa` | `a` for requesting all search terms (AND), `o` for requesting one of them (OR). |
| `esq` | Terms that should be excluded from the results. |
| `genre` | Category for the results. |
| `tag` | An array of tags. |

```swift
RAnalyticsRATTracker.shared().event(eventType: "pv",
parameters:["pgn": "shop_search",
"pgt": "search",
"lang": "English",
"sq": "search query",
"oa": "a",
"esq": "excluded query",
"genre": "category",
"tag": ["tag 1", "tag 2"]]).track()
```

### Monitoring RAT traffic

You can monitor the tracker network activity by listening to the `RAnalyticsWillUploadNotification`, `RAnalyticsUploadFailureNotification` and `RAnalyticsUploadSuccessNotification` notifications.

### Verifying successful integration

If the SDK correctly integrated, the events sent to RAT for a logged-in user will contain an `easyid` field containing the user's member identfier. See [here](./ios-user-guide#using-kibana-to-verify-successful-integration) for a guide on how to check the events sent to RAT.

### Core Telephony values tracking: CTCarrier deprecation

**Note:** Since SDK version 10.3.0 CTCarrier values will be removed from RakutenAnalyticsSDK. [iOS 16.4 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-16_4-release-notes)

We used [CTCarrier](https://developer.apple.com/documentation/coretelephony/ctcarrier) API to track values:

- `carrierName`
- `mobileCountryCode`
- `mobileNetworkCode`
- `isoCountryCode`
- `allowsVOIP`

Since iOS 16.4 `CTCarrier` is a **deprecated** API ([iOS 16.4 Release Notes](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-16_4-release-notes)) and **will be removed in future without any replacement**. As a part of the deprecation process `CTCarrier` values will always return `empty string` or `65535` as **default value**. 

`CTCarrier` has been used to provide `mcn`, `mcnd`, `simopn` and `simop` values. According to the `CTCarrier` changes, we **stop support** of `CTCarrier` API and will **remove** it after Apple removes this API from `Core Telephony` in the future iOS updates.

**Example of `mcn`, `mcnd`, `simopn` and `simop` values before/after CTCarrier deprecation:**

| Key | Description | Value before iOS 16.4 | Value after iOS 16.4 |
| -------- | -------- | -------- | -------- |
| `mcn` | The name of the primary carrier | `Rakuten` | `--` |
| `mcnd` | The name of the secondary carrier | `Rakuten` or empty string | `--` |
| `simopn` | The Service Provider Name | `Rakuten` | `--` |
| `simop` | The SIM operator code  | `44011` | `6553565535` |
