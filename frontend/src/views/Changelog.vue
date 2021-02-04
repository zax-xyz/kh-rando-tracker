<template lang="pug">
  div
    h1 Recent Update Changelog
    h2 Updated {{ currVersion }}
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
h2
  font-weight normal
  font-size 1.3em

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
