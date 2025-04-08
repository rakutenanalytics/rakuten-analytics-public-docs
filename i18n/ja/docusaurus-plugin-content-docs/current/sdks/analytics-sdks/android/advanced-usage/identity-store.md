---
sidebar_position: 9.1
id: android-analytics-identity-container
slug: /analytics-sdk/android/identity-container
title: アイデンティティコンテナ
added_version: 12.0.0
changelog: ./android-changelog
---

## ユーザーの機密データの安全なストレージ

Analytics SDK は、ユーザーの ID と機密データを管理するための Identity Container を提供します。これは、キーと値のペアとしてユーザー ID を保持するキー値ストアです。

Identity Store の主な目的は、[`setMemberIdentifier()` API](member-identifier.md) を使用する際に、メンバー識別子のための安全で永続的なストレージメカニズムを提供することです。

## 使用方法

ユーザー ID を管理する Identity Store は、以下の 2 つの方法で構成できます：

- **Default Encrypted Identity Store**: Analytics SDK によって提供される事前構築された安全な Identity Store を使用します。
- **Custom Identity Store**: 特定のコンテナ要件に合わせたセキュリティ実装を使用して独自の Identity Store を作成します。

### Default Encrypted Identity Store

デフォルトの Identity Store は暗号化されたストアであり、暗号化を使用してユーザー ID を保存します。デフォルトの Identity Store を使用するには、以下の手順に従ってください。

#### IdentityStore のセットアップ

まず、暗号化された ID データを保存するディレクトリを定義します。例：

```kotlin
val storageDir = File(context.filesDir, "identity")
```

次に、ID データを保護するために使用する暗号化キーを定義します。重要: "your-encryption-key" を強力で安全に管理されたキーに置き換えてください。

```kotlin
val encryptionKey = "your-encryption-key".toByteArray()
```

最後に、ストレージディレクトリと暗号化キーを指定して Builder を使用して IdentityStore インスタンスを作成します。

```kotlin
val encryptedStore = IdentityStore.Builder()
    .setEncryptedIdentityStore(storageDir, encryptionKey)
    .build()
```

#### Analytics SDK への統合

`setIdentityStore` メソッドを使用して、Analytics SDK に IdentityStore を設定します。

```kotlin
encryptedStore?.let {
    AnalyticsManager.setIdentityStorage(it)
}
```

### Custom Identity Store

独自の Identity Store を作成するには、IdentityStore インターフェースを実装し、ユーザー ID を保存、取得、および削除するために必要なメソッドを更新します。

:::tip
以下の例は、ストレージにミュータブルマップを使用する基本的なカスタム Identity Store を示しています。これは説明目的のみです。実際のシナリオでは、データベースや安全なキー値ストアなど、より永続的で安全なストレージメカニズムを使用し、必要に応じて暗号化方法を組み込むことが推奨されます。カスタム実装により、ユーザー ID のストレージとセキュリティを特定のアプリケーション要件に合わせて調整できます。
:::

```kotlin
class CustomIdentityStore : IdentityStore {
    private val store = mutableMapOf<String, String>()

    override suspend fun save(key: String, value: String) {
        store[key] = value
    }

    override suspend fun get(key: String): String? {
        return store[key]
    }

    override suspend fun remove(key: String) {
        store.remove(key)
    }
}
```

#### Analytics SDK への統合

`setIdentityStore()` メソッドを使用して、Analytics SDK に IdentityStore を設定します。

```kotlin
val customIdentityStore = CustomIdentityStore()
AnalyticsManager.setIdentityStorage(customIdentityStore)
```

#### Identity Store ディレクトリの自動クリア

:::warning
Identity Store ディレクトリをクリアすると、保存されたデータが完全に消去され、Identity Store が削除されます。その結果、**新しいログインアクションが実行され、ユーザーの ID が再確立されるまで、トラッキングされたイベントのペイロードにメンバー識別子が含まれなくなります**。
:::

## ID の保存と取得

Identity Container の主な機能は、`setMemberIdentifier()` API を使用する際にメンバー識別子のストレージを管理することですが、Identity Store は他のユーザー ID や永続的かつ保護されたストレージを必要とする機密データを安全に保存および取得するためにも使用できます。

IdentityStore にデータを保存するには、`save` メソッドを使用します。

```kotlin
encryptedStorage?.save("key", "value")
```

IdentityStore からデータを取得するには、`get` メソッドを使用します。

```kotlin
val value = encryptedStorage?.get("key")
```

IdentityStore からデータを削除するには、`remove` メソッドを使用します。

```kotlin
encryptedStorage?.remove("key")
```

## Analytics SDK での Identity Store の使用解除

Analytics SDK で Identity Store の使用を削除するには、Identity Store を null に設定します。

```kotlin
AnalyticsManager.setIdentityStorage(null)
```

:::info
Analytics SDK で Identity Store の使用を削除すると、以前に保存されたメンバー識別子がデフォルトのローカルストアに移行されます。このデフォルトのローカルストアは **暗号化されていません**。
:::
