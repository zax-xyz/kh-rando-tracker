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
import { namespace } from "vuex-class";

import { Hints } from "@/store/tracker_important/state";
import { formatItem } from "@/util";

const tracker = namespace("tracker_important");

@Component
export default class Reports extends Vue {
  @tracker.State hints!: Hints;
  @tracker.State("currentLocation") location!: string;

  incorrectReports: number[] = [];
  msg: string = "";
  hintsAtBottom: boolean = this.$store.state.settings.important.hintsAtBottom;
  timer: number = -1;

  checkReport(i: number): void {
    const hint = this.hints[i - 1];
    if (hint.report !== this.location) {
      this.incorrectReports.push(i);
      this.$store.commit("tracker_important/incrementIncorrectReport", i - 1);
      return;
    }

    const msg =
      formatItem(hint.location) +
      (hint.checks === 0
        ? " is a heartless choice"
        : ` has ${hint.checks} important check${hint.checks !== 1 ? "s" : ""}`);

    console.log(msg);

    this.$store.dispatch("tracker_important/foundCheck", {
      check: "other/secret_reports",
      location: this.location,
    });
    this.$store.dispatch("tracker_important/foundHint", i - 1);

    if (this.hintsAtBottom) {
      this.$store.commit("tracker_important/setHintMessage", msg);
      this.$router.push("/");
    } else {
      this.msg = msg;
      this.timer = window.setTimeout(
        () => this.$router.push("/"),
        this.$store.state.settings.important.autoHideHintsDelay ?? 3000,
      );
    }
  }

  destroyed() {
    if (this.timer !== -1) {
      window.clearTimeout(this.timer);
    }
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
