# KH2FM Tracker

This is a tracker intended to be used for the [randomised](https://randomizer.valaxor.com) [Kingdom Hearts 2 Final Mix Garden of Assemblage mod](https://docs.google.com/document/d/1GYjEnrM_TIk7qyO75clPLYD-_nP5wTR7K6SE-Wn-QCg/edit) by [Sonicshadowsilver2](https://twitter.com/Sonicshadowsil2), [Valaxor](https://twitter.com/valaxor), [Desa3579](https://twitter.com/desa3579), and [Bizkit047](https://twitter.com/Bizkit047), and the [KH1FM Randomizer](https://github.com/Denhonator/KHPCSpeedrunTools/tree/main/1FMMods) by [Denhonator](https://github.com/Denhonator).

The idea for this tracker came from [ViolinGamer](https://twitter.com/ViolinGamer), and a different version was initially developed by [Kokemon198](https://twitter.com/jorgeoviedo1998) (The original code can be found [here](https://drive.google.com/drive/folders/18iGi4Bq_7q7vbFjopl9BTWD5izxu_bwe), or by going back to the very first commit in this repository). I decided to improve it, recreate it in Vue.js, and put it on the web. (This version shares very little code with the original tracker)

You can find it [here](https://tracker.zaxu.xyz).

Beta Electron builds can be found [here](https://zaxu.xyz/tracker_builds)

This repository holds the frontend for the website, the [backend is in a separate repo](https://github.com/zaxutic/kh-rando-tracker-backend).

## Project setup
```sh
npm install
```

### Compiles and hot-reloads for development
```sh
npm run serve
```

### Compiles and minifies for production
```sh
npm run build
```

### Compiles and hot-reloads for development (Electron desktop app)
```sh
npm run electron:serve
```

### Compiles and minifies for production (Electron desktop app)
Refer to [electron-builder docs](https://www.electron.build/multi-platform-build.html) for more information

#### Build for current operating system
```sh
npm run electron:build
```

#### Build for specific operating system
```sh
npm run electron:build -- --win  # win can be replaced with mac or linux
# or
npm run electron:build -- -w  # w can be replace with m or l
```

#### Build for multiple platforms at once
```sh
npm run electron:build -- -wml
```
