---
sidebar_position: 17
id: ios-analytics-event-triggers
slug: /analytics-sdk/ios/ios-event-triggers
title: Event Triggers
added_version: 2.7.0
updated_version: 9.5.0
changelog: ./ios-changelog
---

## Event triggers

### UIApplication NSNotification

#### UIApplication.didFinishLaunchingNotification

A notification that posts immediately after the app finishes launching.
https://developer.apple.com/documentation/uikit/uiapplication/1622971-didfinishlaunchingnotification

When UIApplication.didFinishLaunchingNotification is received, these events are sent under certain conditions:

- `_rem_init_launch` is sent when the app is installed for the first time

- `_rem_install` is sent when the app is launched for the second time

- `_rem_install` and `_rem_update` are sent when the app has been updated to a new version

- `_rem_launch` is sent in any cases

- `_rem_credential_strategies` is sent in any cases with this boolean parameter:
    - key: strategies.password-manager
    - value: true or false

#### UIApplication.willEnterForegroundNotification

A notification that posts shortly before an app leaves the background state on its way to becoming the active app.
https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification

- `_rem_launch` is sent in any cases

#### UIApplication.didBecomeActiveNotification

A notification that posts when the app becomes active.
https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification

- `_rem_push_notify` is sent only if:
    - the app was previously opened from a push notification
    - UNUserNotificationCenter.current().delegate is set

#### UIApplication.didEnterBackgroundNotification

A notification that posts when the app enters the background.
https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification

- `_rem_end_session` is sent in any cases

### viewDidAppear

Notifies the view controller that its view was added to a view hierarchy.
https://developer.apple.com/documentation/uikit/uiviewcontroller/1621423-viewdidappear

- pv (page visit) is sent in any cases when a view controller did appear (viewDidAppear)

### APNS Remote Notifications

- `_rem_push_received` is sent when:
    - a push notification is received and intercepted by the Notification Service Extension
    - this Notification Service Extension's method is called:
        - didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void)

- `_rem_push_notify` is sent when:
    - the application is opened from a push notification
    - one of these AppDelegate's methods is called:
        - application:didReceiveRemoteNotification:
        - application:didReceiveRemoteNotification:fetchCompletionHandler:
        - userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler
        
### PNP Events

- `_rem_push_auto_register` is sent from RPushPNP SDK when:
    - the app becomes active
    - the user is not registered to PNP
    - the registration requests optimization is enabled
    - the push notifications status is authorized

- `_rem_push_auto_unregister` is sent from RPushPNP SDK when:
    - the app becomes active
    - the user is registered to PNP
    - the registration requests optimization is enabled
    - the push notifications status is denied

### SDKs NSNotification

#### IDSDK notifications

- `_rem_login` is sent when:
    - IDSDK login succeeds
    - this NSNotification is received: com.rakuten.esd.sdk.events.login.idtoken_memberid

- `_rem_login_failure` is sent when:
    - IDSDK login fails
    - this NSNotification is received: com.rakuten.esd.sdk.events.login.failure.idtoken_memberid

- `_rem_logout` is sent when:
    - IDSDK logout succeeds
    - this NSNotification is received: com.rakuten.esd.sdk.events.logout.idtoken_memberid

#### Custom notification

- `_analytics_custom` is sent when:
    - this NSNotification is received: com.rakuten.esd.sdk.events.custom
