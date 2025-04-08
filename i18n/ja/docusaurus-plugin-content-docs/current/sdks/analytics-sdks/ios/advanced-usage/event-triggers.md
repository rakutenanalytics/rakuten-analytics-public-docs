---
sidebar_position: 17
id: ios-analytics-event-triggers
slug: /analytics-sdk/ios/ios-event-triggers
title: イベントトリガー
added_version: 2.7.0
updated_version: 9.5.0
changelog: ./ios-changelog
---

## イベントトリガー

### UIApplication NSNotification

#### UIApplication.didFinishLaunchingNotification

アプリが起動を完了した直後に通知が送信されます。

https://developer.apple.com/documentation/uikit/uiapplication/1622971-didfinishlaunchingnotification

UIApplication.didFinishLaunchingNotificationが受信されると、以下の条件でイベントが送信されます:

- `_rem_init_launch` はアプリが初めてインストールされたときに送信されます。

- `_rem_install` はアプリが2回目に起動されたときに送信されます。

- `_rem_install` と `_rem_update` はアプリが新しいバージョンに更新されたときに送信されます。

- `_rem_launch` はいかなる場合でも送信されます。

- `_rem_credential_strategies` は以下のブールパラメータとともにいかなる場合でも送信されます:
    - key: strategies.password-manager
    - value: true または false

#### UIApplication.willEnterForegroundNotification

アプリがバックグラウンド状態を離れ、アクティブアプリになる直前に通知が送信されます。

https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification

- `_rem_launch` はいかなる場合でも送信されます。

#### UIApplication.didBecomeActiveNotification

アプリがアクティブになったときに通知が送信されます。

https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification

- `_rem_push_notify` は以下の場合にのみ送信されます:
    - アプリがプッシュ通知から以前に開かれた場合
    - UNUserNotificationCenter.current().delegate が設定されている場合

#### UIApplication.didEnterBackgroundNotification

アプリがバックグラウンドに入ったときに通知が送信されます。

https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification

- `_rem_end_session` はいかなる場合でも送信されます。

### viewDidAppear

ビューコントローラーのビューがビュー階層に追加されたことを通知します。

https://developer.apple.com/documentation/uikit/uiviewcontroller/1621423-viewdidappear

- pv (ページ訪問) は、ビューコントローラーが表示されたとき (viewDidAppear) にいかなる場合でも送信されます。

### APNSリモート通知

- `_rem_push_received` は以下の場合に送信されます:
    - プッシュ通知が受信され、Notification Service Extensionによってインターセプトされた場合
    - このNotification Service Extensionのメソッドが呼び出された場合:
        - didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void)

- `_rem_push_notify` は以下の場合に送信されます:
    - アプリがプッシュ通知から開かれた場合
    - 以下のAppDelegateのメソッドのいずれかが呼び出された場合:
        - application:didReceiveRemoteNotification:
        - application:didReceiveRemoteNotification:fetchCompletionHandler:
        - userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler

### PNPイベント

- `_rem_push_auto_register` はRPushPNP SDKから以下の場合に送信されます:
    - アプリがアクティブになった場合
    - ユーザーがPNPに登録されていない場合
    - 登録リクエストの最適化が有効になっている場合
    - プッシュ通知のステータスが許可されている場合

- `_rem_push_auto_unregister` はRPushPNP SDKから以下の場合に送信されます:
    - アプリがアクティブになった場合
    - ユーザーがPNPに登録されている場合
    - 登録リクエストの最適化が有効になっている場合
    - プッシュ通知のステータスが拒否されている場合

### SDKs NSNotification

#### IDSDK通知

- `_rem_login` は以下の場合に送信されます:
    - IDSDKログインが成功した場合
    - このNSNotificationが受信された場合: com.rakuten.esd.sdk.events.login.idtoken_memberid

- `_rem_login_failure` は以下の場合に送信されます:
    - IDSDKログインが失敗した場合
    - このNSNotificationが受信された場合: com.rakuten.esd.sdk.events.login.failure.idtoken_memberid

- `_rem_logout` は以下の場合に送信されます:
    - IDSDKログアウトが成功した場合
    - このNSNotificationが受信された場合: com.rakuten.esd.sdk.events.logout.idtoken_memberid

#### カスタム通知

- `_analytics_custom` は以下の場合に送信されます:
    - このNSNotificationが受信された場合: com.rakuten.esd.sdk.events.custom
