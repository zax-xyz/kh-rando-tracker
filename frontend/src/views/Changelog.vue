<template lang="pug">
  div
    h1 Recent Update Changelog

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

.added
  h3
  strong
    color hsl($green-hue, 60%, 75%)

.fixed
  h3
  strong
    color hsl(30, 90%, 65%)
</style>
