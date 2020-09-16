# KH2FM Tracker

**This is a preview for the 2.0 rewrite in Vue.js**

This is a tracker intended to be used for the [randomised](https://randomizer.valaxor.com) [Kingdom Hearts 2 Final Mix Garden of Assemblage mod](https://docs.google.com/document/d/1GYjEnrM_TIk7qyO75clPLYD-_nP5wTR7K6SE-Wn-QCg/edit) by [Sonicshadowsilver2](https://twitter.com/Sonicshadowsil2), [Valaxor](https://twitter.com/valaxor), [Desa3579](https://twitter.com/desa3579), and [Bizkit047](https://twitter.com/Bizkit047).

The idea for this tracker came from [ViolinGamer](https://twitter.com/ViolinGamer), and a different version was initially developed by [Kokemon198](https://twitter.com/jorgeoviedo1998) (The original code can be found [here](https://drive.google.com/drive/folders/18iGi4Bq_7q7vbFjopl9BTWD5izxu_bwe), or by going back to the very first commit in this repository). I decided to improve it, recreate it in Vue.js, and put it on the web. (This version shares very little code with the original tracker)

You can find it [here](https://tracker.zaxu.xyz/next).

~~If you want to use the tracker locally offline, or change some of the images, you can find a pre-built zip on the [Releases](https://github.com/zaxutic/kh2fm-rando-tracker/releases/latest) page. To download the release, click the `tracker.zip` link. Note that the releases are automatically generated and there is no guarantee of proper code style if you wish to edit these files directly.~~ Releases haven't been set up for this version yet.

The `gh-pages` branch of the repository contains built, compressed/minified files for the site. (Note: the branch is very large, as it holds multiple versions, and keeps old files for legacy)

Beta Electron builds can be found [here](https://zaxu.xyz/tracker_builds)

## Building

This is for people who want to help develop the tracker, or build it from source.

### Frontend

#### Dependencies

- Node.js
- npm
- `npm install`

#### Build

```sh
# Web
## Run development server
$ npm run serve
## Or build into dist
$ npm run build

# Electron
## Run development server
$ npm run electron:serve
## Or build into dist_electron
$ npm run electron:build  # This will build for the current operating system
## Or
$ npm run electron:build -- --OS  # Replace OS with win, mac, or linux
## Build for windows, mac, and linux in parallel
$ npm run electron:build -- -wml
```

### Backend

The Python websocket server can be run on localhost or on a public server.

#### Dependencies

- Python 3.6.1+
- pip
- `pip install -r requirements.txt`

#### Run

`python ws.py`
