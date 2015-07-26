geohashing-ios
==================

An iOS app built for [geohashing](https://xkcd.com/426/) with React Native.


# Screenshot

![screenshot](https://github.com/lukekarrys/geohashing-ios/raw/master/screenshots/geohashing.png)


# Getting Started

## First Install

This is using a custom `.babelrc` to allow transformations for modules and class properties. This requires the cache to be cleaned (sometimes?). [React Native #1924](https://github.com/facebook/react-native/issues/1924) will allow a cli param for this but until then it is necessary to add `resetCache: true` to [packager.js](https://gist.github.com/brentvatne/794a77917d7a4b3cce5b/revisions#diff-25c411aaebc5c1757cec74ba9a0d6ba8R229).

## Local
- `npm install`
- `npm start`
- Launch Xcode and build for iOS Simulator

## Release
- `npm install`
- `npm start`
- Once server is ready `npm run release`
- Launch Xcode and do the following from the [React Native Debugging Docs](https://facebook.github.io/react-native/docs/debugging.html#debugging-react-native-apps):

> To disable the developer menu for production builds, open your project in Xcode and select `Product` → `Scheme` → `Edit Scheme...` (or press `⌘ + <`). Next, select `Run` from the menu on the left and change the Build Configuration to `Release`.
