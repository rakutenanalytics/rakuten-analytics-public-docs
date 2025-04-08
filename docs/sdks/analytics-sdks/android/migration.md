---
sidebar_position: 4
id: android-analytics-migration
slug: /analytics-sdk/android/android-migration
title: Migration Guide
---
## Migration Guide

## Migration Guide 4.x.x -> 5.0.0
There are many changes in this new major version of the analytics sdk. To avoid conflicts with transitive dependencies onto the analytics SDK we decided to change the identifiers and java package our classes live in - so **it is safe to run analytics v4 and v5 in parallel in the same application**. Follow the steps below to update your app to the newest state.

### Update Identifiers
The package name of the analytics modules have changed, as well as the maven group id and meta identifiers, so you will have to update identifiers in...

#### ...`build.gradle` files

``` diff
{
-  compile 'jp.co.rakuten.sdtd:analytics:4.X.Y'
+  compile 'com.rakuten.tech.mobile.analytics:analytics:5.0.0'
// implementation instead of compile if you are using the android gradle plugin version 3 or newer
}
```

#### ...`import` statements in source files

Android studio can help you with the "Optimize Imports" action. For example:

``` diff
- import jp.co.rakuten.sdtd.analytics.AnalyticsManager;
- import jp.co.rakuten.sdtd.analytics.Consumer;
- import jp.co.rakuten.sdtd.analytics.RATTracker;
- import jp.co.rakuten.sdtd.analytics.SendDataCallback;
- import jp.co.rakuten.sdtd.analytics.SendDataErrorCallback;
+ import com.rakuten.tech.mobile.analytics.AnalyticsManager;
+ import com.rakuten.tech.mobile.analytics.Consumer;
+ import com.rakuten.tech.mobile.analytics.RatTracker;
+ import com.rakuten.tech.mobile.analytics.SchedulingStrategy;
```

#### ...`meta-data` tags in `AndroidManifest.xml`

``` diff
<manifest>
  <application>
-   <meta-data  android:name="jp.co.rakuten.sdtd.analytics.RATAccountId"
+   <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                android:value="MY_RAT_ACCOUNT_ID" />
-   <meta-data  android:name="jp.co.rakuten.sdtd.analytics.RATApplicationId"
+   <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATApplicationId"
                android:value="MY_RAT_APPLICATION_ID" />
    </application>
</manifest>
```

### Update Usage of public API
The public API of the SDK changed significantly, it is a lot leaner and simpler in version 5. The changes are listed in the tables below. 🚫 = removed/non-existing, ✅ = stays the same.

#### Interfaces

| Analytics v4                                                | v5              |
|-------------------------------------------------------------|-----------------|
| `Consumer`                                                  | ✅              |
| `Tracker`                                                   | ✅              |
| `AnalyticsManager.Event.Name`                               | 🚫              |
| `AnalyticsManager.Event.Parameter`                          | 🚫              |
| `NetworkStateMonitor.OnBackgroundDataMonitorChangeListener` | 🚫              |
| `SendDataCallback`                                          | 🚫              |
| `SendDataErrorCallback`                                     | 🚫              |
| 🚫                                                          | [`EventDelivery`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/EventDelivery.kt) |

#### Classes

| Analytics v4                                                | v5                     |
|-------------------------------------------------------------|------------------------|
| `AnalyticsInitProvider`                                     | 🚫                     |
| `AnalyticsManager`                                          | ✅                     |
| `AnalyticsManager.Event`                                    | [`Event`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/Event.kt) |
| `AnalyticsManager.Event.Builder`                            | 🚫                     |
| `AnalyticsManager.Item`                                     | 🚫                     |
| `AnalyticsManager.Item.Builder`                             | 🚫                     |
| `AnalyticsManager.State`                                    | [`MetaData`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt) |
| `AppConfig`                                                 | 🚫                     |
| `DeliveryStrategy`                                          | [`SchedulingStrategy`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/SchedulingStrategy.kt)   |
| `DeviceUtil`                                                | 🚫                     |
| `GeoLocationInfo`                                           | 🚫                     |
| `GeoLocationManager`                                        | 🚫                     |
| `LogUtil`                                                   | 🚫                     |
| `NetworkStateMonitor`                                       | 🚫                     |
| `RATTracker`                                                | [`RatTracker` ](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt)          |
| `StringUtility`                                             | 🚫                     |

#### Enums

| Analytics v4                                                | v5                                                                                                                                                                 |
|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `AnalyticsManager.State.LoginMethod`                        | [`MetaData.LoginMethod`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt)  |
| `AnalyticsManager.State.LogoutMethod`                       | [`MetaData.LogoutMethod`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/MetaData.kt) |
| 🚫                                                          | [`RatEnvironment`](https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatEnvironment.kt)  |

