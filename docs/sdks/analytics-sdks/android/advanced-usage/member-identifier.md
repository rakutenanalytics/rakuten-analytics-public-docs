---
sidebar_position: 9
id: android-analytics-member-identifier
slug: /analytics-sdk/android/android-member-identifier
title: Setting and Removing Member Identifier
added_version: 7.2.0
updated_version: 9.0.0
changelog: ./android-changelog
---

## Setting and Removing Member Identifier

The followings APIs are used for providing member identifier (from ID SDK Compatibility module) to Analytics SDK, and sending login/logout events.

### Set member identifier and send login event.

When login in ID SDK is successful, use the ID SDK Compatibility module to extract the member identifier in `String` format and pass it to `AnalyticsManager` to send login (i.e. "_rem_login") event.

```kotlin
AnalyticsManager.instance()?.setMemberIdentifier(memberIdentifier)
```

### Remove member identifier and send logout event.

When logging out in ID SDK, remove the member identifier in `AnalyticsManager` to send logout (i.e. "_rem_logout") event.

```kotlin
AnalyticsManager.instance()?.removeMemberIdentifier()
```

### Send login failure event.

When login in ID SDK fails, pass the `Exception` received to `AnalyticsManager` to send login failure (i.e. "_rem_login_failure") event.

The error message is included in the payload.

```kotlin
AnalyticsManager.instance()?.setMemberError(error)
```

### Secure storage for  member identifier
By default, the member identifier is stored in the device as plain text. To store the member identifier securely, use the Identity Container. For more information, see [Identity Container](identity-store.md).

