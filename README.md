geohashing-ios
==================

[![Greenkeeper badge](https://badges.greenkeeper.io/lukekarrys/geohashing-ios.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/lukekarrys/geohashing-ios.png?branch=master)](https://travis-ci.org/lukekarrys/geohashing-ios)

An iOS app built for [geohashing](https://xkcd.com/426/) with React Native.

## Related Projects

- [geohash-cli](https://github.com/lukekarrys/geohash-cli): Get the same info on your CLI
- [geohash-coordinates](https://github.com/lukekarrys/geohash-coordinates): Does the heavy lifting for this project and the CLI of actually getting the coordinates
- [geo-graticule](https://github.com/lukekarrys/geo-graticule): Get info about a graticule for any geocode
- [djia](https://github.com/lukekarrys/djia): Get the Dow Jones opening value (which is used in the geohash algorithm)
- [hex-frac-dec-frac](https://github.com/lukekarrys/hex-frac-dec-frac): Convert a hexadecimal fraction to a decimal fraction (also used by the algorithm)

## Developing

- `npm install`
- `npm run start`
- `npm run xcode`
- Build for iOS Simulator when XCode launches

## Release

- Set scheme to release

> To disable the developer menu for production builds, open your project in Xcode and select `Product` → `Scheme` → `Edit Scheme...` (or press `⌘ + <`). Next, select `Run` from the menu on the left and change the Build Configuration to `Release`.

- Build for device from Xcode

For more info, see the full [running on device docs](https://facebook.github.io/react-native/docs/running-on-device-ios.html#building-your-app-for-production)

## Gif!

![gif](https://cldup.com/2wc-X5x034.gif)