#### Changes in `AnalyticsManager` and `RatTracker`

| Analytics v4                                                | v5                                                                                                                                                                                                                                                                                                                                                                                                 |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `AnalyticsManager#INSTANCE`                                 | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/AnalyticsManager.kt">`AnalyticsManager#instance()`</a>                                                                                                                                                                                                        |
| `AnalyticsManager#initialize(Context)`                      | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#initialize(Context, RequestQueue)`        | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#setCallbacks(SendDataCallback, SendDataErrorCallback)` | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#setAccountId(long)`                       | 🚫 use `meta-data`                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#setApplicationId()long`                   | 🚫 use `meta-data`                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#trackAdvertisingIdentifier(boolean)`      | 🚫 use `meta-data` or <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#trackAdvertisingIdentifier(boolean)`</a>                                                                                                                                                                     |
| `AnalyticsManager#setStaging(boolean)`                      | 🚫 use `meta-data`                                                                                                                                                                                                                                                                                                                                                                                 |
| `AnalyticsManager#add(Tracker)`                             | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `AnalyticsManager#enableLocation(boolean)`                  | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RATTracker#INSTANCE`                                       | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#instance()`</a>                                                                                                                                                                                                                    |
| `RATTracker#event(String, Map<String, Object>)`             | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RATTracker#getAppId()`                                     | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `RATTracker#getGuid()`                                      | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RATTracker#getRpCookie(Consumer<HttpCookie>)`              | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RATTracker#initialize(Context, RequestQueue)`              | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `RATTracker#process(Event, State)`                          | ✅                                                                                                                                                                                                                                                                                                                                                                                                  |
| `RATTracker#setApplicationtId(long)`                        | 🚫                                                                                                                                                                                                                                                                                                                                                                                                 |
| `RATTracker#setDeliveryStrategy(DeliveryStrategy`           | use <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#getEventDelivery()`</a> and <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/EventDelivery.kt">`EventDelivery#setSchedulingStrategy()`</a> |
| 🚫                                                          | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#trackAdvertisingIdentifier`</a>                                                                                                                                                                                                    |  
| 🚫                                                          | <a href="https://github.com/rakutenanalytics/android-analytics/blob/master/analytics/src/main/java/com/rakuten/tech/mobile/analytics/RatTracker.kt">`RatTracker#getEventDelivery()`</a>                                                                                                                                                                                                            |

## Migration Guide 7.x.x/8.x.x -> 9.x.x

### AnalyticsManager.instance() API Changes
Starting v9.0.0, the `AnalyticsManager.instance()` API will now return `null` when the SDK was not initialized instead of throwing `SdkNotInitializedException` exception.
* The SDK will re-initialized on next app launch.

All access to the `AnalyticsManager.instance()` API should have null checking.

#### Example
**Before:**
```kotlin
AnalyticsManager.instance().enableLocation(true)
AnalyticsManager.instance().getRpCookie(...)
```

**After:**
```kotlin
AnalyticsManager.instance()?.enableLocation(true)
AnalyticsManager.instance()?.getRpCookie(...)
```

### Member Identifier APIs Changes
Starting v9.0.0, setting and removing of member identifier is now handled by the `AnalyticsManager` class.

#### Example
**Before:**
```kotlin
RatIdToken.setMemberIdentifier(memberIdentifier) // Set member identifier and send login event.
...
RatIdToken.removeMemberIdentifier() // Remove member identifier and send logout event.
...
RatIdToken.setMemberError(error) // Send login failure event.
```

**After:**
```kotlin
AnalyticsManager.instance()?.setMemberIdentifier(memberIdentifier) // Set member identifier and send login event.
...
AnalyticsManager.instance()?.removeMemberIdentifier() // Remove member identifier and send logout event.
...
AnalyticsManager.instance()?.setMemberError(error) // Send login failure event.
```

### Push SDK Events Tracking (moved to Push SDK v9.11.0)
Starting v9.3.0, all the rem push events `_rem_push_notify` `_rem_push_received` `_rem_push_auto_register` `_rem_push_auto_unregister` `_rem_push_cv` tracking mechanism has been moved to Push SDK.
Please use Push SDK version >= 9.11.0 to your app in order to track events for push notification:
https://github.com/rakuten-mag/android-push.git

<font color="red">Note:</font> If you want to use RAT SDK v9.3.0 with Push SDK in your app then you must have to upgrade the Push SDK version to 9.11.0, otherwise the push event tracking will not work. 

