<template lang="pug">
  div
    h3 Left Click
    p The item will become activated, lighting up to full opacity.
    p When clicking on a world more than once, if applicable, a number will appear in the bottom right indicating how many visits have been completed. There are similar systems for drive, magic, summon, and Sora levels.
      BaseTooltip 'Visits' for Atlantica/100 Acre Wood represent not whole world completion but segment completion. That is, song completion for Atlantica (including the tutorial), and pages for 100 Acre Wood.
      BaseTooltip The counter for Sora's Level will increase in increments of +1 from LV1-15, then +5 from LV15-50 and +10 from LV50-99.
    p After all visits have been completed, clicking again will either trigger a symbol to appear in the top left, for defeat of the Data Org/Absent Sillhouette fight, or reset the cell back to its original state.

    h3 Right Click
    ul.definitions
      li
        .base Hollow Bastion
        .definition Defeated Sephiroth
      li
        .base Cavern of Remembrance
        .definition All Chests until 1st Fight, All Chests until 2nd Fight, All Remaining Chests, Cleared Nobody Fights
      li
        .base Olympus Coliseum
        .definition Cleared Pain and Panic Cup, Cerberus Cup, Titan Cup, Goddess of Fate Cup, Hades Paradox Cup
      li
        .base Disney Castle
        .definition Defeated Lingering Will/Terra
      li
        .base The World That Never Was
        .definition Defeated Roxas, Xigbar, Luxord, Saïx, Xemnas
      li
        .base 100 Acre Wood
        .definition Torn Page Counter
      li
        .base Sora's level
        .definition Obtained Second Chance, Once More, Second Chance and Once More
      li
        .base Drive Forms
        .definition Growth Ability Counter (High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide)
      li
        .base The Three Proofs
        .definition Obtained Bronze Crown, Silver Crown, Gold Crown

    h3 Middle Click
    p A red cross will be put over the item, for if a world/item is disabled in the seed. (Items can now be completely removed in rearrange mode.)

    h3 Modifiers
    p Holding ctrl while clicking on an item will go backwards rather than forwards. This works both for left click and right click.
    p Holding shift while left clicking will increase the level without lighting up the item. This is useful if you are leveling up a drive form using its auto ability but haven't unlocked the form itself. E.g. leveling up Valor Form through Auto Valor.

    h3 OBS Browser Source
    p Gameaddict has a <a href="https://docs.google.com/document/d/1STiVyCUkyx9_ZiEuXBU71gJSisJT4hvagxvqK0VOqU8/edit">guide</a> on using the tracker as a browser source in OBS if you wish to use it this way. This is not the same as capturing your browser window directly - the tracker is opened in OBS itself.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseTooltip from "@/components/BaseTooltip.vue";

@Component({
  components: {
    BaseTooltip
  }
})
export default class Help extends Vue {}
</script>

<style lang="stylus" scoped>
.definitions
  position relative
  padding-left 2em
  list-style none

  li
    &:before
      position: absolute;
      margin-left: -.75em;
      content: '·';

    .base
    .definition
      display inline

    .base:after
        content ' - '
        white-space pre-wrap

    .definition
      font-style italic
      font-weight 300
</style>
