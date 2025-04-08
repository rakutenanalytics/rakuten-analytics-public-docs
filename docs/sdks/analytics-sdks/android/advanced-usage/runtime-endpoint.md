---
sidebar_position: 5
id: android-analytics-runtime-endpoint
slug: /analytics-sdk/android/android-runtime-endpoint
title: Runtime Configuration of RAT Endpoint
added_version: 6.9.0
updated_version: 10.1.0
changelog: ./android-changelog
---

## Runtime configuration of RAT endpoint

Starting v6.9.0, RAT endpoint can be set at runtime.

If endpoint is set to null or empty string, the endpoint set in build configuration will be used for sending payload to RAT. Please refer to [Configuration](./android-user-guide#configuration) sections for details on how to set endpoint at build time.

```kotlin
AnalyticsManager.instance()?.setEndpoint("your-new-endpoint")
```

### <font color="red">Limitation</font>

If there are existing events stored in the module’s analytics events database when the endpoint is changed, the existing payloads will be sent to the newly set endpoint instead of the previously set endpoint.
