---
sidebar_position: 9.1
id: android-analytics-identity-container
slug: /analytics-sdk/android/identity-container
title: Identity Container
added_version: 12.0.0
changelog: ./android-changelog
---

## Secure storage for user's sensitive data
Analytics SDK provides an Identity Container to manage user identities and sensitive data. It is a key-value store that holds user identities as pairs of keys and values.

The primary purpose of the Identity Store within this container is to provide a secure and persistent storage mechanism for the member identifier when using [`setMemberIdentifier()` API](member-identifier.md).

## Usage
The Identity Store, which manages user identities, can be configured in two ways:
    * **Default Encrypted Identity Store**: Uses the pre-built, secure Identity Store provided by the Analytics SDK. 
    * **Custom Identity Store**: Create your own Identity Store with a security implementation tailored to your specific container requirements.

### Default Encrypted Identity Store
The default Identity store is an encrypted store that uses encryption to store the user identities.  To use the default Identity Store, follow these steps:

#### Set Up the IdentityStore

First, define a directory where the encrypted identity data will be stored. For example:
```kotlin
val storageDir = File(context.filesDir, "identity")
```

Next, define the encryption key used to protect the identity data. Important: Replace "your-encryption-key" with a strong, securely managed key.
```kotlin
val encryptionKey = "your-encryption-key".toByteArray()
```

Finally, create the IdentityStore instance using the Builder, specifying the storage directory and encryption key:
```kotlin
val encryptedStore = IdentityStore.Builder()
    .setEncryptedIdentityStore(storageDir, encryptionKey)
    .build()
```

#### Integrate it with Analytics SDK
Use the `setIdentityStore` method to set the IdentityStore in analytics SDK.
```kotlin
encryptedStore?.let {
    AnalyticsManager.setIdentityStorage(it)
}
```

### Custom Identity Store
To create your own Identity Store, implement the IdentityStore interface and update the necessary methods to save, retrieve, and remove user identities.

:::tip
The following example demonstrates a basic custom Identity Store that uses a mutable map for storage.  This is for illustrative purposes only. In a real-world scenario, you would likely use a more persistent and secure storage mechanism such as a database, or a secure key-value store, potentially incorporating your preferred encryption method. The custom implementation allows you to tailor the storage and security of user identities to your specific application requirements.
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

#### Integrate it with Analytics SDK
Use the `setIdentityStore()` method to set the IdentityStore in analytics SDK.
```kotlin
val customIdentityStore = CustomIdentityStore()
AnalyticsManager.setIdentityStorage(customIdentityStore)
```

#### Self clearing the Identity Store directory
:::warning
Clearing the Identity Store directory will permanently erase the stored data, effectively deleting the Identity Store. Consequently, **tracked events will no longer include the member identifier in their payload until a new login action is performed**, re-establishing the user's identity.
:::

## Saving and Retrieving Identities
Although the primary function of the Identity container is to manage the storage of the member identifier when using the `setMemberIdentifier()` API , the Identity Store can also be used to securely store and retrieve other user identities or sensitive data that requires persistent and protected storage.

To save data in the IdentityStore, use the save method.
```kotlin
encryptedStorage?.save("key", "value")
```

To retrieve data from the IdentityStore, use the get method.
```kotlin
val value = encryptedStorage?.get("key")
```

To remove data from the IdentityStore, use the remove method.
```kotlin
encryptedStorage?.remove("key")
```

## Removing usage of the Identity Store in Analytics SDK
To remove the usage of the Identity Store in Analytics SDK, set the Identity Store to null.
```kotlin
 AnalyticsManager.setIdentityStorage(null)
```
:::info  
Removing usage of the Identity Store in Analytics SDK results in the migration of previously saved member identifier to the default local store.  This default local store is **not** encrypted.
:::







