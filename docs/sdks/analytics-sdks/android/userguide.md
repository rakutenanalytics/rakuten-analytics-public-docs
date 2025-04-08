---
sidebar_position: 1
id: android-user-guide
slug: /analytics-sdk/android/android-user-guide
title: User Guide
---

## Android Analytics User Guide
The Analytics modules enable applications to record user activity and automatically send tracking events to the [Rakuten Analytics Tracker](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home).

## Requirements 
### Supported Android Versions
This SDK supports Android API level 26 (Oreo) and above.

### RAT Credentials
You must have an account ID and RAT endpoint (PROD or STG) to track events using the [Rakuten Analytics Tracker](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home). Apply for these credentials from this [form](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=5574865556) on the RAT site.

If you have any questions, you can contact us via the [support page](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924).

## Getting Started

To enable us to better support you, ensure you do the following *before* creating an [inquiry](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924):
  * Give the DLM `dev-rat-data-collection` access to your git source repo and include your repo URL on any inquiry ticket
  * Ideally, please also give the members of DLM `dev-rat-data-collection` access to your crash reporting dashboard e.g. Firebase Crashlytics

### #1 Add dependency to your app's `build.gradle`

```groovy
repositories {
    mavenCentral()
}

dependency {
  implementation 'io.github.rakutenanalytics:analytics:${version}'
}
```
* For using Analytics SDK versions older than v10.1.0, please refer to the [Maven package repository migration](./android-migration#-maven-package-repository-migration).

### #2 Configure RAT Tracker in your app's `AndroidManifest.xml`
```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                android:value="MY_RAT_ACCOUNT_ID" />
  </application>
</manifest>
```

### #3 Track an event
```java
// Create Map for Parameters
Map<String, Object> params = new HashMap<>();
params.put("foo", "bar");

// Create event track it
RatTracker.event("click", params).track();
```

🎉 
You've just tracked your first event to RAT! Head over to [RAT's kibana](http://grp01.kibana.geap.intra.rakuten-it.com/) to confirm it. If you use staging use the [STG kibana](https://rat.intra.rakuten-it.com/stg-kibana/) instead.
Search for your logs you can filter kibana by account id (`acc`), app id (`aid`) or event type (`etype`) with a query similar to this `acc:MY_RAT_ACCOUNT_ID AND aid:MY_RAT_APPLICATION_ID AND etype:_rem_launch`.

## Next Steps
### How does tracking work?
The analytics SDK centers around 3 core concepts: events, trackers and the `AnalyticsManager`.


* Event: Data you want to track.
* AnalyticsManager: Manages trackers & generates meta data, distributes events to trackers.
* Trackers: Consumes events, e.g. `RatTracker` sends events to RAT. 

`RATTracker` is automatically registered and interacts with the [Rakuten Analytics Tracker (RAT)](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home). You can use `RatTracker#event(String, Map<String, Object>)` to create RAT events that target RAT (other trackers will still be able to receive those events).

The below snippet shows how these different components work together:

```java
// Create an event
Map<String, Object> params = new HashMap<>();
params.put("foo", "bar");
Event event = new Event("click", params);

// track an event
event.track(); // -> passed to all trackers, but RatTracker does not send it to RAT

// RAT tracker will only send events created via RatTracker#event(Map<String, Object>)
// Create & track an event for RAT
Event ratEvent = RatTracker.event("click", params);
ratEvent.track(); // -> passed to all trackers and RatTracker sends it to RAT

// Add a new tracker
Tracker loggingTracker = (Event event, MetaData metaData) -> {
    Log.d("TrackerLog", event.name);
    return false;
};
AnalyticsManager.add(loggingTracker);

// track events again
event.track(); ; // -> logged by loggingTracker, but RatTracker does not send it to RAT
ratEvent.track(); ; // -> logged by loggingTracker and RatTracker sends it to RAT
```

### Configuration
The analytics SDK is configured via manifest meta-data, the configurable values are:

| Field                                            | Datatype | Manifest Key                                                      | Optional | Default                      |
|--------------------------------------------------|----------|-------------------------------------------------------------------|----------|------------------------------|
| RAT account ID                                   | integer  | `com.rakuten.tech.mobile.analytics.RATAccountId`                  | ❌        | 🚫                           |
| RAT application ID                               | integer  | `com.rakuten.tech.mobile.analytics.RATApplicationId`              | ✅        | 1                            |
| RAT API Base URL                                 | String   | `com.rakuten.tech.mobile.analytics.RATEndpoint`                   | ✅        | `https://rat.rakuten.co.jp/` |
| Track Advertising ID                             | boolean  | `com.rakuten.tech.mobile.analytics.TrackAdvertisingId`            | ✅        | `true`                       |
| Track Location                                   | boolean  | `com.rakuten.tech.mobile.analytics.EnableLocation`                | ✅        | `true`                       |
| Track `mno` Parameters                           | boolean  | `com.rakuten.tech.mobile.analytics.TrackMnoParams`                | ✅        | `false`                      |
| Enable Debug Log                                 | boolean  | `com.rakuten.tech.mobile.analytics.EnableDebugLog`                | ✅        | `false`                      |
| Disable sending RAT cookies to non-RAT domains   | boolean  | `com.rakuten.tech.mobile.analytics.SetRatCookiesGlobally`         | ✅        | `true`                       |
| Enable App to WebView Tracking                   | boolean  | `com.rakuten.tech.mobile.analytics.EnableWebTracking`             | ✅        | `false`                      |
| Enable the App user-agent setting into a WebView | boolean  | `com.rakuten.tech.mobile.analytics.SetWebViewAppUserAgentEnabled` | ✅        | `true`                       |

If you want to send data to STG RAT use the staging endpoint as value for `com.rakuten.tech.mobile.analytics.RATEndpoint` as shown in the full example below.
Please refer to [RAT Credentials](./android-user-guide#rat-credentials) for retrieving endpoints.

#### Full Example

```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATAccountId"
                android:value="MY_RAT_ACCOUNT_ID" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATApplicationId"
                android:value="MY_RAT_APPLICATION_ID" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.RATEndpoint"
                android:value="MY_RAT_STG_ENDPOINT" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.TrackAdvertisingId"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableLocation"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableDebugLog"
                android:value="true" />
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.SetRatCookiesGlobally"
                android:value="false"/>
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableWebTracking"
                android:value="true" />
  </application>
</manifest>
```

#### Location Tracking
The SDK can track the location of the device by passively receiving location updates when other applications or services request them, or  network (wifi/celltower) locations. The location will be sent to all trackers for every event. To enable location tracking you need to request location permission for the tracking you want (on Android M and newer you need to request these permissions at runtime, see [the official developer docs](http://developer.android.com/training/permissions/requesting.html) for details). For example:

```xml
<manifest>
  <!-- track location (optional) -->
  <!-- fine location will request passively locations -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <!-- coarse location will request locations from wifi and cell towers -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
</manifest>
```

You can disable the location completely from the manifest metadata (e.g. if you want to use location permissions for other features but don't want the SDK registering for updates).

```xml
<manifest>
  <application >
    <meta-data  android:name="com.rakuten.tech.mobile.analytics.EnableLocation"
                android:value="false" />
  </application>
</manifest>
```
> **Warning:** The SDK does not _actively_ track the device's location even if the user has granted access to the app and the Location tracking is enabled. Instead, it passively monitors location updates captured by your application.
> To _actively_ track the device's location, please read the [Geo Location Tracking](./android-geo-tracking) section.

#### <a name="mobile-network-parameters"></a> Mobile Network Automatic Parameters
The SDK adds Mobile Network parameters Mobile Carrier Network `mcn`  and Mobile Network Type `mnetw` for every event you send whether it is automatic or manual. 

Mobile Carrier Network `mcnd`  and Mobile Network Type `mnetwd` parameters can also be tracked for Dual SIM functionality on Android N and newer. 

To enable this functionality you need to request READ_PHONE_STATE permission at runtime (see [the official developer docs](http://developer.android.com/training/permissions/requesting.html) for details). For example:

```xml
<manifest>
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
</manifest>
```
For more details see [Automatic Parameters](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticParameters)

#### <a name="mno-parameters"></a> `mno` Parameters
The SDK can track detailed mobile network related information such as cell information and signal strength. `mno` network tracking is disabled by default.

To enable this functionality,
1. Configure manifest metadata
```xml
<manifest>
  <application>
    <meta-data android:name="com.rakuten.tech.mobile.analytics.TrackMnoParams"
               android:value="true" />
  </application>
</manifest>
```

2. Request Phone and Location permissions at runtime (see [the official developer docs](http://developer.android.com/training/permissions/requesting.html) for details). For example:

```xml
<manifest>
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

For more details see [Automatic Parameters](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticParameters)

## <a name="standard-Events"></a> Standard Events
The SDK will automatically send events to the Rakuten Analytics Tracker for certain actions. The event type parameter for all of these events are prefixed with `_rem_`.

Examples are:

| Event Name            | Event Description                                   |
|-----------------------|-----------------------------------------------------|
| `_rem_init_launch`    | Application is launched for the first time ever.    |
| `_rem_launch`         | Application is launched.                            |
| `_rem_end_session`    | Application goes into background.                   |
| `_rem_update`         | Application is launched and its version number does not match the version number of the previous launch. |
| `_rem_login`          | User logged in successfully.                        |
| `_rem_logout`         | User logged out.                                    |
| `_rem_install`        | Application version is launched for the first time. |

For a full list see the [SDK Standard Event Spec](https://confluence.rakuten-it.com/confluence/display/RAT/Mobile+SDK+Tracking+Specification+for+RAT#MobileSDKTrackingSpecificationforRAT-AutomaticsEvents).

### Supported SDK versions
Automatic event tracking of other SDKs modules is supported for the following versions:

| SDK module            | Support since version |
|-----------------------|-----------------------|
| User SDK              | v4.1.1                |
| Push SDK              | v3.1.1                |
| Device Information    | v2.0.1                |
| Discover SDK          | v3.2.0                |
| Feedback SDK          | v2.0.3                |
| Ping SDK              | v3.0.1                |
| Points SDK            | v2.1.1                |
| InAppMessaging SDK    | v6.0.0                |

#### Automatically Generated State Attributes
The SDK will generate certain attributes about the state of the app and the device. These attributes are automatically generated and sent to all trackers (including `RATTracker`). They are pass in the  `MetaData` objects to all calls to `Tracker#process(Event, MetaData), so [custom trackers](./android-custom-tracker) can access them as well.

| State Property        | Description                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------|
| `userId`              | String uniquely identifying the currently logged-in user, if any. Starting v6.7.0, this property can be manually set by the application using `AnalyticsManager#setUserId` API. |
| `loggedIn`            | Boolean representing user's current logged in state.                                      |
| `advertisingId`       | Google Advertising Identifier.                                                            |
| `sessionId`           | Globally-unique string, updated every time a new session starts.                          |
| `sessionStart`        | Date & time of new session is start.                                                      |
| `deviceId`            | Globally-unique string identifying the current device across all Rakuten applications.    |
| `lastKnownLocation`   | Last known location of the device.                                                        |
| `currentVersion`      | Current app version.                                                                      |
| `lastVersion`         | Version of the app when it was last run.                                                  |
| `lastVersionLaunches` | Number of times the last-run version was launched.                                        |
| `initialLaunch`       | Date & time of first launch of the application.                                           |
| `lastLaunch`          | Date & time of last launch of the application, prior to the current run.                  |
| `lastUpdate`          | Date & time of first launch of the last-run version.                                      |

## <a name="rat-Examples"></a> RAT Examples
You can verify all RAT analytics events in [Kibana](http://grp01.kibana.geap.intra.rakuten-it.com/) (or [Kibana STG](http://grp01.kibana.geap.intra.rakuten-it.com/stg-kibana/)) in real time. To find all analytics data for your app, search for your Account ID and Application ID by using a search like `acc:477 and aid:999`. To find data for a certain event type, such as one of the [standard events](./android-user-guide#-standard-events), you can add the `etype` to your search query, for example `aid:999 AND etype:_rem_launch`. Note that data retention in Kibana is quite short.
<br/>
RAT has parameters specific to certain use cases, e.g. tracking purchase and shopping cart data or page tracking. These parameters are listed in the [RAT Parameter Specifications](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Parameter+Specifications). Below are examples for different usecases that use the RAT specific parameters:

#### Page Tracking

```java
Map<String, Object> params = new HashMap<>();
params.put("pgn", "Main"); // page name
params.put("target", "search_btn"); // Element clicked
params.put("gol", "Improve marketing effectiveness"); // Goal Id - Goals are specific strategies you'll leverage to accomplish your business objectives.

RATTracker.event("click", params).track();
```

#### Purchase Data Tracking

```java
String[] arrayOfItemIds = {"shopid/item_1_id", "shopid/item_2_id"};
String[] arrayOfItemGenres = {"item 1 genre", "item 2 genre"};
int[] arrayOfItemQuantities = {1, 3};
float[] arrayOfItemPrices = {50.9f, 3.3f};

Map<String, String> variationColor = new HashMap<>();
variationColor.put("color", "red");

Map<String, String> variationSize = new HashMap<>();
variationSize.put("size", "s");

List<Map> variationsList = new ArrayList<>();
variationsList.add(variationColor);
variationsList.add(variationSize);

interface CheckoutStage {
  int LOGIN = 10;
  int SHIPPING_DETAILS = 20; 
  int SUMMARY = 30; 
  int PAYMENT = 40;
  int VERIFICATION = 50;    
}

Map<String, Object> params = new HashMap<>();
params.put("pgn", "checkout");                  // Page Name
params.put("pgt", "cart_checkout");             // Page Type
params.put("cycode", "JPY");                    // Currency Code - must be three characters
params.put("chkout", CheckoutStage.PAYMENT);    // Checkout Stage - must be the value 10, 20, 30, 40, or 50
params.put("cntln", "fr_CA");                   // Content Language
params.put("itemid", arrayOfItemIds);           // Item IDs in the form "shopid/itemID"
params.put("igenre", arrayOfItemGenres);        // Genre for each item
params.put("ni", arrayOfItemQuantities);        // Quantity of Items for each item
params.put("price", arrayOfItemPrices);         // Price for each item
params.put("variation", variationsList);        // Variations of the items

RATTracker.event("pv", params).track();
```

#### Search Results

```java
Map<String, Object> params = new HashMap<>();
params.put("pgn", "shop_search");                       // Page Name
params.put("pgt", "search");                            // Page Type
params.put("lang", "English");                          // Search selected language
params.put("sq", "really cool shoes");                  // Search Query
params.put("oa", "a");                                  // Search method - "a" for AND - "o" for OR
params.put("esq", "lame shoes");                        // Excluded search query
params.put("genre", "shoes");                           // Genre or category
params.put("tag", new String[] {"tag 1", "tag 2"});     // An array of tags

RATTracker.event("pv", params).track();
```

#### Custom Events

You can send custom events to RAT by picking a new (unused) event type and passing your custom parameters (i.e. parameters not covered in the [RAT Parameter Specifications](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Parameter+Specifications)) as a flat JSON object as `cp` parameter (cp = custom parameter). Note that `cp` does not support nested JSON objects, if you want to send more structured data you will need to serialize it to String yourself.

```java
Map<String, Object> params = new HashMap<>();
params.put("cp", new JSONObject()       // Custom Parameters
                        .put("custom_param", "value")
                        .put("custom_param_2", "value"));

RATTracker.event("custom_event", params).track();
```
