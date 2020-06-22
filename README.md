# KH2FM Tracker

This is a tracker intended to be used for the randomised [Kingdom Hearts 2 Final Mix Garden of Assemblage mod](https://docs.google.com/document/d/1GYjEnrM_TIk7qyO75clPLYD-_nP5wTR7K6SE-Wn-QCg/edit) by [Sonicshadowsilver2](https://twitter.com/Sonicshadowsil2), [Valaxor](https://twitter.com/valaxor), [Desa3579](https://twitter.com/desa3579), and [Bizkit047](https://twitter.com/Bizkit047).

The idea for this tracker came from [ViolinGamer](https://twitter.com/ViolinGamer), and was initially developed by [Kokemon198](https://twitter.com/jorgeoviedo1998) (The original code can be found [here](https://drive.google.com/drive/folders/18iGi4Bq_7q7vbFjopl9BTWD5izxu_bwe), or by going back to the very first commit in this repository). I decided to fork the code, refactor it, and put it on a site.

You can find it [here](https://tracker.zaxu.xyz).

If you want to use the tracker locally offline, or change some of the images, you can find a pre-built zip on the [Releases](https://github.com/zaxutic/kh2fm-rando-tracker/releases/latest) page. To download the release, click the `tracker.zip` link. Note that the releases are automatically generated and there is no guarantee of proper code style if you wish to edit these files directly.

The `gh-pages` branch of the repository also contains built, compressed/minified files for the site (the versions on the releases page contain uncompressed/pretty files for ease of editing).

## Building

This is for people who want to help develop the tracker, or build it from source.

```sh
# Install dependencies
$ npm install stylus pug-cli uglify-es -g
# Build
$ make
```

The site will be built into a `dist` subdirectory.
