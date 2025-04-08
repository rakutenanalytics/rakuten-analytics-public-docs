---
sidebar_position: 3
id: android-analytics-diff-accounts
slug: /analytics-sdk/android/android-diff-accounts
title: Events to Different RAT Accounts
added_version: 5.0.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## Send specific events to different RAT account ID / app ID

Events can be sent to different RAT account ID or app ID other than the value specified in AndroidManifest.xml. Put your alternative account ID to "acc" and app ID to "aid" in event parameters. The value must be an integer, long, or a String which can be converted to an integer. If the value for the key is invalid, the value from `AndroidManifest.xml` will be used instead.

```java
Map<String, Object> params = new HashMap<>();
params.put("acc", 123);
params.put("aid", 456);

RatTracker.instance().event("anEvent", params).track();
```
