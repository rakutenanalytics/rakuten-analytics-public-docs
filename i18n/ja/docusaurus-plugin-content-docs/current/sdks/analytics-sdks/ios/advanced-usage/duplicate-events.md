---
sidebar_position: 5
id: ios-analytics-duplicate-events
slug: /analytics-sdk/ios/ios-duplicate-events
title: 複数アカウントの重複イベント
added_version: 8.3.0
updated_version: 8.3.0
changelog: ./ios-changelog
---

## 複数のRATアカウント間でのイベントの重複

`RAnalyticsRATTracker`を設定して、イベントを複数のRATアカウントにミラーリングすることができます。一度設定すると、SDKは`Info.plist`で定義された元の`accountId`および`applicationId`に送信されるイベントを、追加されたすべての重複アカウントに自動的に複製します。

### ビルド時の設定

`RAnalyticsConfiguration.plist`をXcodeプロジェクトに追加してください。この`plist`ファイル内で配列を追加し、各アカウントに対して`RATAccountIdentifier`および`RATAppIdentifier`キーを持つ辞書を作成します。また、特定のイベントのトラッキングを無効にするために、オプションで`RATNonDuplicatedEventsList`キー付き配列を追加できます。

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

### 実行時の設定

ユーザーは実行時にセカンダリアカウントを追加することもできます。カスタムイベントは実行時に宣言されたアカウントにミラーリングされます。この場合、ビルド時の`RATNonDuplicatedEventsList`キーは無視されます。

⚠️ メインアカウントで無効化されているイベントは複製されません。

```swift
RAnalyticsRATTracker.shared().addDuplicateAccount(accountId: myRATACC2, applicationId: myRATAID2)
RAnalyticsRATTracker.shared().addDuplicateAccount(accountId: myRATACC3, applicationId: myRATAID3)
```

実行時にイベントを無効化する:

```swift
RAnalyticsRATTracker.shared().shouldDuplicateRATEventHandler = { eventName, duplicateAccountId
    return eventName != "_rem_end_session" && duplicateAccountId == 999
}
```
