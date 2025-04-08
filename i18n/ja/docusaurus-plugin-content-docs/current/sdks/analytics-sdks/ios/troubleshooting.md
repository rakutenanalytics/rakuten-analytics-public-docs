---
sidebar_position: 4
id: ios-troubleshooting
slug: /analytics-sdk/ios/ios-troubleshooting
title: トラブルシューティング
---

## トラブルシューティング

### use_frameworks! を使用せずにプロジェクトをビルドする方法

RakutenAnalyticsはSwiftフレームワークであり、カスタムモジュールマップを含んでいます。

アプリのPodfileに `use_frameworks!` が定義されていない場合、以下のCocoapodsエラーが発生します:

> `Using Swift static libraries with custom module maps is currently not supported.`

この問題を解決するには、以下の手順を実行してください:

1. Podfileに `cocoapods-user-defined-build-types` プラグインを追加します。
2. `RAnalytics` とその依存関係を以下のように `static_framework` として宣言します:

```
plugin 'cocoapods-user-defined-build-types'
enable_user_defined_build_types!

target 'MyApp' do
  pod 'RAnalytics', :build_type => :static_framework
end
```

**注意:** `cocoapods-user-defined-build-types` プラグインはサードパーティによって開発されており、そのサポートが継続されることを保証するものではありません。

### RakutenAnalytics Swift Package チェックアウトのヒント

XcodeでRakutenAnalytics Swift Packageをチェックアウトできない場合、以下の2つのコマンドラインを実行してください:

```
/usr/libexec/Plistbuddy -c "Add :IDEPackageSupportUseBuiltinSCM bool 1" ~/Library/Preferences/com.apple.dt.Xcode.plist
xcodebuild -scheme MyScheme -resolvePackageDependencies -usePackageSupportBuiltinSCM
```
