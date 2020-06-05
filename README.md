# KH2FM Tracker

This is a tracker intended to be used for the randomised [Kingdom Hearts 2 Final Mix Garden of Assemblage mod](https://docs.google.com/document/d/1GYjEnrM_TIk7qyO75clPLYD-_nP5wTR7K6SE-Wn-QCg/edit) by [Sonicshadowsilver2](https://twitter.com/Sonicshadowsil2), [Valaxor](https://twitter.com/valaxor), [Desa3579](https://twitter.com/desa3579), and [Bizkit047](https://twitter.com/Bizkit047).

The idea for this tracker came from [ViolinGamer](https://twitter.com/ViolinGamer), and was initially developed by [Kokemon198](https://twitter.com/jorgeoviedo1998) (The original code can be found [here](https://drive.google.com/drive/folders/18iGi4Bq_7q7vbFjopl9BTWD5izxu_bwe), or by going back to the very first commit in this repository). I decided to fork the code, refactor it, and put it on a site.

You can find it [here](https://zaxutic.github.io/kh2fm-rando-tracker/).

## Building

```sh
# Install dependencies
npm install pug-cli -g
npm install stylus -g
npm install uglify-es -g
```

```sh
make
```

The site will be built into a `dist` subdirectory.
