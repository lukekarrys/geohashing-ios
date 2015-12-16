geohashing-ios
==================

An iOS app built for [geohashing](https://xkcd.com/426/) with React Native.

## First

- `npm install`

## Local
- `npm run start`
- `npm run xcode`
- Build for iOS Simulator when XCode launches

## Release
- `npm run bundle`
- Follow the instructions from the [React Native Debugging Docs](https://facebook.github.io/react-native/docs/debugging.html#debugging-react-native-apps) to disable the developer menu:

> To disable the developer menu for production builds, open your project in Xcode and select `Product` → `Scheme` → `Edit Scheme...` (or press `⌘ + <`). Next, select `Run` from the menu on the left and change the Build Configuration to `Release`.

## Upgrading project from 0.8.0 -> 0.16.0 notes

Next time use [`react-native upgrade`](https://facebook.github.io/react-native/docs/upgrading.html#2-upgrade-your-project-templates) which I just learned about.

- Install latest cli `npm install -g react-native-cli`
- Create new project structure `react-native init geohashing`
- Port over existing `src/` directory
- Update `index.{android,ios}.js` files to register `src/components/Main`
- `npm install -g rnpm`
- `rnpm link`
- Follow [getting started instructions](https://github.com/corymsmith/react-native-icons#getting-started---ios) for `react-native-icons` starting at step 3, since `rnpm link` handles steps 1 & 2.
- Then run regular steps for local dev
