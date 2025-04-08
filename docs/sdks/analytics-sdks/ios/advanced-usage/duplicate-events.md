---
sidebar_position: 5
id: ios-analytics-duplicate-events
slug: /analytics-sdk/ios/ios-duplicate-events
title: Duplicate Events for Multiple Accounts
added_version: 8.3.0
updated_version: 8.3.0
changelog: ./ios-changelog
---

## Duplicate events across multiple RAT Accounts

The `RAnalyticsRATTracker` can be configured to mirror events to multiple RAT accounts. Once configured, the SDK will automatically duplicate any events destined for the original accountId and applicationId defined in the `Info.plist` to all added duplicate accounts.

### Build-time config

Add `RAnalyticsConfiguration.plist` to your Xcode project. Within this `plist` file, add an array and for each account, create a dict with `RATAccountIdentifier` and `RATAppIdentifier` keys and an optional `RATNonDuplicatedEventsList` keyed array to disable tracking on specific events.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>RATDuplicateAccounts</key>
    <array>
        <dict>
        <key>RATAccountIdentifier</key>
        <integer>199</integer>
        <key>RATAppIdentifier</key>
        <integer>2</integer>
        </dict>
        <dict>
        <key>RATAccountIdentifier</key>
        <integer>200</integer>
        <key>RATAppIdentifier</key>
        <integer>1</integer>
        <key>RATNonDuplicatedEventsList</key>
        <array>
            <string>_rem_init_launch</string>
            <string>_rem_launch</string>
        </array>
    </dict>
    </array>
</dict>
</plist>
```

### Runtime config

User can also add secondary accounts at runtime. Custom events will be mirrored to accounts declared at runtime. Ignores the build-time `RATNonDuplicatedEventsList` key when set.

⚠️ Won't duplicate an event if that event on the main account is disabled.

```swift
RAnalyticsRATTracker.shared().addDuplicateAccount(accountId: myRATACC2, applicationId: myRATAID2)
RAnalyticsRATTracker.shared().addDuplicateAccount(accountId: myRATACC3, applicationId: myRATAID3)
```

Disabling an event at runtime:

```swift
RAnalyticsRATTracker.shared().shouldDuplicateRATEventHandler = { eventName, duplicateAccountId
    return eventName != "_rem_end_session" && duplicateAccountId == 999
}
```
