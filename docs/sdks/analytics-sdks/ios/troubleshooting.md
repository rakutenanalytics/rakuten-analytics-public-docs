---
sidebar_position: 4
id: ios-troubleshooting
slug: /analytics-sdk/ios/ios-troubleshooting
title: Troubleshooting
---

## Troubleshooting

### How to build your project without use_frameworks!

RakutenAnalytics is a Swift framework and contains a custom module map.

If `use_frameworks!` is not defined in your app's Podfile the following Cocoapods error occurs:


> `Using Swift static libraries with custom module maps is currently not supported.`

To solve this problem:
1. Add `cocoapods-user-defined-build-types` plugin to your Podfile
2. Declare `RAnalytics` and its dependencies as `static_framework` as follows:

```
plugin 'cocoapods-user-defined-build-types'
enable_user_defined_build_types!

target 'MyApp' do
  pod 'RAnalytics', :build_type => :static_framework
end
```

**Note:** The `cocoapods-user-defined-build-types` plugin is developed by a third party and we cannot guarantee that its support will continue.

### RakutenAnalytics Swift Package checkout tip

If you can't checkout the RakutenAnalytics Swift Package in Xcode, please execute these 2 command lines:
```
/usr/libexec/Plistbuddy -c "Add :IDEPackageSupportUseBuiltinSCM bool 1" ~/Library/Preferences/com.apple.dt.Xcode.plist
xcodebuild -scheme MyScheme -resolvePackageDependencies -usePackageSupportBuiltinSCM
```
