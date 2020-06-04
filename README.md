# KH2FM Tracker

This is a tracker intended to be used for the randomised [Kingdom Hearts 2 Final Mix Garden of Assemblage mod](https://docs.google.com/document/d/1GYjEnrM_TIk7qyO75clPLYD-_nP5wTR7K6SE-Wn-QCg/edit) by [Sonicshadowsilver2](https://twitter.com/Sonicshadowsil2), [Valaxor](https://twitter.com/valaxor), [Desa3579](https://twitter.com/desa3579), and [Bizkit047](https://twitter.com/Bizkit047).

The idea for this tracker came from [ViolinGamer](https://twitter.com/ViolinGamer), and was initially developed by [Kokemon198](https://twitter.com/jorgeoviedo1998). I decided to fork the code, refactor it, and put it on a site.

You can find it [here](https://zaxutic.github.io/kh2fm-rando-tracker/).

## Building

Building the site requires the `pug` and `stylus` preprocessors to compile HTML and CSS respectively. `uglify-es` is optional for minifying the JS files (The included `Makefile` uses `uglifyjs` and will not work without it). These can all be installed through `npm install <package> -g`.

To build the site, you should run `make` in the root of the repository. It will be built into the `dist` subdirectory. Alternatively, you can run the `pug` and `stylus` preprocessors manually, along with `uglifyjs` (or just copy the `js` folder directly if you don't care about minification), and copy the images.
