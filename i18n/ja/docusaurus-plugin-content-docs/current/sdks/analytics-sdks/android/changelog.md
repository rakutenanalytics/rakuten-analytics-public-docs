---
sidebar_position: 6
id: android-analytics-changelog
slug: /analytics-sdk/android/android-changelog
title: Changelog
---

### 12.0.0 (In progress)
#### Features
* **[CONRAT-38629](https://jira.rakuten-it.com/jira/browse/CONRAT-38629):** Add [Identity Container feature](advanced-usage/identity-store.md) to provide a secure storage for member identifier.
#### Improvements
* **[CONRAT-35287](https://jira.rakuten-it.com/jira/browse/CONRAT-35287):**
    - Update Kotlin version to 2.1.10
    - Update Android Gradle Plugin version to 8.8.0
    - Add Support for Android 15 (`targetSdk` set to 15)

### 11.1.0 (2025-01-30)
#### Features
* **[CONRAT-35751](https://jira.rakuten-it.com/jira/browse/CONRAT-35751):** Add device permissions' status to `_rem_end_session` payload.
  - Current collected permissions: Location, Push Notification, Advertising ID, Camera, and Microphone.
* **[CONRAT-36620](https://jira.rakuten-it.com/jira/browse/CONRAT-36620):** Add setting `ref` parameter to `context.packageName` if empty string is set to `ReferralAppModel`.
#### Improvements
* **[CONRAT-35912](https://jira.rakuten-it.com/jira/browse/CONRAT-35912):** Update Rp cookie storage to save only the cookie value.
* **[CONRAT-66623](https://jira.rakuten-it.com/jira/browse/CONRAT-36623):** Improve the Release workflow and automate the Changelog publication.
* **[CONRAT-34567](https://jira.rakuten-it.com/jira/browse/CONRAT-34567):** Remove unnecessary setting of `Activity`'s `launchMode` to `singleTask` for handling app-to-app tracking feature.
* **[CONRAT-36981](https://jira.rakuten-it.com/jira/browse/CONRAT-36981):** Store member identifier using generic key value in `SharedPreferences`.
#### Bug fixes
* **[CONRAT-37243](https://jira.rakuten-it.com/jira/browse/CONRAT-37243):** Fix the issue of `cka` not being updated when the user changes Advertising ID System setting.
* **[CONRAT-36233](https://jira.rakuten-it.com/jira/browse/CONRAT-36233):** Add call to `completionHandler.OnError` callback in `requestLocation` API when location is disabled or permission is not allowed.
* **[CONRAT-36300](https://jira.rakuten-it.com/jira/browse/CONRAT-36300):** Add try-catch block to handle `NullPointerException` encountered in `requestCellInfoUpdate` when app is sandboxed or in Android 15 private space.
* **[CONRAT-36206](https://jira.rakuten-it.com/jira/browse/CONRAT-36206):** Add handling or suppress to SonarCloud issues.
* **[CONRAT-37510](https://jira.rakuten-it.com/jira/browse/CONRAT-37510):** Change try-catch block to handle generic JSON parsing exception for Rp cookie obfuscation issue.
* **[CONRAT-37432](https://jira.rakuten-it.com/jira/browse/CONRAT-37432):** Fix issue with GeoTracker Configuration crash when the host app's obfuscation mapping is updated in a new release version.
  - If obfuscation issue occurs, GeoTracker Configuration stored in `SharedPreferences` will be set to null to avoid location collection with default configuration.
#### Documentation
* **[CONRAT-36624](https://jira.rakuten-it.com/jira/browse/CONRAT-36624):** Update the documentation to include details of x (`ra_uid` cookie).
* **[CONRAT-37432](https://jira.rakuten-it.com/jira/browse/CONRAT-37432):** Add [Geo Location Tracker Limits](./android-geo-tracking#geo-location-tracker-limits) to the documentation.

### 11.0.0 (2024-09-26)
#### Features
* **[CONRAT-35291](https://jira.rakuten-it.com/jira/browse/CONRAT-35291):** Remove automatic tracking of User SDK login events.

  ⚠️ This change impacts `User SDK login` users. To re-enable events tracking, refer to the [Migration Guide](./android-migration#migration-guide-10xx---11xx).

* **[CONRAT-34201](https://jira.rakuten-it.com/jira/browse/CONRAT-34201):** Made Application ID an optional setting in AndroidManifest.
* **[CONRAT-32241](https://jira.rakuten-it.com/jira/browse/CONRAT-32241):** Add multi domain for app to WebView tracking.
#### Improvements
* **[CONRAT-32564](https://jira.rakuten-it.com/jira/browse/CONRAT-32564):** Restructure the project and remove `analytics-core` module.
* **[CONRAT-33625](https://jira.rakuten-it.com/jira/browse/CONRAT-33625):** Removed usage of `ScheduledExecutorService.scheduleAtFixedRate` and replaced with `ScheduledExecutorService.scheduleAtFixedRate` API, used to schedule tasks with a fixed delay (Batching delay).
    Use of `scheduleAtFixedRate` is strongly discouraged because it can lead to unexpected behavior when an Android process state changes from cached to uncached on Devices with Android 14 OS or higher (Tasks may unexpectedly execute hundreds or thousands of times in quick succession).
#### Bug fixes
* **[CONRAT-35721](https://jira.rakuten-it.com/jira/browse/CONRAT-35721):** Fixed an issue with Rp cookie changes when the host app's obfuscation mapping is updated in a new release version.
* **[CONRAT-34308](https://jira.rakuten-it.com/jira/browse/CONRAT-34308):** Fixed duplicated events being sent in the payload when [sending a specific event to different RAT account](./android-diff-accounts) along with [multi-rat accounts](./android-duplicate-events).
* **[CONRAT-33625](https://jira.rakuten-it.com/jira/browse/CONRAT-33625):** Fixed sending hundreds duplicated events to RAT when cached application process unfroze on device with OS: Android 14 or higher.
* **[CONRAT-33894](https://jira.rakuten-it.com/jira/browse/CONRAT-33894):** Fixed the persistent cookie issue that occur when App to Webview tracking is disabled at App startup.
* **[CONRAT-35666](https://jira.rakuten-it.com/jira/browse/CONRAT-35666):** Resolved Fatal Exception in `LocationBroadcastReceiver` due to obfuscating necessary classes from the Google Play Services Location API.

### 10.1.1 (2024-05-08)
#### Bug fixes
* **[CONRAT-33625](https://jira.rakuten-it.com/jira/browse/CONRAT-33625):** Resolved the concurrency issue of sending hundreds of duplicate events to RAT when the cached application process unfroze, on devices with Android 14 OS or higher.
#### <font color="#ff0000">Known issues</font>
* **[CONRAT-35666](https://jira.rakuten-it.com/jira/browse/CONRAT-35666):** A fatal exception occurs when the LocationBroadcastReceiver in the Analytics GeoTracker fails to start. See the [Troubleshooting](./android-troubleshooting#fatal-exception-in-locationbroadcastreceiver-due-to-obfuscation) section to know how to fix this issue.

### 10.1.0 (2024-02-27)
#### Bug fixes
* **[CONRAT-32196](https://jira.rakuten-it.com/jira/browse/CONRAT-32196):** Fix Sonarqube issues and security hotspots.
* **[CONRAT-31725](https://jira.rakuten-it.com/jira/browse/CONRAT-31725):** Updated RatTracker proguard-rules to fix a crash when upgrading from older versions to v10.x.x.
#### Improvements
* **[CONRAT-32325](https://jira.rakuten-it.com/jira/browse/CONRAT-32325):** Removed usage of Public/Private SDK, only one public SDK will be used for All RAT customers.
    - Use one release mode with disabled obfuscation.
    - Make the endpoint configuration optional. If RAT API Base URL is not defined in manifest meta-data, the default endpoint will be used. Please refer to [Configuration](./android-user-guide#configuration) sections for details.

### 10.0.3 (2023-10-20)
#### Improvements
* **[CONRAT-31176](https://jira.rakuten-it.com/jira/browse/CONRAT-31176):** Updated Gson proguard-rules for AGP using R8 version 3.0.0 and higher to fix Multi RAT account tracking issue.
* **[CONRAT-30352](https://jira.rakuten-it.com/jira/browse/CONRAT-30352):** Improved the process to reduce memory allocation when there are no events to deliver to RAT.
* **[CONRAT-30579](https://jira.rakuten-it.com/jira/browse/CONRAT-30579):** Improved debug logging for module tracking.

### 10.0.2 (2023-07-24)
#### Bug fixes
* **[CONRAT-29954](https://jira.rakuten-it.com/jira/browse/CONRAT-29954):** Fix `Configuration`cache, after App killed and relaunch, can get `Configuration` cache.
* **[CONRAT-29962](https://jira.rakuten-it.com/jira/browse/CONRAT-29962):** Fix WorkManger working time, and ensure work every day.

### 10.0.1 (2023-06-23)
#### Bug fixes
* **[CONRAT-29522](https://jira.rakuten-it.com/jira/browse/CONRAT-29522):** Update `loc` event structure.

### 10.0.0 (2023-06-06)
#### Features
* **[CONRAT-29102](https://jira.rakuten-it.com/jira/browse/CONRAT-29102):** Added Carrier Identification parameters to RAT Event payload.
* **[CONRAT-28356](https://jira.rakuten-it.com/jira/browse/CONRAT-28356):** Added `GeoManager.instance().startLocationCollection()` API to start location collection.
* **[CONRAT-28381](https://jira.rakuten-it.com/jira/browse/CONRAT-28381):** Added `GeoManager.instance().stopLocationCollection()` API to stop location collection.
* **[CONRAT-28480](https://jira.rakuten-it.com/jira/browse/CONRAT-28480):** Added `GeoManager.instance().requestLocation()` API to request location.
* **[CONRAT-28249](https://jira.rakuten-it.com/jira/browse/CONRAT-28249):** Added location Event Processing in `RatTracker`.
* **[CONRAT-28471](https://jira.rakuten-it.com/jira/browse/CONRAT-28471):** Added geo configuration builder `Configuration.Builder` to save Configuration from Application.
* **[CONRAT-28244](https://jira.rakuten-it.com/jira/browse/CONRAT-28244):** Exposed public methods of `GeoManager`.
* **[CONRAT-27823](https://jira.rakuten-it.com/jira/browse/CONRAT-27823):** SDK tracking updates:
  - Updated `rsdks` parameter in RAT payload to be a `rsdks_[sdk name]` fields  of `cp` (custom parameter field).
  - Removed SDK Utils and enabled SDK tracking for GEO, PITARI and ID SDKs.
#### Improvements
* **[CONRAT-28250](https://jira.rakuten-it.com/jira/browse/CONRAT-28250):** Added new Location parameters to RAT Event payload.
* **[CONRAT-28432](https://jira.rakuten-it.com/jira/browse/CONRAT-28432):** Removed deprecated public APIs. Please see [Migration section](./android-migration#migration-guide-9xx---10xx) for details.
* **[CONRAT-28140](https://jira.rakuten-it.com/jira/browse/CONRAT-28140):** Removed SDKTracker.
* **[CONRAT-27818](https://jira.rakuten-it.com/jira/browse/CONRAT-27818):** Removed dependency on SDKUtils.
#### Bug fixes
* **[CONRAT-29181](https://jira.rakuten-it.com/jira/browse/CONRAT-29181):** Added graceful handling to avoid crashes due to error when getting screen resolution.
* **[CONRAT-29199](https://jira.rakuten-it.com/jira/browse/CONRAT-29199):** Fixed a crash caused when getting null `ANDROID_ID`.
#### Documentation
* **[CONRAT-28902](https://jira.rakuten-it.com/jira/browse/CONRAT-28902):** Updated documentation for GeoLocation Tracking.

### 9.3.1 (2023-09-26)
* **[CONRAT-30352](https://jira.rakuten-it.com/jira/browse/CONRAT-30352):** Improved the process to reduce memory allocation when there are no events to deliver to RAT.

### 9.3.0 (2023-01-23)
* **[SDKCF-5836](https://jira.rakuten-it.com/jira/browse/SDKCF-5836):** Updated dependencies to remove vulnerabilities.
* **[SDKCF-5877](https://jira.rakuten-it.com/jira/browse/SDKCF-5877):** Added enable/disable for App-to-App tracking.
* **[SDKCF-5901](https://jira.rakuten-it.com/jira/browse/SDKCF-5901):** Fixed some code smells suppression.
* **[SDKCF-6005](https://jira.rakuten-it.com/jira/browse/SDKCF-6005):** Added a date header in HTTP requests sent to RAT.
* **[SDKCF-6106](https://jira.rakuten-it.com/jira/browse/SDKCF-6106):** Refactored generic handling of push events sent to RAT.
  - Migrated all push events to Push SDK v9.11.0. Please see [Push document portal](https://pages.ghe.rakuten-it.com/mag/mag-sdk-docs/#android-push) for details.
* **[SDKCF-6156](https://jira.rakuten-it.com/jira/browse/SDKCF-6156):** Updated Location tracking documentation.
* **[SDKCF-6111](https://jira.rakuten-it.com/jira/browse/SDKCF-6111):** Added a WebView extension to set the Application user-agent string `WebView.setAppUserAgentString()`. Please see [usage section](./android-user-agent) for details.

### 9.2.1 (2022-11-22)
* **[SDKCF-5994](https://jira.rakuten-it.com/jira/browse/SDKCF-5994):** Added `AnalyticsManager.instance()?.getDeviceIdentifier()` API to retrieve the Device ID (`ckp` value).
* **[SDKCF-6033](https://jira.rakuten-it.com/jira/browse/SDKCF-6033):** Fixed Rp Cookie persistence issue due to blocking access to [Non-SDK interfaces in Android 12 and later](https://developer.android.com/about/versions/12/non-sdk-12#new-blocked).
* **[SDKCF-5836](https://jira.rakuten-it.com/jira/browse/SDKCF-5836):** Updated dependencies to remove vulnerabilities.

### 9.2.0 (2022-10-12)
* **[SDKCF-5788](https://jira.rakuten-it.com/jira/browse/SDKCF-5788):** Updated `AnalyticsManager.getRpCookie()` API to run on the IO thread pool, to avoid "Application Not Responding" (ANR) errors.
* **[SDKCF-5789](https://jira.rakuten-it.com/jira/browse/SDKCF-5789):** Disabled tracking location when in background.
* **[SDKCF-5585](https://jira.rakuten-it.com/jira/browse/SDKCF-5585):** Removed persistent identifiers in `ckp` implementation.
* **[SDKCF-3799](https://jira.rakuten-it.com/jira/browse/SDKCF-3799):** Fixed intermittent failing unit tests.
* **[SDKCF-5843](https://jira.rakuten-it.com/jira/browse/SDKCF-5843):** Changed "Failed to get module version" logs to debug level.
* **[SDKCF-5916](https://jira.rakuten-it.com/jira/browse/SDKCF-5916):** Changed account validation to crash only in debug mode.
* **[SDKCF-5146](https://jira.rakuten-it.com/jira/browse/SDKCF-5146):** Added Android 13 support.
  - Updated the compile and target API level to 33.
  - Declared the normal permission `com.google.android.gms.permission.AD_ID` to retrieve the advertising ID.
* **[SDKCF-5823](https://jira.rakuten-it.com/jira/browse/SDKCF-5823):** Kept the current activity as `WeakReference` object to avoid memory leaks.
* **[SDKCF-5930](https://jira.rakuten-it.com/jira/browse/SDKCF-5930):** Fixed crash caused by tracking empty SDK events.
* **[SDKCF-5935](https://jira.rakuten-it.com/jira/browse/SDKCF-5935):** Fixed events being sent to negative primary RAT account and application ID.

### 9.1.3 (2022-11-21)
* **[SDKCF-5994](https://jira.rakuten-it.com/jira/browse/SDKCF-5994):** Added `AnalyticsManager.instance()?.getDeviceIdentifier()` API to retrieve the Device ID (`ckp` value).
* **[SDKCF-6033](https://jira.rakuten-it.com/jira/browse/SDKCF-6033):** Fixed Rp Cookie persistence issue due to blocking access to [Non-SDK interfaces in Android 12 and later](https://developer.android.com/about/versions/12/non-sdk-12#new-blocked).
* **[SDKCF-5836](https://jira.rakuten-it.com/jira/browse/SDKCF-5836):** Updated dependencies to remove vulnerabilities.

### 9.1.2 (2022-10-20)
* **[SDKCF-5965](https://jira.rakuten-it.com/jira/browse/SDKCF-5965):** Added Android 13 support.
  - Updated the compile and target API level to 33.
  - Declared the normal permission `com.google.android.gms.permission.AD_ID` to retrieve the advertising ID.

### 9.1.1 (2022-09-30)
<font color="red">**Google’s User Data Policy compliance upgrade instruction**</font><br />
In order to comply with Google’s User Data Policy, we made identifiers in "ckp" persistent in v9.1.x, to be removed in next release (v9.2.0)<br />
It is necessary that your users use the version of your app with Android Analytics SDK v9.1.x and then upgrade to v9.2.0.
Check the following links for more details:<br />
[Android Analytics SDK version upgrade recommended](https://discourse.tech.rakuten-it.com/t/android-analytics-sdk-version-upgrade-recommended/7225)<br />
[Announcement : Google Play User Data Policy Compliance](https://confluence.rakuten-it.com/confluence/display/MAGS/Announcement+%3A+Google+Play+User+Data+Policy+Compliance)<br />
**Fixed issues**
* **[SDKCF-5865](https://jira.rakuten-it.com/jira/browse/SDKCF-5865):** Fixed `OutOfMemoryError` and `TimeoutException` errors caused by `TimerTask` during events processing.

### 9.1.0 (2022-08-23)
* **[SDKCF-5258](https://jira.rakuten-it.com/jira/browse/SDKCF-5258):** Added Google App Set ID parameter.
* **[SDKCF-360](https://jira.rakuten-it.com/jira/browse/SDKCF-360):** Improved GeoLocation request to receive updates using passive provider.
* **[SDKCF-5508](https://jira.rakuten-it.com/jira/browse/SDKCF-5508):** Updated SDK Utils dependency to v2.1.1.
* **[SDKCF-5291](https://jira.rakuten-it.com/jira/browse/SDKCF-5291):** Correctly handled failed sending of 0 events.
* **[SDKCF-5143](https://jira.rakuten-it.com/jira/browse/SDKCF-5143):** Added `mno` network tracking (disabled by default). Please see [usage](./android-user-guide#-mno-parameters) section for details.
* **[SDKCF-5307](https://jira.rakuten-it.com/jira/browse/SDKCF-5307):** Removed EOL SDKs and added SDK Utils to `rsdks` parameter.
* **[SDKCF-5628](https://jira.rakuten-it.com/jira/browse/SDKCF-5628):** Made `ckp` value persistent.
* **[SDKCF-5548](https://jira.rakuten-it.com/jira/browse/SDKCF-5548):** Updated proguard config to fix `JSON` deserialization issue on `RatAnalyticsConfig` and avoid crash issue on app launch.
* **[SDKCF-5653](https://jira.rakuten-it.com/jira/browse/SDKCF-5653):** Throw `IllegalArgumentException` when multiple RAT accounts are not set to valid values in the Build time configuration.

### 9.0.0 (2022-06-20)
* **[SDKCF-5108](https://jira.rakuten-it.com/jira/browse/SDKCF-5108):** **Breaking Change:** Removed throwing of `SdkNotInitializedException` when SDK was not initialized.
  - `SdkNotInitializedException` is set to the error callback function to inform app regarding non-fatal error.
  - `AnalyticsManager.instance()` now returns `null` when SDK is not initialized instead of throwing `SdkNotInitializedException`. Please see [migration section](./android-migration#migration-guide-7xx8xx---9xx) for details.
* **[SDKCF-5156](https://jira.rakuten-it.com/jira/browse/SDKCF-5156):** **Breaking Change:** Moved `analytics-idtoken` module functionality to `analytics-core` module.
  - Setting/removing member identifier and triggering ID SDK login/logout events will now be done using `AnalyticsManager` class. Please see [member identifier](./android-member-identifier) and [migration](./android-migration#migration-guide-7xx8xx---9xx) sections for details.
* **[SDKCF-5072](https://jira.rakuten-it.com/jira/browse/SDKCF-5072):** Fixed issue for second sim network parameter (i.e. `mnetwd`) not blank when in airplane mode.
* **[SDKCF-4402](https://jira.rakuten-it.com/jira/browse/SDKCF-4402):** Added graceful handling to avoid crash due to recurring timer scheduling.
* **[SDKCF-4403](https://jira.rakuten-it.com/jira/browse/SDKCF-4403):** Changed usage of `Calendar` class to `Date` for counting number of days.
* **[SDKCF-4404](https://jira.rakuten-it.com/jira/browse/SDKCF-4404):** Added graceful handling to avoid crash due to locked SQLite database.
* **[SDKCF-5153](https://jira.rakuten-it.com/jira/browse/SDKCF-5153):** Updated term used for "App to WebView Tracking" for consistency with iOS. Please see [usage](./android-app-to-web) section for details.
* **[SDKCF-5265](https://jira.rakuten-it.com/jira/browse/SDKCF-5265):** Added handling for IAM impression events (`_rem_iam_impressions`).
* **[SDKCF-5171](https://jira.rakuten-it.com/jira/browse/SDKCF-5171):** Added graceful handling to avoid crash due to single timer scheduling.
* **[SDKCF-5293](https://jira.rakuten-it.com/jira/browse/SDKCF-5293):** Updated SDK Utils version to update default `initOrder` of content provider.
* **[SDKCF-4918](https://jira.rakuten-it.com/jira/browse/SDKCF-4918):** Added support for building using Java 11.
* **[SDKCF-5476](https://jira.rakuten-it.com/jira/browse/SDKCF-5476):** Added new events (`_rem_push_auto_register`, `_rem_push_auto_unregister`) to support Push opt-in/opt-out feature.
* **[SDKCF-5365](https://jira.rakuten-it.com/jira/browse/SDKCF-5365):** Added network checking before sending payload and reschedule delay when offline with exponential backoff.

### 8.2.1 (2022-05-31)
* **[SDKCF-5360](https://jira.rakuten-it.com/jira/browse/SDKCF-5360):** Fixed out-of-memory crash caused by timer re-initialization on device offline state. This reverts changes from [SDKCF-4217](https://jira.rakuten-it.com/jira/browse/SDKCF-4217).

### 8.2.0 (2022-03-30)
* **[SDKCF-4997](https://jira.rakuten-it.com/jira/browse/SDKCF-4997):** Added the new conversion tracking event `_rem_push_cv` for new PNP KPI. Please see [Push Events Tracking](./android-migration#push-sdk-events-tracking-moved-to-push-sdk-v9110) section for details.
* **[SDKCF-5017](https://jira.rakuten-it.com/jira/browse/SDKCF-5017):** Updated SDK Utils version to remove test library dependency.
* **[SDKCF-4056](https://jira.rakuten-it.com/jira/browse/SDKCF-4056):** Added network callback registration retry when encountering security exception.
* **[SDKCF-4887](https://jira.rakuten-it.com/jira/browse/SDKCF-4887):** Replaced connectivity handling to SDK Utils' connectivity manager.

### 8.1.0 (2022-02-16)
* **[SDKCF-4217](https://jira.rakuten-it.com/jira/browse/SDKCF-4217):** Added network checking before sending payload and reschedule delay when offline.
* **[SDKCF-4650](https://jira.rakuten-it.com/jira/browse/SDKCF-4650):** Simplified userid/easyid handling in RAT payload.
  - User ID is only added in payload if logged-in using Login SDK or manually set using `AnalyticsManager.instance().setUserId()` API.
  - Easy ID is only added in payload if set using `RatIdToken.setMemberIdentifier()` API.
* **[SDKCF-4867](https://jira.rakuten-it.com/jira/browse/SDKCF-4867):** Added helper class (`ReferralAppModel.getReferralUri()`) for generating URI with correct format for the app to app tracking feature. Please see [App to App Tracking](./android-app-to-app) section for details.
* **[SDKCF-2162](https://jira.rakuten-it.com/jira/browse/SDKCF-2162):** Added new API to set non-fatal error callback. Please see [Error Callback](./android-error-callback) section for details.
* **[SDKCF-4435](https://jira.rakuten-it.com/jira/browse/SDKCF-4435):** Added push notification received event support.
* **[SDKCF-4691](https://jira.rakuten-it.com/jira/browse/SDKCF-4691):** Refactored common codes like SharedPreferences, Logger, App Info, and Network to use SDKUtils.
* **[SDKCF-4767](https://jira.rakuten-it.com/jira/browse/SDKCF-4767):** Added correct handling for OS exception.
* **[SDKCF-4800](https://jira.rakuten-it.com/jira/browse/SDKCF-4800):** Fixed issues reported by SonarQube due to version update.

### 8.0.0 (2021-12-14)
* **[SDKCF-3894](https://jira.rakuten-it.com/jira/browse/SDKCF-3894):** Added support for 5G network in `mnetw` and `mnetwd` parameters.
* **[SDKCF-3991](https://jira.rakuten-it.com/jira/browse/SDKCF-3991):** Updated minimum supported SDK to API 23.
* **[SDKCF-4479](https://jira.rakuten-it.com/jira/browse/SDKCF-4479):** **Breaking Change:** Remove analytics-idtoken module dependency on ID SDK. `setMemberIdentifier` and `setMemberError` APIs no longer depend on ID SDK token classes. Please see [usage](./android-member-identifier) section for details.
* **[SDKCF-4426](https://jira.rakuten-it.com/jira/browse/SDKCF-4426):** Updated the "compileSDKVersion" and "targetSDKVersion" to Android API Level 31 for Android 12 support.
* **[SDKCF-4628](https://jira.rakuten-it.com/jira/browse/SDKCF-4628):** Updated proguard config for `LocalCache` to fix crash issue encountered on app launch by Rewards.
* **[SDKCF-4682](https://jira.rakuten-it.com/jira/browse/SDKCF-4682):** Fixed issue reported by Beauty where network capabilities are null.
* **[SDKCF-4414](https://jira.rakuten-it.com/jira/browse/SDKCF-4414):** Fixed all critical issues and code smells reported in SonarQube.
* **[SDKCF-3825](https://jira.rakuten-it.com/jira/browse/SDKCF-3825):** Migrated to view binding to remove deprecated kotlin-android-extensions plugin.
* **[SDKCF-4194](https://jira.rakuten-it.com/jira/browse/SDKCF-4194):** Updated dependencies to remove JCenter repository.
* **[SDKCF-4188](https://jira.rakuten-it.com/jira/browse/SDKCF-4188):** Updated Kluent version to remove usage of deprecated feature.

### 7.3.1 (2021-11-04)
* **docs-update-only:** Added guide for creating deeplink URL for the app to app tracking feature. Please see [App to App Tracking](./android-app-to-app) section for details.

### 7.3.0 (2021-10-11)
* **[SDKCF-4088](https://jira.rakuten-it.com/jira/browse/SDKCF-4088):** Added multi-RAT account tracking for sending duplicate events to multiple accounts.
* **[SDKCF-4220](https://jira.rakuten-it.com/jira/browse/SDKCF-4220):** Added app to app tracking. Please see [App to App Tracking](./android-app-to-app) section for details.
* **[SDKCF-4266](https://jira.rakuten-it.com/jira/browse/SDKCF-4266):** Fixed Bluetooth permission issue when retrieving device identifier.
* **[SDKCF-4082](https://jira.rakuten-it.com/jira/browse/SDKCF-4082):** Updated `sdk_info` parameter in RAT payload to JSON type and changed key to `rsdks`.
* **[SDKCF-4004](https://jira.rakuten-it.com/jira/browse/SDKCF-4004):** Fixed `mnetw` parameter showing incorrect value on 3G network.
* Migrated remaining abstract Java classes to Kotlin.

### 7.2.2 (2021-09-08)
* **[SDKCF-4162](https://jira.rakuten-it.com/jira/browse/SDKCF-4162):** Fixed crash due to concurrent access to date formatter by using `synchronized` block.
* **[SDKCF-4163](https://jira.rakuten-it.com/jira/browse/SDKCF-4163):** Added graceful handling to avoid crash due to Gson library issue. This is an open issue [#1778](https://github.com/google/gson/issues/1778) in Gson library.
* **[SDKCF-4180](https://jira.rakuten-it.com/jira/browse/SDKCF-4180):** Added graceful handling to avoid crash due to `HashMap` initialization issue in SQLite.
* **[SDKCF-4170](https://jira.rakuten-it.com/jira/browse/SDKCF-4170):** Updated support link in documentation.

### 7.2.1 (2021-08-18)
* **[SDKCF-4052](https://jira.rakuten-it.com/jira/browse/SDKCF-4052):** Fixed crash due to exception thrown when registering network callback to `ConnectivityManager`. The root cause of the crash is suspected to be these Android platform issues [#175055271](https://issuetracker.google.com/issues/175055271).

### 7.2.0 (2021-07-15)
* **[SDKCF-3575](https://jira.rakuten-it.com/jira/browse/SDKCF-3575):** Update ManifestConfig dependency to use MavenCentral version.
* **[SDKCF-3610](https://jira.rakuten-it.com/jira/browse/SDKCF-3610):** Add analytics-idtoken module for setting member identifier and triggering ID SDK login events. Please see [usage](./android-member-identifier) section for details.
* **[SDKCF-3627](https://jira.rakuten-it.com/jira/browse/SDKCF-3627):** Tracking mobile network mnc and mnetw events using Dual Sim phones. Please see [usage](./android-user-guide#-mobile-network-automatic-parameters) section for details.
* **[SDKCF-3549](https://jira.rakuten-it.com/jira/browse/SDKCF-3549):** Fixed out-of-memory issue reported by RFR due to unclosed database after transaction.
* **[SDKCF-3638](https://jira.rakuten-it.com/jira/browse/SDKCF-3638):** Updated the "compileSDKVersion" to Android API Level 30 to meet Google Requirements.

### 7.1.0 (2021-04-02)
* **[SDKCF-3162](https://jira.rakuten-it.com/jira/browse/SDKCF-3162):** Add [automatic event tracking](./android-auto-tracking) configuration.
* **[SDKCF-3430](https://jira.rakuten-it.com/jira/browse/SDKCF-3430):** Deprecate `AnalyticsManager#enablePageViewTracking(boolean)` API and will be removed in next major version.
  - Use `AnalyticsManager#setShouldTrackEventHandler(ShouldTrackEventHandler)` instead.
* **[SDKCF-3530](https://jira.rakuten-it.com/jira/browse/SDKCF-3530):** Fix issue regarding user id still present after logout.
* Migrated module implementation to Kotlin

### 7.0.0 (2021-01-20)
* **[SDKCF-3159](https://jira.rakuten-it.com/jira/browse/SDKCF-3159):** Make the endpoint configuration mandatory in public SDK and optional in private SDK
  - When using public SDK, RAT API Base URL should be defined in manifest meta-data. Please refer to [Configuration](./android-user-guide#configuration) sections for details.
* **[SDKCF-2908](https://jira.rakuten-it.com/jira/browse/SDKCF-2908):** **Breaking Change:** Removed deprecated APIs and classes
  - `AnalyticsManager#getRpCookie(RpCookieConsumer, RpCookieFetcher.RpCookieFetchingErrorListener)` API
  - `RpCookieFetchingErrorListener` class
  - `RatTracker#getRpCookie(@NonNull Consumer<HttpCookie> callback)` API
  - `Consumer<T>` class

### 6.9.1 (2021-01-13)
* **[SDKCF-3037](https://jira.rakuten-it.com/jira/browse/SDKCF-3037):** Remove persistent behavior of runtime configuration of endpoint. Endpoint is reset to default when app is killed and restarted.
* **[SDKCF-3161](https://jira.rakuten-it.com/jira/browse/SDKCF-3161):** Update documentation for `AnalyticsManager#getRpCookie()` regarding callbacks that are now called in background (non-UI) thread due to dependency change from Volley to OkHttp. Please see [sample code](./android-rpcookie-callback) for handling UI changes inside the callbacks.

### 6.9.0 (2020-12-04)
* **[SDKCF-2894](https://jira.rakuten-it.com/jira/browse/SDKCF-2894):** Add [`setEndpoint`](./android-runtime-endpoint) API for runtime configuration of endpoint.
* **[SDKCF-2968](https://jira.rakuten-it.com/jira/browse/SDKCF-2968):** Change API used in retrieving entry count to fix spike in CPU usage.

### 6.8.1 (2020-11-13)
* **[SDKCF-2973](https://jira.rakuten-it.com/jira/browse/SDKCF-2973):** Fixed formatting issue in debug logger that could cause a crash when debug logging was enabled in release builds.

### 6.8.0 (2020-11-02)
* **[SDKCF-2844](https://jira.rakuten-it.com/jira/browse/SDKCF-2844):** Add enabling App to Web tracking continuity
* **[SDKCF-2865](https://jira.rakuten-it.com/jira/browse/SDKCF-2865):** Add main looper to handle background thread during location retrieval
* **[SDKCF-2875](https://jira.rakuten-it.com/jira/browse/SDKCF-2875):** Fix location details still sent when device location is OFF

### 6.7.1 (2020-09-03)
* **[SDKCF-2758](https://jira.rakuten-it.com/jira/browse/SDKCF-2758):** Fix "mnetw" field value for 3G and 4G.

### 6.7.0 (2020-08-24)
* **[SDKCF-2621](https://jira.rakuten-it.com/jira/browse/SDKCF-2621):** Replace Volley network client with OkHttp.
  - The `AnalyticsManager#getRpCookie(RpCookieConsumer, RpCookieFetcher.RpCookieFetchingErrorListener)` API is now deprecated and will be removed in next major version.
  - Please use the `AnalyticsManager#getRpCookie(RpCookieConsumer, RpCookieErrorListener)` API which provides `Exception` instead of `VolleyError` for error details.
* **[SDKCF-2657](https://jira.rakuten-it.com/jira/browse/SDKCF-2657):** Add `setUserId` API.
* **[SDKCF-2694](https://jira.rakuten-it.com/jira/browse/SDKCF-2694):** Sets "UserID" field to "NO_LOGIN_FOUND" when user is not logged-in.
* **[SDKCF-2708](https://jira.rakuten-it.com/jira/browse/SDKCF-2708):** Fix accessibility of `RpCookieFetchingErrorListener`. Use `RpCookieErrorListener` instead.

### 6.6.0 (2020-07-22)
* **[SDKCF-2627](https://jira.rakuten-it.com/jira/browse/SDKCF-2627):** Change Push Notification event tracking. Event is sent whether the app is active or not.
* **[SDKCF-2605](https://jira.rakuten-it.com/jira/browse/SDKCF-2605):** Change the default minimum batching delay from 60s to 1s.
* **[SDKCF-2545](https://jira.rakuten-it.com/jira/browse/SDKCF-2545):** Deprecate usage of `LocalBroadcastManager` for receiving Analytics events. Support for `LocalBroadcastManager` will be removed in the next major version release of the SDK, so, if you are currently using it, please migrate to using [`Event`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/Event.kt) instead.
* Removed runtime dependency on Android Support libraries (support-v4).

### 6.5.0 (2020-07-01)
* **[SDKCF-2494](https://jira.rakuten-it.com/jira/browse/SDKCF-2494):** Fix so that all SQLite operations run on a background thread. Previously, there were cases where the database could be accessed from the main thread. Also updated so that the opening of the analytics database happens from a background thread the first time the the database is used, rather than at App initialization.
* **[SDKCF-1277](https://jira.rakuten-it.com/jira/browse/SDKCF-1277):** Bugfix: A new unique session ID (`cks`) was not being generated when the app was launched from the background.
* **[SDKCF-1278](https://jira.rakuten-it.com/jira/browse/SDKCF-1278):** Bugfix: `mnetw` (network type) should be set to an empty string when the device is offline, i.e. `"mnetw": ""`. Previously, this value was being set to `-1`.
* **[SDKCF-279](https://jira.rakuten-it.com/jira/browse/SDKCF-279)** Bugfix: Incorrect value was being used for `days_since_last_use` and `days_since_first_use` when zero. Should be `0` but was previously being set as `0.0`.
* **[SDKCF-2083](https://jira.rakuten-it.com/jira/browse/SDKCF-2083):** Feature: Add "title" custom parameter to "pv" events. This will be set to the value returned by `Activity#getTitle`.

### 6.4.0 (2020-04-01)
* **[SDKCF-2219](https://jira.rakuten-it.com/jira/browse/SDKCF-2219):** Added an option to disable sending RAT cookies to non-RAT domains.
* **[SDKCF-2148](https://jira.rakuten-it.com/jira/browse/SDKCF-2148):** Added copyright notice in a LICENSE file in stable SDK repos.

### 6.3.1 (2020-03-05)
* **[SDKCF-2106](https://jira.rakuten-it.com/jira/browse/SDKCF-2106):** Fix for crash that could potentially occur when DB already exists but the rakuten_analytics table does not. This case could occur if the implementing App or another SDK in the App is already using a database with the same name that the Analytics SDK uses (`database_analytics`).

### 6.3.0 (2019-11-21)
* **[SDKCF-1522](https://jira.rakuten-it.com/jira/browse/SDKCF-1522):** Moved RP Cookie fetching from `analytics-rat` module too `analytics-core` module. This adds a new API at [`AnalyticsManager#getRpCookie`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/AnalyticsManager.kt) and deprecates [`RatTracker#getRpCookie`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt).
* **[SDKCF-1571](https://jira.rakuten-it.com/jira/browse/SDKCF-1571):** Fixed bug where events were not sent when the Rp Cookie is not available. RAT domains outside of Japan, such as https://rat.rakuten.fr, do no return an Rp Cookie, so the Analytics SDK was not working when trying to use these domains.
* **[SDKCF-1574](https://jira.rakuten-it.com/jira/browse/SDKCF-1574):** Updated docs for [SchedulingStrategy](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/SchedulingStrategy.kt) to make the default behavior more clear.
* Fixed an issue where a different Rp Cookie could be returned to the App on first launch than is used internally by Analytics if you try to retrieve the Rp Cookie immediately at launch time (due to a race condition with the fetch performed internally in the SDK).

### 6.2.0 (2019-09-25)
* **[SDKCF-1162](https://jira.rakuten-it.com/jira/browse/SDKCF-1162):** Added support for targeting Android 10 (SDK 29). You must upgrade to this version if you wish to target Android 10 because otherwise this SDK will crash if your App has been granted the `READ_PHONE_STATE` permission. Android 10 has restricted the usage of device identifiers, so Android 10 devices will now use a hash of the Android ID for the `ckp` value.

### 6.1.0 (2019-07-30)
* **[SDKCF-1115](https://jira.rakuten-it.com/jira/browse/SDKCF-1115):** Add compatibility with Gradle 5+.
* **[SDKCF-878](https://jira.rakuten-it.com/jira/browse/SDKCF-878):** Update Google Play Services libraries. Removed `com.google.android.gms:play-services-basement` dependency and replaced with `com.google.android.gms:play-services-ads-identifier:16.0.0`.

### 6.0.1 (2019-01-16)
* **[SDKCF-1042](https://jira.rakuten-it.com/jira/browse/SDKCF-1042):** Fix concurrency exception crash which occasionally occurs on some devices

### 6.0.0 (2019-01-16)
* **[SDKCF-735](https://jira.rakuten-it.com/jira/browse/SDKCF-735):** Increase `minSdk` to 21.

### 5.2.1 (2018-11-27)
- Rp cookie is now handled by a [`CookieManager`](https://developer.android.com/reference/java/net/CookieManager). This has a couple of side effects:
  - The Rp Cookie is available to be retrieved, added, or removed by SDK users in the [`CookieStore`](https://developer.android.com/reference/java/net/CookieStore) of the App's default [`CookieManager`](https://developer.android.com/reference/java/net/CookieManager).
  - If the implementing App sets its own `CookieManager` via [`CookieHandler#setDefault`](https://developer.android.com/reference/java/net/CookieHandler.html#setDefault(java.net.CookieHandler)), the SDK will not be able to persist the Rp cookie between App launches. In this case, the App will need to implement its own method for persisting the Rp cookie.
- **[SDKCF-602](https://jira.rakuten-it.com/jira/browse/SDKCF-602):** Wait for advertising ID is loaded before sending events to analytics trackers.
- **[SDKCF-634](https://jira.rakuten-it.com/jira/browse/SDKCF-634):** Update Volley to v1.1.1 to support Apps targeting API 28.

### 5.2.0 (2018-05-30)
- **[SDKCF-26](https://jira.rakuten-it.com/jira/browse/SDKCF-26):** Add type validation for acc and aid values
- **[SDKCF-4](https://jira.rakuten-it.com/jira/browse/SDKCF-4):** Disabled escaping HTML characters in values sent to RAT
- **[SDKCF-24](https://jira.rakuten-it.com/jira/browse/SDKCF-24):** Add option to enable/disable automatic page view tracking
- **[SDKCF-157](https://jira.rakuten-it.com/jira/browse/SDKCF-157):** Allow RAT API endpoint to be configured in meta-data. Also deprecated `com.rakuten.tech.mobile.analytics.Staging` in meta-data.

### 5.1.0 (2018-04-05)
- **[SDKCF-25](https://jira.rakuten-it.com/jira/browse/SDKCF-25):** Add support for stitch SDK integration
- **[REM-26014](https://jira.rakuten-it.com/jira/browse/REM-26014):** Drop support for events sent by cardinfo and content push

### 5.0.0 (2018-04-02)
- Remove deprecated APIs and behavior, internal restructuring, simplify API & configuration.
- **[REM-25318](https://jira.rakuten-it.com/jira/browse/REM-25318):** Improve SDK tracking capabilities.
- **[REM-25565](https://jira.rakuten-it.com/jira/browse/REM-25565):** Remove device information as dependency
- **[REM-25239](https://jira.rakuten-it.com/jira/browse/REM-25239):** Allow developers to send specific events to different RAT account ID / app ID.

### 4.9.1 (2018-01-26)
- **[REM-25621](https://jira.rakuten-it.com/jira/browse/REM-25621):** Rp cookie was cached incompletely. That problem has been fixed.

### 4.9.0 (2017-12-21)
#### New Features
- **[REM-24747](https://jira.rakuten-it.com/jira/browse/REM-24747):** Sending Rp cookie to RAT to
 uniquely identify a user regardless of its membership status.

#### <font color="#ff0000">Known issues</font>
- **[REM-25621](https://jira.rakuten-it.com/jira/browse/REM-25621):** Rp cookie is cached incompletely. Fixed in 4.9.1

### 4.8.1 (2017-11-28)
#### Bugfixes
- **[REM-25075](https://jira.rakuten-it.com/jira/browse/REM-25075):** Crash that was introduced as a regression in 4.8.0.

### 4.8.0 (2017-11-16)
#### <font color="#ff0000">This version was un-published due to a critical issue, please use 4.8.1 instead</font>
- **[REM-25075](https://jira.rakuten-it.com/jira/browse/REM-25075):** Crash that was introduced as a regression in this release

#### New Features
- **[REM-24170](https://jira.rakuten-it.com/jira/browse/REM-24170):** Allow SDK users to enable/disable debug logs of the SDK. The SDK will still log certain messages on info, warn and error level, which are intended to make SDK users aware of problems.

#### Bugfixes
- **[REM-23959](https://jira.rakuten-it.com/jira/browse/REM-23959):** In some cases the `cp.ref_type` did report `external` incorrectly for page view events (`etype` of `pv`). This issue is resolved now.
- **[REM-23959](https://jira.rakuten-it.com/jira/browse/REM-23959)**: Fixes a bug that sometimes misclassified page views as `cp.ref_type = "external"` instead of `internal`.
- **[REM-24764](https://jira.rakuten-it.com/jira/browse/REM-24764)**: Fixes crash that occured is very specific corner cases

### 4.7.0 (2017-10-04)
#### New Features
- **[REM-23056](https://jira.rakuten-it.com/jira/browse/REM-23056):** Adds easier integration for tracking of other SDK modules via SDK module. Necessary to support most recent [automatic event tracking](https://jira.rakuten-it.com/jira/browse/REM-23431) of SDK usage

#### <font color="#ff0000">Known issues</font>
- **[REM-23959](https://jira.rakuten-it.com/jira/browse/REM-23959):** In some cases the `cp.ref_type` will report `external` incorrectly for page view events (`etype` of `pv`).
- **[REM-23992](https://jira.rakuten-it.com/jira/browse/REM-23992):** On orientation changes cause multiple events of type `_rem_end_session`, `_rem_launch`  and `_rem_visit`. If your app has fixed orientation this does not affect you.

### 4.6.0 (2017-08-21)
- Upgrade following dependencies:
    + Support Library to 26.0.0
    + Gson to 2.8.1
    + Google Play Services to 11.0.4
- Fix Bug: `_rem_logout` event was missing the user ID [REM-21775](https://jira.rakuten-it.com/jira/browse/REM-21775)
- Add new RAT `deviceid_list` to payload [REM-22318](https://jira.rakuten-it.com/jira/browse/REM-22318)

### 4.5.0 (2017-07-25)
- Deprecations:
    + `RATResponse` constructor
    + `RATTracker#initialize`
    + `RATTracker#getAppId`
    + `AppConfig`
    + `DeviceUtil`
    + `LogUtil`
    + `NetworkStateMonitor`
    + `StringUtility`
- **[REM-21932](https://jira.rakuten-it.com/jira/browse/REM-21932)**: Upgrade support lib to 25.2.0 and google play services to 11.0.1
- **[REM-21781](https://jira.rakuten-it.com/jira/browse/REM-21781)**: Fixed missing `_rem_install` event after updating an app

### 4.4.0
- **[REM-21496](https://jira.rakuten-it.com/jira/browse/REM-21496)**: Allow configuration of `DeliveryStrategy` in `RATTracker`
- **[REM-21637](https://jira.rakuten-it.com/jira/browse/REM-21637)**: Remove minification of the library module, provide consumer proguard file (no configuration necessary on application side)
- **[REM-21636](https://jira.rakuten-it.com/jira/browse/REM-21636)**: Allow configuration of staging (true/false), RAT account id and RAT application id via the applications manifest. This change deprecates `AnalyticsManager#setStaging`, `RATTracker#setAccountId` and `RATTracker#setApplicationId`

There are 2 known issues in 4.4.0:
- **[REM-21781](https://jira.rakuten-it.com/jira/browse/REM-21781)**: `_rem_install` is missing when updating an app
- **[REM-21780](https://jira.rakuten-it.com/jira/browse/REM-21780)**: `_rem_push_notify_value` uses "msg:xxx" instead of "rid:xxx" even when Report Id is enabled

### 4.3.1
- **[REM-21495](https://jira.rakuten-it.com/jira/browse/REM-21495)**: Fix potential `NullPointerException` in AnalyticsManager, introduced in Analytics 4.2.0
- Fix last closed activity still being reported as active and not being released until a new one is started, in automatic view tracking. This was also introduced in 4.2.0 and has an impact on RAT reports.
- Many bogus ckp RAT fields (unique device identifier) are now filtered out.

### 4.3.0
- Initialization of the module is now fully automatic. `AnalyticsManager#initialize()` has been deprecated.
- Reduced the memory footprint of automatic page view tracking by half by not keeping a strong reference to the previous activity anymore. This comes with a minor change: An**[REM-19146](https://jira.rakuten-it.com/jira/browse/REM-19146)**: alyticsManager.State.lastVisitActiviy is now deprecated, and always null
- **[REM-19343](https://jira.rakuten-it.com/jira/browse/REM-19343)**: Events are not tracked on first launch

### 4.2.0
- Added support for Staging.
- **[REM-18272](https://jira.rakuten-it.com/jira/browse/REM-18272)**: Setter for the user tracking identifier was missing
- Added automatic tracking of push notification conversions.
- Added automatic page view tracking.
- **[REM-18281](https://jira.rakuten-it.com/jira/browse/REM-18281)**: Fixed improper scheduling of uploads to RAT

### 4.1.2
- **[REM-18160](https://jira.rakuten-it.com/jira/browse/REM-18160)**: Incorrect setting for custom parameters to RAT

### 4.1.1
- **[REM-17861](https://jira.rakuten-it.com/jira/browse/REM-17861)**: Fixed App Crash Issue

### 4.1.0
- Major rewrite.
- Support for custom event trackers.
- Automatic KPI tracking from other parts of our SDK.
- Deprecated AnalyticsManager.Event.Builder(), AnalyticsManager.Item, AnalyticsManager.setAccountId(), and AnalyticsManager.setApplicationId().
- Features added _rem_install's _sdk_info and _app_info tracking.

### 4.0.4
- **[REM-13830](https://jira.rakuten-it.com/jira/browse/REM-13830)**: Obtain Google Play Advertising Id (AAID)
- **[REM-14126](https://jira.rakuten-it.com/jira/browse/REM-14126)**: Incorrect user agent for Android
- **[REM-14285](https://jira.rakuten-it.com/jira/browse/REM-14285)**: ts1 (in app timestamp) is wrong in Android
- **[REM-14206](https://jira.rakuten-it.com/jira/browse/REM-14206)**: Track app_name and app_ver separately

### 4.0.3
- **[REM-12934](https://jira.rakuten-it.com/jira/browse/REM-12934)**: Fix: Log related bug

### 4.0.2
- **[REM-13637](https://jira.rakuten-it.com/jira/browse/REM-13637)**: Remove location permission

### 4.0.1
- **[REM-12725](https://jira.rakuten-it.com/jira/browse/REM-12725)**: Remove external storage permission

### 4.0.0
- **[REM-9075](https://jira.rakuten-it.com/jira/browse/REM-9075)**: Remove RakutenAPI Dependency
- Minimum Android SDK 15
- Major change in AnalyticsManager API

### 3.2.2
- **[REM-10450](https://jira.rakuten-it.com/jira/browse/REM-10450)**: Tracking request data not correctly encoded

### 3.2.1 (Broken)
- Fix: Bugs and crashes in AnalyticsManager
- **[REM-7616](https://jira.rakuten-it.com/jira/browse/REM-7616)**: Fix: Location not sent on Android M

### 3.2.0 (Broken)
- Removed PHONE_STATE permission
- **[REM-4747](https://jira.rakuten-it.com/jira/browse/REM-4747)**: Added event tracking via builder

### 3.1.0 (Broken)
- **[REM-4152](https://jira.rakuten-it.com/jira/browse/REM-4152)**: Switch to Volley
- **[REM-7616](https://jira.rakuten-it.com/jira/browse/REM-7616)**: Android 6.0 support

### 3.0.6 (Deprecated)
- **[REM-2837](https://jira.rakuten-it.com/jira/browse/REM-2837)**: Migration to new Artifactory
- Update documentation
- Add Internet permission to Manifest

### 3.0.4 (Deprecated)
- **[REM-2837](https://jira.rakuten-it.com/jira/browse/REM-2837)**: Migration to new Artifactory

### 3.0.3 (Deprecated)
- **[REM-1256](https://jira.rakuten-it.com/jira/browse/REM-1256)**: Bugfix: Custom Parameter are limited to 15 characters

### 3.0.2 (Deprecated)
- New VersionTracker endpoint (REM-1028)
- **[REM-1029](https://jira.rakuten-it.com/jira/browse/REM-1029)**: Bugfix: Pagetype property not correctly tracked

### 3.0 (Deprecated)
- Item Builder for AnalyticsManager [SDK-3173](https://jira.rakuten-it.com/jira/browse/SDK-3173), [SDK-3173](https://jira.rakuten-it.com/jira/browse/SDK-3173), [SDK-3175](https://jira.rakuten-it.com/jira/browse/SDK-3175)

### 2.x (Deprecated)
- Initial Version
