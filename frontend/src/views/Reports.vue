<template lang="pug">
  div
    h2 Select a Report
    .grid(v-if="!msg")
      button(
        :class="{ incorrect: incorrectReports.includes(i), found: hints[i - 1].found }"
        v-for="i in 13"
        @click="() => checkReport(i)"
        :disabled="hints[i - 1].incorrectCounter === 3"
      ) {{ i }}
    p(
      v-else
      style="text-align: center; font-size: 1.1em"
    ) {{ msg }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import EventBus from "../event-bus";
import { Hints } from "@/store/tracker_important/state";
import { formatItem } from "@/util";

@Component
export default class Reports extends Vue {
  incorrectReports: number[] = [];
  msg: string = "";
  hints: Hints = this.$store.state.tracker_important.hints;

  checkReport(i: number): void {
    const location: string = this.$store.state.tracker_important.currentLocation;
    const hint = this.hints[i - 1];
    if (hint.report !== location) {
      this.incorrectReports.push(i);
      this.$store.commit("tracker_important/incrementIncorrectReport", i - 1);
      return;
    }

    this.msg = `${formatItem(hint.location)} has ${hint.checks} important checks`;
    EventBus.$emit("correctReport", hint.location, hint.checks, i - 1);
  }

  destroyed() {
    if (!this.msg) EventBus.$emit("wrongReport");
  }
}
</script>

<style lang="stylus" scoped>
.grid
  display grid
  place-content center
  grid-template-columns repeat(4, 75px)
  grid-gap 10px

button
  display grid
  place-content center
  height 0
  padding 50% 0 // hack to make height equal to width, while maintaining a center
  background rgba(255, 255, 255, .1)
  box-shadow none
  border-radius 2px
  font-size 1.3em
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
