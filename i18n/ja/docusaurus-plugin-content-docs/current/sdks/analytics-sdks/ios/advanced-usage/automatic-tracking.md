---
sidebar_position: 4
id: ios-analytics-automatic-tracking
slug: /analytics-sdk/ios/ios-automatic-tracking
title: 自動トラッキング
added_version: 2.7.0
updated_version: 9.5.0
changelog: ./ios-changelog
---

## 自動トラッキングの設定

### パブリックAPI

アプリがObjective-Cでコーディングされている場合、以下のヘッダーファイルをインポートして、パブリックSwiftクラスを使用してください:

```objc
#import <RakutenAnalytics/RAnalytics-Swift.h>
```

アプリがSwiftでコーディングされている場合、RakutenAnalyticsフレームワークをインポートしてください:

```swift
import RakutenAnalytics
```

### 自動イベントトラッキングの設定

#### ビルド時の設定

* このファイルを作成し、Xcodeプロジェクトに追加してください: `RAnalyticsConfiguration.plist`
* ファイルを開き、トラッキングしたくないイベントを`RATDisabledEventsList`文字列配列に追加してください。例えば、すべての自動イベントを無効にするには以下のようにします:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>RATDisabledEventsList</key>
    <array>
        <string>_rem_init_launch</string>
        <string>_rem_launch</string>
        <string>_rem_end_session</string>
        <string>_rem_update</string>
        <string>_rem_login</string>
        <string>_rem_login_failure</string>
        <string>_rem_logout</string>
        <string>_rem_install</string>
        <string>_rem_visit</string>
        <string>_rem_applink</string>
        <string>_rem_push_received</string>
        <string>_rem_push_auto_register</string>
        <string>_rem_push_auto_unregister</string>
        <string>_rem_push_notify</string>
        <string>_rem_sso_credential_found</string>
        <string>_rem_login_credential_found</string>
        <string>_rem_credential_strategies</string>
        <string>_analytics_custom</string>
    </array>
</dict>
</plist>
```

#### 実行時の設定

実行時にイベントを有効または無効にすることも可能です:

* 実行時にすべてのイベントを有効にする

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { _ in true }
```

* 実行時にすべてのイベントを無効にする

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { _ in false }
```

* 特定のイベントを実行時に無効にする

```swift
AnalyticsManager.shared().shouldTrackEventHandler = { eventName in
    eventName != AnalyticsManager.Event.Name.sessionStart
}
```

注意: 実行時の設定はビルド時の設定を上書きします。ビルド時の設定でイベントが無効になっていても、実行時の設定で有効にされている場合、そのイベントはRakutenAnalyticsによってトラッキングされます。

ビルド時の設定を実行時に上書きするには、`application(_:willFinishLaunchingWithOptions:)`内で`AnalyticsManager.shared().shouldTrackEventHandler`を設定してください:

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, willFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        AnalyticsManager.shared().shouldTrackEventHandler = { eventName in
            ...
        }
        return true
    }
}
```
