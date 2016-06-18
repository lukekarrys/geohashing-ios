geohashing-ios
==================

An iOS app built for [geohashing](https://xkcd.com/426/) with React Native.

## Related Projects

- [geohash-cli](https://github.com/lukekarrys/geohash-cli): Get the same info on your CLI
- [geohash-coordinates](https://github.com/lukekarrys/geohash-coordinates): Does the heavy lifting for this project and the CLI of actually getting the coordinates
- [geo-graticule](https://github.com/lukekarrys/geo-graticule): Get info about a graticule for any geocode
- [djia](https://github.com/lukekarrys/djia): Get the Dow Jones opening value (which is used in the geohash algorithm)
- [hex-frac-dec-frac](https://github.com/lukekarrys/hex-frac-dec-frac): Convert a hexadecimal fraction to a decimal fraction (also used by the algorithm)

## Developing and Building to Device

### First

- `npm install`

### Local

- `npm run start`
- `npm run xcode`
- Build for iOS Simulator when XCode launches

### Release

- `npm run bundle`
- Follow the instructions from the [React Native Debugging Docs](https://facebook.github.io/react-native/docs/debugging.html#debugging-react-native-apps) to disable the developer menu:

> To disable the developer menu for production builds, open your project in Xcode and select `Product` → `Scheme` → `Edit Scheme...` (or press `⌘ + <`). Next, select `Run` from the menu on the left and change the Build Configuration to `Release`.


## Known Issues

- If the react-native packager has errors the contain `[BABEL]` run the `npm run postinstall` command. This command should be run on after any install automatically but it case it isn't, it removes the `.babelrc` files from other dependencies within `node_modules/` which can cause issues now that react-native is on Babel 6. See [react-native #4062](https://github.com/facebook/react-native/issues/4062#issuecomment-164598155) for more info.


## Upgrading project to latest react-native

Use [`react-native upgrade`](https://facebook.github.io/react-native/docs/upgrading.html#2-upgrade-your-project-templates).

## Gif!

![gif](https://cldup.com/2wc-X5x034.gif)
