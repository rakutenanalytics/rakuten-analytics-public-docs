---
sidebar_position: 10
id: android-analytics-app-to-app
slug: /analytics-sdk/android/android-app-to-app
title: App to App Tracking
added_version: 7.3.0
updated_version: 11.1.0
changelog: ./android-changelog
---

## App to App Tracking

App to App Tracking feature allows app to track details included in the deeplink URI from the "referral" apps to the "referred" apps.

If Analytics SDK v7.3.0 or later is integrated in the referred app, the SDK automatically sends two events to RAT:
* an etype `pv` visit event sent to the **referred** app’s RAT account
* an etype `deeplink` event sent to the **referral** app’s RAT account

### Referred Apps
If the referred app is already running in background when it is opened by the referral app via deeplink or app link, the SDK will not be able to retrieve the referral parameters.

To handle this, the app needs to add the following:

1. Override `onNewIntent` on the activity that will handle the deeplink, and set the new intent to the activity's intent

```kotlin
class YourActivity : Activity() {
...
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        this.intent = intent
    }
...
}
```

### Referral App

Please use the following format for the deeplink URL, and make sure that query parameter values are encoded correctly.

```kotlin
    private fun createDeeplinkUriString(): String {
        val scheme = "samplescheme" // referred app's deeplink scheme
        val host = "samplehost" // referred app's deeplink host
        val packageName = "referral.app.package.name" // referral app's package name

        val builder = StringBuilder()
        builder.append("$scheme://$host?ref=$packageName")

        val acc = "123" // referral app's RAT account ID
        builder.append("&ref_acc=${URLEncoder.encode(acc, StandardCharsets.UTF_8.displayName())}")

        val aid = "456" // referral app's RAT application ID
        builder.append("&ref_aid=${URLEncoder.encode(aid, StandardCharsets.UTF_8.displayName())}")

        // the following values are optional parameters
        val link = "campaign-abc" // unique identifier of the referral trigger
        builder.append("&ref_link=${URLEncoder.encode(link, StandardCharsets.UTF_8.displayName())}")

        val comp = "checkout" // component in the referral app
        builder.append("&ref_comp=${URLEncoder.encode(comp, StandardCharsets.UTF_8.displayName())}")

        // below are the custom parameters that can use any String as parameter key
        // there is currently no limit on the number of custom parameters
        val param1 = "param1" // custom parameter with "custom1" key and "param1" value
        builder.append("&custom1=${URLEncoder.encode(param1, StandardCharsets.UTF_8.displayName())}")

        val param2 = "param2" // custom parameter with "custom2" key and "param2" value
        builder.append("&custom2=${URLEncoder.encode(param2, StandardCharsets.UTF_8.displayName())}")

        return builder.toString()
    }
```

To launch referred app, use the created deeplink URI to launch the intent.

```kotlin
    private fun onLaunchApp() {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(createDeeplinkUriString()))
            startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            Log.e(TAG, e.localizedMessage, e.cause)
        }
    }
```

Starting v8.1.0, a helper class is available to easily generate URI with correct format.
```kotlin
   val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
   val host = "samplehost" // referred app's deeplink host
   val packageName = "referral.app.package.name" // referral app's package name
   val acc = 123 // referral app's RAT account ID
   val aid = 456 // referral app's RAT application ID

   val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
   // uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"

   // with optional parameters
   val link = "campaignabc" // unique identifier of the referral trigger
   val comp = "checkout" // component in the referral app
   val customParam = mapOf<String, Any>("custom1" to "param1", "custom2" to "param2")

   val uriOptional = ReferralAppModel(packageName, acc, aid, link, comp, customParam).getReferralUri(scheme, host)
  // uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456&ref_link=campaignabc&ref_comp=checkout&custom1=param1&custom2=param2"
```

**Notes:** The the generated URI ensures that all characters in the keys and values are encoded according to [`RFC 3986`](https://datatracker.ietf.org/doc/html/rfc3986), which is essential for creating valid URL query strings.

#### Parameters for `ReferralAppModel` class
* `packageName` - A required property representing the referral app's package name
* `acc` - A required property representing the referral app's account identifier
* `aid` - A required property representing the referral app's application identifier
* `link` - A optional property representing the unique identifier of the referral trigger
* `comp` - A optional property representing the component of the referral app
* `customParams` - A optional property representing custom key-value parameters

#### Parameters for `ReferralAppModel.getReferralUri()` method
* `scheme` - A required property representing the referred app's scheme for the URI (ex. "https", "appscheme", etc.).
* `host` - A required property representing the referred app's host for the URI (ex. "rakuten.co.jp", "apphost", etc). An optional path component can be appended to the `host` parameter which can be used by the referred app to determine the component to launch (ex. "rakuten.co.jp/home", "appscheme/settings", etc.).

Starting v11.1.0, `ref` URL query parameter, which uses the `packageName` parameter value when generating referral URI, will now default to the application's package name if `packageName` parameter in `ReferralAppModel` is set to empty string.

Example 1: pass actual app's package name for `packageName` parameter
```kotlin
   val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
   val host = "samplehost" // referred app's deeplink host
   val packageName = "referral.app.package.name" // referral app's package name
   val acc = 123 // referral app's RAT account ID
   val aid = 456 // referral app's RAT application ID

   val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
   // uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"
```

Example 2: pass any value for `packageName` parameter
```kotlin
  val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
  val host = "samplehost" // referred app's deeplink host
  val packageName = "anyValue" // any value
  val acc = 123 // referral app's RAT account ID
  val aid = 456 // referral app's RAT application ID

  val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
  // uri will result to "samplescheme://samplehost?ref=anyValue&ref_acc=123&ref_aid=456"
  // "anyValue" is used as ref parameter value
```

Example 3: pass empty string for `packageName` parameter
```kotlin
  // when packageName is set to empty string
  val scheme = "samplescheme" // referred app's deeplink scheme, can be set to "http" or "https" for App Link
  val host = "samplehost" // referred app's deeplink host
  val packageName = "" // empty string
  val acc = 123 // referral app's RAT account ID
  val aid = 456 // referral app's RAT application ID

  val uri = ReferralAppModel(packageName, acc, aid).getReferralUri(scheme, host)
  // uri will result to "samplescheme://samplehost?ref=referral.app.package.name&ref_acc=123&ref_aid=456"
  // application's package name is used as ref parameter value
```

### Enable/Disable App-to-App referral tracking
By default the SDK automatically tracks the app-to-app referral tracking, `pv` and `deeplink` events are tracked. The automatic tracking can be disabled by adding `_rem_applink` to disabled events list. More details can be found in [Automatic Event Tracking Configuration](./android-auto-tracking) section.
