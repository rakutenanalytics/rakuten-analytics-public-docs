---
sidebar_position: 16
id: ios-analytics-internal-json
slug: /analytics-sdk/ios/ios-internal-json
title: Internal JSON Serialization
added_version: 8.1.0
updated_version: 10.0.0
changelog: ./ios-changelog
---

## Internal JSON serialization

As there is a bug in the native JSON serialization for floating numbers on iOS, the internal JSON serialization should be used if your iOS app tracks events containing floating numbers in the events parameters.
In this specific case, your app's `Info.plist` should contain the key `RATEnableInternalSerialization` set to `true`:
```
<key>RATEnableInternalSerialization</key>
<true/>
```
