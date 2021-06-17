<template lang="pug">
  div
    h1 Recent Update Changelog

    section
      h2 Thursday 17 Jun 2021

      p Reset Tracker is required for many of these updates to take effect.

      .fixed
        h3 Fixed
        ul
          li #[strong Fixed totals for KH1]. Library books should now go up to 2, navi pieces should go up to 2, and emblem pieces should go up to 4.
          li #[strong Fixed progression icon order] for Deep Jungle and Monstro.
          li #[strong Days now uses the correct Olympus Coliseum icon] (KH1 style rather than KH2).
          li #[strong KH3 now has numbers for datas, levels, and reports].
          li #[strong Fixed preloading images for KH2 when not necessary].
          li #[strong Properly preload number images for the current game].

    section
      h2 Tuesday 15 Jun 2021

      .added
        h3 Added
        ul
          li #[strong Show corresponding magic spells that were replaced] when obtaining a spell. A popup is shown to select the replaced spell upon getting a spell for the first time. This can be disabled in the settings.

      .fixed
        h3 Fixed
        ul
          li #[strong Postcards now goes up to 10]. This will require a press of Reset Tracker to update.
          li #[strong Fix footer reappearing when opening a popup with footer hidden].

    section
      h2 Monday 14 Jun 2021

      .changed
        h3 Changed
        ul
          li An internal redesign of the underlying code structure. As a side effect, the page should load a bit faster on slow connections.

      .fixed
        h3 Fixed
        ul
          li #[strong Fixed bug involving remembering custom icon orders between different games] set through rearrange mode in Settings &gt; Normal. Legacy settings are moved into KH2. If this is not the desired result, press Reset in the settings with the game is set to KH2, and reorder the icons again with the correct game.
          li #[strong Fixed selecting DDD breaking the tracker] due to a typo that replaced BBS with DDD.

    section
      h2 Sunday 13 Jun 2021

      .added
        h3 Added
        ul
          li #[strong Added all key items to KH1 mode]. Thanks to Televo for all of the icons for these.
          li #[strong Added progression icons for worlds in KH1]. Thanks to Televo for the icons here again!
          li #[strong Added settings to hide different categories of icons in KH1 mode]. There is also a #[strong toggle] to #[strong expand the Destiny Islands raft supplies] (1 grouped icon vs 8 individual icons).
          li #[strong Added CoM, Days, BBS, Coded, DDD, and KH3]. Again, thanks to Televo for the icons!
          li #[strong Added remote view for OBS with true transparency]. Create a single-mode co-op room and use the generated link with an OBS browser source to use it, similar to Streamlabs overlays. Also works cross-device, including mobile.
            ul
              li Note that this is #[b #[i not]] available for KH2 important checks mode (yet).
              li You will want to resize the browser source view to fit the whole tracker. For KH1 with default settings, this is 580x800.

      .changed
        h3 Changed
        ul
          li To better accomodate the new changes, no longer uses a KH1 mode toggle, but a #[strong dropdown menu to select the game] instead.
          li #[strong Disable some KH1 settings like showing worlds, and expand raft supplies by default] as per the general community preference. Change these in Settings &gt; KH1 if you wish.
          li Now #[strong only shows the icon style settings relevant to the current game] in Settings &gt; Icon Style. This screen should be somewhat less cluttered now.
          li Minor style changes in the modal menus.

      .fixed
        h3 Fixed
        ul
          li #[strong Co-op mode now works with KH1 and all games other than KH2 on important check mode]. This will soon be fixed for KH2 important checks mode.

    section
      h2 Sunday 16 May 2021

      .added
        h3 Added
        ul
          li #[strong Added dalmations and trinities to KH1 mode]. Thanks to Televo for this. As always, minimal versions are available through the settings.

      .changed
        h3 Changed
        ul
          li No longer shows the "Important Checks Mode" switch and "Upload Hints" button in KH1 mode.
          li No longer show the 1 on Sora's levels beneath the actual level.

    section
      h2 Friday 27 April 2021
      p Some changes may require you to Reset Tracker

      .added
        h3 Added
        ul
          li #[strong Added a KH1 Mode!] Thanks to Televo for creating the icons for this and helping design it. Toggle the "KH1FM Mode" switch at the bottom of the page to enable it.

      .changed
        h3 Changed
        ul
          li We have rebranded with a more generic name, since this is no longer focused on just KH2FM.

      .fixed
        h3 Fixed
        ul
          li Fixed KH2FM cups right-click not working in non-important checks mode.

      h2 Thursday 18 March 2021

      .fixed
        h3 Fixed
        ul
          li Fixed Co-Op mode not sending anything between everyone
          li Fixed shift+click in Co-Op mode

    section
      h2 Saturday 13 March 2021

      .added
        h3 Added
        ul
          li #[strong Forms and the worlds they were found in are now shown as hinted if a proof was found on drive levels], and similarly for #[strong torn pages]. This shows more inferred hinted hints. E.g. Proof of Connection was found on Wisdom Form level 2. Valor Form was found in Port Royal. Port Royal has a report that hints Beast's Castle. Since all forms must be hinted, then Port Royal must be hinted, and Beast's Castle is hence a hinted hint.

      .fixed
        h3 Fixed
        ul
          li Fixed cross icon (middle-click) not showing on Normal Mode (Important Checks Mode OFF).

    section
      h2 Saturday 6 March 2021
      p(style="color: hsl(0, 90%, 70%")
        strong
          u This update requires you to click the Reset Tracker button for the changes to fully apply

      .added
        h3 Added
        ul
          li #[strong Many new icons made by Televo have been added], including #[strong world progression icons]! Majority of the existing icons used in the tracker have also been reworked, including magic, all of the minimal-style icons, Sora's Heart, Drive (location, in important checks mode), and several others. The minimal-style icons now have a metallic-like feel to them. If you use minimal-style icons, make sure to enable the new minimal torn pages icon in the settings!
          li Hollow Bastion, Olympus Coliseum, and Disney Castle in important checks mode now have the CoR progress/Cups progress/Lingering Will icons on shift+click respectively, and show in the top-right corner, separate from the main world progress icons.

      .changed
        h3 Changed
        ul
          li Proof icons are no longer shown next to their locations in order to make room for the additional progress icons. Instead, minimal-style icons of the location are shown next to the proofs.
          li All images have been converted to #[a(href="https://developers.google.com/speed/webp") WebP format] and resized to be optimised for the web, greatly improving the performance on slow internet connections and minimising the amount of bandwidth required.
          li Optimisations under the hood to the code to improve the performance on slow internet connections further. Certain views may not show immediately on slow connections as loading them is delayed to improve the initial load time.

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
