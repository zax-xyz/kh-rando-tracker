<template lang="pug">
  div
    h1 Recent Update Changelog

    section
      h2 Saturday 6 March 2021

      .added
        h3 Added
        ul
          li #[strong Many new icons made by Televo have been added], including #[strong world progression icons]! Majority of the existing icons used in the tracker have also been reworked, including magic, all of the minimal-style icons, Sora's Heart, Drive (location, in important checks mode), and several others. The minimal-style icons now have a metallic-like feel to them. If you use minimal-style icons, make sure to enable the new minimal torn pages icon in the settings!
          li Hollow Bastion and Olympus Coliseum in important checks mode now have the CoR/Cups progress on shift+click, and show in the top-right corner, separate from the main world progress icons.

      .changed
        h3 Changed
        ul
          li Proof icons are no longer shown next to their locations in order to make room for the additional progress icons. Instead, minimal-style icons of the location are shown next to the proofs.
          li All images have been converted to #[a(href="https://developers.google.com/speed/webp") WebP format] and resized to be optimised for the web, greatly improving the performance on slow internet connections and minimising the amount of bandwidth required.
          li Optimisations under the hood to the code to improve the performance on slow internet connections further. Certain views may not show immediately on slow connections and loading them is delayed to improve the initial load time.

    section
      h2 Tuesday 2 March 2021
      p 2.0 is now the default version

      .added
        h3 Added
        ul
          li #[strong Show hinted hints when a world is hinted by a world that hints another world that has a proof]. E.g. World A hints world B, which has a proof, and world A also hints world C. Since world A hinted world B, it must be hinted, and hence world C is a hinted hint.

      .fixed
        h3 Fixed
        ul
          li Use proper icon styles for the small proof icons next to worlds in which they were found, if not using default.

    section
      h2 Thursday 18 February 2021

      .added
        h3 Added
        ul
          li Show faint question mark in place of a number for worlds that are known must be hinted (has a proof or hints a world that has a proof) but the report hasn't been found for yet

      .changed
        h3 Changed
        ul
          li Adjusted positions of icons displayed next to worlds slightly to be more spacious

      .fixed
        h3 Fixed
        ul
          li Fixed proof icon fade animation in corner of world when multiple proofs have been marked for it and one is removed

    section
      h2 Sunday 14 February 2021

      .fixed
        h3 Fixed
        ul
          li Fixed not being able to mark forms levelled through auto ability (shift+click) past level 2
          li Fixed shift-levelling a form incrementing the number of checks found in a location
          li Fixed trying to mark a form that's been levelled through its auto ability or has been removed from a location being marked as in GoA/Critical Extra rather than its actual location
          li Fixed not being able to shift level a form that has been removed from a location

    section
      h2 Friday 12 February 2021
      p All changes are for the 'Important Checks Mode'
      p
        strong Some changes may require a press of the 'Reset Tracker' button

      .added
        h3 Added
        ul
          li #[strong Indicator for how many hinted checks you have, and how many checks are hinted in total], next to the indicator for overall checks. This is only shown if you have hints loaded. This can be disabled in the settings.
          li #[strong Show proof icons next to the worlds you found them in]. The proofs will be shown in the top-right corners of the worlds, each next to each other if there were multiple in one location.

      .changed
        h3 Changed
        ul
          li #[strong Moved Data/AS icons to right-click, after any other right-click icons].
          li #[strong Moved right-click icons from the top right to the top left].
          li The colour cycle for number of checks should stop if it is greater than the total, although this shouldn't be able to happen anymore unless you change the number manually.

    section
      h2 Wednesday 10 February 2021
      p 2.0 is no longer called a preview. 1.x is now considered legacy and users are urged to migrate.

      .added
        h3 Added
        ul
          li #[strong Button to import settings from 1.x.x versions]. Doesn't include 'Dark Theme' and 'Lower Atlantica/100 Acre Wood Total' options. I don't plan on adding a light theme to this version, and the lower total option I feel is unnecessary as there's no reason you would need to use the full cycle if you don't want to.

      .fixed
        h3 Fixed
        ul
          li Fixed size options in settings for important checks mode only changing the row height and not the size of the icons themselves, due to an oversight in a recent internal change
          li The donald icon shown on right-click for Fire, Blizzard, and Thunder on 'normal' mode is no longer abnormally big

    section
      h2 Friday 5 February 2021
      .fixed
        h3 Fixed
        ul
          li Reports found in worlds set to 'Vanilla' now work

    section
      h2 Thursday 4 February 2021
      p All updates are for the 'Important Checks Mode'
      p
        strong Usage of some new features may require a press of the 'Reset Tracker' button

      .added
        h3 Added
        ul
          li #[strong Support selecting a world first by clicking on it, then the checks found there]. Drag-and-drog is still supported alongside this. This behaviour can be disabled in the settings.
          li #[strong Show checks found in a location by middle clicking on the world]. Disabling a world now has to be done while holding the Shift key.
          li #[strong Option to show Altantica]. A setting can be found in Settings > Important Checks Mode, however #[b #[i this setting will be ignored when loading hints, and the hint settings will be used instead]].

      .fixed
        h3 Fixed
        ul
          li Typo in settings tooltip
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component
export default class Changelog extends Vue {
  @State currVersion!: string;
  @Mutation updateVersion!: Function;

  mounted() {
    this.updateVersion();
  }
}
</script>

<style lang="stylus" scoped>
h1
  font-size 2.2em

section
  margin-bottom 2em

h2
  font-weight normal
  font-size 1.7em

h3
  text-transform uppercase
  display flex

  &::before
  &::after
    content ''
    margin auto
    border-bottom 2px solid

  &::before
    width 10px
    margin-right 5px

  &::after
    flex 1
    margin-left 5px

strong
  font-style italic

highlight-colors(color)
  h3
  strong
    color color

.added
  highlight-colors hsl($green-hue, 60%, 75%)

.changed
  highlight-colors hsl($accent-hue, 90%, 75%)

.fixed
  highlight-colors hsl($orange-hue, 90%, 65%)
</style>
