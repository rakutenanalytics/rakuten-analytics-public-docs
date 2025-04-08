---
sidebar_position: 7
id: android-analytics-auto-tracking
slug: /analytics-sdk/android/android-auto-tracking
title: Automatic Event Tracking
added_version: 4.1.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## Automatic event tracking configuration

Starting v7.1.0, automatic events that are tracked by Analytics SDK can be enabled or disabled at build time or runtime.

### Build time configuration.
Define an array resource in the app's `res/values/string.xml` with a `RATDisabledEventsList` resource name.

All the events (as string) listed in the array resource will not be tracked by the SDK.

```xml
    // sample list
    <string-array name="RATDisabledEventsList">
        <item>_rem_install</item>
        <item>_rem_update</item>
        <item>_rem_init_launch</item>
        <item>_rem_launch</item>
        <item>_rem_end_session</item>
        <item>_rem_end_session</item>
        <item>_rem_push_notify</item>
        <item>_rem_login</item>
        <item>_rem_logout</item>
        <item>_rem_visit</item>
        <item>_rem_applink</item>
        <item>_rem_discover_discoverpage_visit</item>
        <item>_rem_discover_discoverpage_tap</item>
    </string-array>
```

Please refer to [Standard Event section](./android-user-guide#-standard-events) for event list.

### Runtime configuration
It's also possible to enable or disable events at runtime:

Add a tracking event handler (implementation of `ShouldTrackEventHandler` class) to the AnalyticsManager.
If not set, it will assume that all events are enabled for runtime configuration.

- Enable all events at runtime:
```java
AnalyticsManager.setShouldTrackEventHandler { true }
```
- Disable all events at runtime:
```java
AnalyticsManager.setShouldTrackEventHandler { false }
```
- Disable a given event at runtime:
```java
AnalyticsManager.setShouldTrackEventHandler {
    it != Event.Name.APP_INSTALL
}
```

Since some automatic events are tracked before app is actually created/launch by the OS (i.e. `_rem_install`), runtime configuration tracking event handler should be defined on the app's `attachBaseContext()` instead of `onCreate()` of the `Application` class.

<font color="red">Note:</font> The runtime configuration overrides the build time configuration.
If an event is disabled at build time configuration and enabled at runtime configuration, this event will be tracked by Analytics SDK.
