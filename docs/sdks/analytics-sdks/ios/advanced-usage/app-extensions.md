---
sidebar_position: 10
id: ios-analytics-app-extensions
slug: /analytics-sdk/ios/ios-app-extensions
title: App Extensions
added_version: 2.13.0
updated_version: 3.1.1
changelog: ./ios-changelog
---

## Support for App Extensions

The SDK can be added as a dependency to an App Extension target (e.g. Today Widget) and will compile successfully. The SDK's APIs such as track (to track a custom event) can be used from an App Extension.

### Requirements

App Extensions need to follow the requirements at [Configuring RAT](./ios-user-guide#configuring).

* You MUST configure your RAT `accountId` and `applicationId` in the **App Extension** info.plist (in addition to your main app's info.plist)
* To send events to a different endpoint you can set a `RATEndpoint` key in the **App Extension** info.plist

### Viewing App Extension events in Kibana

To search for App Extension events in Kibana use your **App Extension** name and not the application name.
