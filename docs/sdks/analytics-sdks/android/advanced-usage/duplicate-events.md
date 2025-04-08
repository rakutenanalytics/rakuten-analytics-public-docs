---
sidebar_position: 8
id: android-analytics-duplicate-events
slug: /analytics-sdk/android/android-duplicate-events
title: Duplicate Events for Multiple Accounts
added_version: 7.3.0
updated_version: 11.0.0
changelog: ./android-changelog
---

## Duplicate events across multiple RAT Accounts

RAT Tracker can be configured to mirror events to multiple RAT accounts. Once configured, the SDK will automatically duplicate any events destined for the original accountId and applicationId defined in the [app's `AndroidManifest.xml`](./android-user-guide#2-configure-rat-tracker-in-your-apps-androidmanifestxml) to all added duplicate accounts.

### Build time configuration
Create rakuten-analytics.json file in the app's assets folder `assets/rakuten-analytics.json` with the RAT duplicate
 accounts list. The account object will contain a RAT Account Identifier and RAT App Identifier name-value pairs and an optional RAT non-duplicated events array to disable tracking on specific events.
```json
{
  "ratDuplicateAccounts": [
    {
      "ratAccountIdentifier":199,
      "ratAppIdentifier":2,
      "ratNonDuplicatedEventsList":[]

    },
    {
      "ratAccountIdentifier":200,
      "ratAppIdentifier":1,
      "ratNonDuplicatedEventsList":[
        "_rem_init_launch"
      ]
    }
  ]
}
```

### Runtime Configuration
User can also add secondary accounts at runtime. Custom events will be mirrored to accounts declared at runtime. Ignores the build-time ratNonDuplicatedEventsList when set.

⚠️ Won't duplicate an event if that event on the main account is disabled.
```java
RatTracker.instance().addDuplicateAccount(myRATACC2, myRATAID2)
RatTracker.instance().addDuplicateAccount(myRATACC3, myRATAID3)
```

Disabling an event at runtime:

```java
RATTracker.shouldDuplicateRATEventHandler { eventName, duplicateAccountId ->
  eventName != "_rem_end_session" && duplicateAccountId == 999
}
```