## Migration Guide 10.x.x -> 11.x.x
Starting from v11.0.0, the automatic tracking of User SDK login's events listed below has been disabled:
* `_rem_login`  event.
* `_rem_logout` even`.
* `userid`  parameter on all event payloads when the user is logged in.

To enable events tracking in your Application, follow the steps outlined below:
#### 1. Add the `LocalBroadcastManager` to your app's build.gradle file.
```groovy
implementation 'androidx.localbroadcastmanager:localbroadcastmanager:1.1.0'
```

#### 2. Initialize and register the `SDKBroadcastReceiver` in the `onCreate()` method of your `Application` class.
```kotlin
    import android.app.Application
    import androidx.localbroadcastmanager.content.LocalBroadcastManager
    import com.rakuten.tech.mobile.analytics.SdkBroadcastReceiver
    
    class MyApplication: Application() {
        override fun onCreate() {
            super.onCreate()
            
            SdkBroadcastReceiver.getInstance().apply {
                LocalBroadcastManager.getInstance(this@MyApplication)
                    .registerReceiver(this, sdkIntentFilter)
            }
        }
    }
```
For more details, please refer to the following documentation:
* [Discontinued automatic tracking of User SDK login events on v11.0.0](https://confluence.rakuten-it.com/confluence/display/RAT/Analytics+SDK%3A+%5BAndroid%5D+Discontinued+automatic+tracking+of+User+SDK+login+events+on+v11.0.0)
* Sample app repository: [android-user-sdk-login-sample](https://ghe.rakuten-it.com/rakutenanalytics/android-user-sdk-login-sample)

## Migration Guide 9.x.x -> 10.x.x
### Maven package repository migration
Starting from v10.1.0, the repository for the Analytics SDK Maven components has changed. Therefore, you will need to update the repository URL in your build.gradle file as follows: 
Under the project level, add Maven Central to your repositories:
```groovy
repositories{
    ...
    mavenCentral()
    ...
}
```
In the `build.gradle` file of your app module, update the project's dependencies to use the new version of the Analytics SDK as follow:

```groovy
dependencies{
    ...
    // Make sure to replace 'com.rakuten.tech.mobile.analytics:analytics:...' with the new group ID, artifact ID:
    // 1- remove this
    implementation "com.rakuten.tech.mobile.analytics:analytics:OLD_VERSION"
    // 2 - add this
    implementation "io.github.rakutenanalytics:analytics:10.1.0"
}
```

### Issues handling
If you are using Analytics SDK version 10.1.0 or higher, along with other SDKs that have a strict dependency on an Analytics SDK version older than 10.0.1, you may encounter build-time issues due to the migration of the Maven package repository. 
To resolve this issue, you should exclude the older version of the Analytics SDK `com.rakuten.tech.mobile.analytics` from the SDK that implements it, as demonstrated in the example below:

``` groovy
implementation "io.github.rakutenanalytics:analytics:10.1.0"
implementation ('com.rakuten.tech.mobile.mysdk:mysdk:${version}'){
    exclude group: 'com.rakuten.tech.mobile.analytics', module:'analytics-core'
}
```

Please be aware that there are no significant changes to the public APIs from Analytics version 10.0.x to 10.1.x. Please refer to the [Changelog](./android-changelog) section for details on bug fixes and improvements in the 10.1.x versions.

## Remove deprecated APIs
Since 10.0.0, the following deprecated APIs are removed. Please note the new APIs.
1. `AnalyticsManager.getRpCookie(callback: RpCookieConsumer, fetchError: RpCookieErrorListener?)`
2. `AnalyticsManager.enablePageViewTracking(trackPageViews: Boolean)`
3. `AnalyticsManager.setShouldTrackEventHandler(handler: ShouldTrackEventHandler?)`

**Before:**
```kotlin
AnalyticsManager.instance()?.getRpCookie(callback: RpCookieConsumer, fetchError: RpCookieErrorListener?)

AnalyticsManager.setShouldTrackEventHandler(handler: ShouldTrackEventHandler?)

AnalyticsManager.instance()?.enablePageViewTracking(trackPageViews: Boolean)
```
**After:**
```kotlin
AnalyticsManager.instance()?.getRpCookie(callback: (value: HttpCookie?) -> Unit, fetchError: ((exception: Exception?) -> Unit)?)

AnalyticsManager.setShouldTrackEventHandler(handler: (eventName: String) -> Boolean)

//enablePageViewTracking uses setShouldTrackEventHandler(ShouldTrackEventHandler) instead
```
