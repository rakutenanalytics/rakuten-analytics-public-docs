---
sidebar_position: 2
id: ios-analytics-location-tracking
slug: /analytics-sdk/ios/ios-location-tracking
title: Location Tracking
added_version: 1.0.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## Location tracking

> Your app must first request permission to use location services for a valid reason, as shown in Apple's [CoreLocation documentation](https://developer.apple.com/documentation/corelocation?language=objc). **Monitoring the device location for no other purpose than tracking will get your app rejected by Apple.**

> See the [Location and Maps Programming Guide](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html) for more information on how to request location updates.

### Last Known Location Tracking

> **Warning:** The SDK does not _actively_ track the device's location even if the user has granted access to the app and the `shouldTrackLastKnownLocation` property is set to `true`. Instead, it passively monitors location updates captured by your application. 

Location tracking is enabled by default. If you want to prevent our SDK from tracking the last known location, you can set `shouldTrackLastKnownLocation` to `false`:

```swift
AnalyticsManager.shared().shouldTrackLastKnownLocation = false
```

### Geo Location Tracking

The SDK uses `GeoManager` to actively track location events for differnt states of the app based on access level to location services.

| Authorization Status | Tracks in App State |
| :---:   | :---: |
| `notDetermined`, `restricted`, `denied` | None. |
| `authorizedAlways` | Foreground, background and terminated. |
| `authorizedWhenInUse` | Foreground and background. |

Whilst tracking for location events the `GeoManager` captures location updates at regular intervals and/or on significant change in device's location when the app is being used actively. 

If the app is not being used actively the `GeoManager` depends only on significant change in device's location to gather location updates.

The `GeoManager` consists of a `GeoTracker` that spools the captured location updates every `60 seconds` which is set as default batching delay.

**NOTE:** Developer needs to enable `Location Updates` for `Background Modes` in `Signing & Capabilities` in Xcode. Also the `GeoManager` cannot track the device's location for terminated state if the user has not granted `Always Authorization` to the location services.

#### Start Location Collection

The `GeoManager` is a shared singleton that comes with a default `GeoConfiguration` to track location events. It also allows you to set a desired configuration for tracking location events.

Starts the process of location collection based on either the default configuration or a custom configuration.

##### Using Default Configuration

Start the location collection using default configuration as shown below:

```
GeoManager.shared.startLocationCollection()
```

The default `GeoConfiguration` object captures `.best` accurate location updates from `00:00` to `23:59` at regular intervals of `300 seconds` and/or on covering a distance of every `300 meters`.

##### Using Custom Configuration

> **Warning:** When creating a custom configuration, if any of the configuration's property does not meet the criteria to fall within specified range. The default value for the property will be used.

**NOTE**: 
1. `timeInterval` should be in the range of `60 to 1800` seconds.
2. `distanceInterval` should be in the range of `200 to 500` meters.
3. `accuracy` should be a value specified in type `GeoAccuracy`.
4. `startTime` should not be equal to or exceed `endTime`.

> **Warning:** The timer interval based collection only works when the app is in foreground. The distance based collection will work in all states of the app provided user has granted always access to location services.

The `GeoConfiguration` object to capture `.hundredMeters` accurate location updates from `08:00` to `20:00` at regular intervals of `300 seconds` and/or on covering a distance of every `400 meters` can be created as shown below:

```
let configuration = GeoConfiguration(distanceInterval: 400, 
                                     timeInterval: 300, 
                                     accuracy: .hundredMeters, 
                                     startTime: GeoTime(hours: 8, minutes: 0), 
                                     endTime: GeoTime(hours: 20, minutes: 0))
```

Start the location collection using a custom configuration as shown below:

```
GeoManager.shared.startLocationCollection(configuration: configuration)
```

- Note: This function should be called on the main thread, otherwise starting the location collection is not guaranteed.

#### Stop Location Collection

Stops any ongoing location collection process and deletes the custom configuration set.

```
GeoManager.shared.stopLocationCollection()
```

- Note: This function should be called on the main thread, otherwise stopping the location collection is not guaranteed.

#### Get Configuration

Returns the custom configuration that was set on starting the location collection. If no configuration was set, it returns nil.

```
guard let configuration = GeoManager.shared.getConfiguration() else {
    return
}
```

#### Request Location

Request a one-time delivery of the user’s current location.

```
GeoManager.shared.requestLocation { result in
    switch result {
    case .success(let locationModel):
        // Handle location request
    case .failure(let error):
        // Handle error on location request
    }
}
```

Requesting for a location update can include an optional `GeoActionParameters` as shown below:

```
let actionParameters = GeoActionParameters(actionType: "ButtonClick",
                                           actionLog: "Login page button click",
                                           actionId: "123",
                                           actionDuration: "3 seconds",
                                           additionalLog: "SSO Login")
                                           
GeoManager.shared.requestLocation(actionParameters: actionParameters) { result in
    switch result {
    case .success(let locationModel):
        // Handle location request
    case .failure(let error):
        // Handle error on location request
    }
}
```

- Note: This function should be called on the main thread, otherwise requesting the location collection is not guaranteed.
