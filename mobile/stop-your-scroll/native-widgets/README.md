# SYS native widgets

This folder contains native widget scaffolding for Stop Your Scroll - SYS.

## Android

Android is wired through the Expo config plugin at:

`plugins/withSysAndroidWidget.js`

Run a native prebuild before testing:

```sh
npx expo prebuild --platform android
```

Then build/run Android. The widget should appear in the Android launcher widget picker as `SYS`.

## iOS

iOS widgets require a WidgetKit extension target in Xcode. The Swift widget view is scaffolded at:

`native-widgets/ios/SysWidget.swift`

After generating the iOS project:

```sh
npx expo prebuild --platform ios
```

Open Xcode, add a Widget Extension target, and replace its generated Swift file with `SysWidget.swift`.

If Xcode generated `SysWidgetBundle.swift`, keep `@main` on the bundle only. `SysWidget.swift` is intentionally written without `@main` so it can be referenced from the bundle:

```swift
@main
struct SysWidgetBundle: WidgetBundle {
    var body: some Widget {
        SysWidget()
    }
}
```

## Current widget content

The initial widget is intentionally simple:

- brand logo and name
- remaining social time
- next block time

The values are static for now. To make them live, the app and widget need shared native storage:

- Android: `SharedPreferences`
- iOS: App Groups + `UserDefaults(suiteName:)`
