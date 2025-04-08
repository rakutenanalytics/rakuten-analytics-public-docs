---
sidebar_position: 13
id: android-analytics-geo-tracking
slug: /analytics-sdk/android/android-geo-tracking
title: Geo Location Tracking
added_version: 2.x
updated_version: 11.1.0
changelog: ./android-changelog
---

## Geo Location Tracking

The SDK uses `GeoManager` to actively track location events for different states of the app based on access level to location services.

Whilst tracking for location events the `GeoManager` captures location updates at regular intervals and/or on significant change in device's location when being used in background, or terminated state. Please refer to the [Background Location Limits documentation](https://developer.android.com/about/versions/oreo/background-location-limits#apis). The `GeoManager` spools the captured location updates using `RatTracker` in a regular time interval which is the `RatTracker` batching delay.
To enable this functionality,

### 1- Request location permissions
For location event updates when the app is being used in **foreground**, your app needs to request either the `ACCESS_COARSE_LOCATION` permission or the `ACCESS_FINE_LOCATION` permission, as shown in the following snippet:

```xml
<manifest ... >
  <!-- Always include this permission -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

  <!-- Include only if your app benefits from precise location access. -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

For location event updates when the app is being used in **background**, if your app targets Android 10 (API level 29) and higher, you must declare the `ACCESS_BACKGROUND_LOCATION` permission in your app's manifest in order to request background location access at runtime. On earlier versions of Android, when your app receives foreground location access, it automatically receives background location access as well.

```xml
<manifest ... >
  <!-- Required only when requesting background location access on
       Android 10 (API level 29) and higher. -->
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>
```

### 2- Start Location Collection

The `GeoManager` is a shared singleton that comes with a default `GeoConfiguration` to track location events. It also allows you to set a desired configuration for tracking location events.

Starts the process of location collection based on either the default configuration or a custom configuration.

#### Using Default Configuration

To start the location collection process, use either the default configuration or a custom configuration, as shown below:

```kotlin
val configuration = Configuration.Builder(context).build()
```
The default `Configuration` object captures `.HIGH` accurate location updates from `00:00` to `23:59` at regular intervals of `300 seconds`.

#### Using Custom Configuration

```kotlin
val configuration = Configuration.Builder(context)
            .setAccuracy(Accuracy.NO_POWER) // The accuracy you want to receive. The default is [Accuracy.High].
            .setStartTime(GeoTime()) // Default is 00:00
            .setEndTime(GeoTime(17u, 30u)) // Default is 23:59
            .setCollectionTimeInterval(420) // Default is 300 seconds, and the range is 60~1800 seconds.
            .build() // to create the custom configuration.
```
> **Warning:** When creating a custom configuration, if any of the configuration properties do not meet the specified criteria, the default value for that property will be used:
> 1. `accuracy` should be a value specified in type `Accuracy`.
> 2. `startTime` should not be equal to or exceed `endTime`.
> 3. `collectionTimeInterval` should be in the range of `60 to 1800` seconds.

Once the `Configuration` is built, it will be saved in `SharedPreference`. Next time you build it without changing the parameter, it will be the same as the last time you create it.

And then, start the location collection using your configuration as shown below:

```kotlin
GeoManager.instance().startLocationCollection(context, configuration)
```

### Stop Location Collection

Stops any ongoing location collection process and deletes the custom configuration set.

```kotlin
GeoManager.instance().stopLocationCollection(context)
```

### Get Configuration

Returns the configuration that was set on starting the location collection. If no configuration was set, it returns `null`.

```kotlin
GeoManager.instance().getConfiguration()
```

### Request Location

Request a one-time delivery of the user’s current location.

```kotlin
 // for example:
 GeoManager.instance().requestLocation(context, LocationCallback({
           location -> // ...
       }, {
           exception ->  // ...
       }))
 
//or by using lambda function:
  //1- create your function e.g.
  fun getLocation(success: (response: Location?) -> Unit, failure: (exception: Exception?) -> Unit
    ){
        GeoManager.instance().requestLocation(context, LocationCallback (success, failure))
    }
 
  // 2- get the response
  getLocation({
       it?.accuracy // ...
    },{
       it?.message //...
    })
```

Requesting for a location update can include an optional `ActionParameters` as shown below:

```kotlin
val actionParameters = ActionParameters(
                actionType = "ButtonClick",
                actionLog = "Login page button click",
                actionId = "123",
                actionDuration = "3 seconds",
                additionalLog = "SSO Login")
GeoManager.instance().requestLocation(context, LocationCallback({}, {}), actionParameters)
```

### Geo Location Tracker Limits
* Following an app update from an older version, the Geo Location Tracker will stop tracking location events until the next scheduled start time.
* The GeoTracker configuration is stored in SharedPreferences. If the file becomes corrupted or an obfuscation issue occurs, the configuration in SharedPreferences will be reset to null. This precaution prevents location tracking using the default configuration. For more details, refer to [CONRAT-37432](https://jira.rakuten-it.com/jira/browse/CONRAT-37432).
