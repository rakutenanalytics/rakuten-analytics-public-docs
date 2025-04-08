---
sidebar_position: 3
id: android-analytics-faq
slug: /analytics-sdk/android/android-faq
title: Frequently Asked Questions
---

## Frequently Asked Questions 
### Q: How do I test tracking with the Analytics data in staging environment?
The [Kibana](https://confluence.rakuten-it.com/confluence/display/RAT/How+to+Check+Data+that+is+being+Sent+to+RAT) tool shows Analytics data almost in real time. There is also a [BI tool](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=1640084655), similar to the UI for RAT, available to perform statistics.

### Q: How to track events to custom account/app ID?

Follow the ["Getting Started" section above](./android-user-guide#getting-started) to configure your account and app ID.

After running the app and triggering the event tracking confirm the configuration by searching in [Kibana](https://confluence.rakuten-it.com/confluence/display/RAT/How+to+Check+Data+that+is+being+Sent+to+RAT) for your account & app ID with a query like this: `acc:MY_RAT_ACCOUNT_ID AND aid:MY_RAT_APPLICATION_ID`.

You can send a single event to a different account or app ID as described in [advanced usage](./android-diff-accounts).

### Q: How can I track a user's location?
To track user location, add `android.permission.ACCESS_FINE_LOCATION` and/or `android.permission.ACCESS_COARSE_LOCATION` to your `AndroidManifest.xml`. If you target Android M, you need to [request permissions at runtime](http://developer.android.com/training/permissions/requesting.html). 

Depending on the available permissions the SDK will behave as follows:

- no permission → no location tracking.
- ACCESS_FINE_LOCATION → the SDK will track locations passively received when other applications or services request them using PASSIVE_PROVIDER.
- ACCESS_COARSE_LOCATION → the SDK will track location based on nearby of cell tower and WIFI access points using NETWORK_PROVIDER.
- ACCESS_COARSE_LOCATION & ACCESS_FINE_LOCATION → the SDK will track location based on the passive location provider. If the passive location is not available or older than 1 day, then check cell tower and WIFI information.

Location tracking is enabled by default, to disable it use `AnalyticsManager.INSTANCE.enableLocation(false)`.

### Q: What are the policy requirements for Google Advertising Id?
Check Google's [support page](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en&ref_topic=2364761)

### Q: Is there any situation where pooled requests are lost?
To our knowledge, there is no normal situation where pooled events will be lost. Events are persisted in a database until they are successfully sent. The max size of the DB is 5000 records, so the only situation we can think of where events would be lost is if the device has lost internet connectivity for a long period of time, and then new events will start getting dropped.

### Q: How to fix missing `userId` field in some event data sent to RAT.
It is possible that the Analytics SDK was only added to the application on a later version.
There is a case that user was already logged-in before updating to the version with Analytics SDK. The encrypted easy ID will no longer be broadcasted again by the User SDK unless the user re-login.

To fix this, app can set the `userId` manually using the `setUserId` API. See [manual setting of user ID](./android-manual-userid) for details.

## Documentation and Useful Links
+ [SDK Source Code](https://github.com/rakutenanalytics/android-analytics)
+ [RAT Home Page](https://confluence.rakuten-it.com/confluence/display/RAT/RAT+Home)
+ [Mobile Development in Discourse](https://discourse.tech.rakuten-it.com/c/guilds/mobile-dev/)

If you have any questions, you can contact us via [support page](https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924).
