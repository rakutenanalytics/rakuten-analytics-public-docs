---
sidebar_position: 14
id: ios-analytics-database-path
slug: /analytics-sdk/ios/ios-database-path
title: Database Directory Path
added_version: 9.0.0
updated_version: 9.0.0
changelog: ./ios-changelog
---

## How to configure the database directory path
It is possible to change the database directory path in the app's `Info.plist`.

By default the database directory path is `Documents`. It is possible to store the database file in `Library/Application Support`:

- Enable `Library/Application Support` storage:
```xml
<key>RATStoreDatabaseInApplicationSupportDirectory</key>
<true/>
```

- Disable `Library/Application Support` storage:
```xml
<key>RATStoreDatabaseInApplicationSupportDirectory</key>
<false/>
```

⚠️ Note that **database migration is not supported** therefore if you use this setting in a pre-existing app you will lose any previously saved RAT events.
