<template lang="pug">
  div
    h2 {{ pool }}
    .grid
      button(
        v-for="ability in Object.keys(items.abilities[pool].abilities)"
        @click="selectAbility(ability)"
       ) {{ ability }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Items } from "@/store/tracker_important/state";

const tracker = namespace("tracker_important");

@Component
export default class GoaracleAbilities extends Vue {
  @tracker.State items!: Items;
  @tracker.State("currentGoaraclePool") pool!: string;

  selectAbitily(ability: string) {}
}
</script>

<style lang="stylus" scoped>
.grid
  display grid
  place-content center
  grid-template-columns repeat(3, 125px)
  grid-gap 10px

button
  display grid
  place-content center
  height 0
  padding 50% 0 // hack to make height equal to width, while maintaining a center
  background rgba(255, 255, 255, .1)
  box-shadow none
  border-radius 2px
  font-size 1.1em
  transition color .25s, background-color .25s, box-shadow .25s, transform .25s, border-radius .2s

  &:hover:not(:disabled)
    background rgba(255, 255, 255, .15)
    border-radius 4px
    box-shadow 0 3px 25px -5px rgba(0, 0, 0, .3), 0 6px 15px -5px rgba(0, 0, 0, .13)

  &.incorrect
    background hsla(0, 100%, 70%, .8) !important

  &:disabled
    background hsla(0, 50%, 70%, .8) !important

    &:hover
      transform none
      cursor auto

  &.found
    visibility hidden
</style>
