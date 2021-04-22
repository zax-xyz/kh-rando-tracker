<template lang="pug">
  div(
    style="display: inline-flex; flex: 1; justify-content: center"
    @click.right="secondary({ cell: file, offset: $event.ctrlKey ? -1: 1 })"
   )
    .item(
      :class="cls"
      :style="{ width: width }"
     )
      img.icon(
        :src="`/img/${styledIcon(file)}.webp`"
        :class="{ opaque: cell.opaque, disabled: cell.disabled }"
      )

      transition-group(
        name="fade-up"
        v-if="!cell.disabled"
      )
        slot

        .secondary(
          v-if="cell.secondaryLevel"
          key="secondary"
        )
          img(:src="`/img/progression/${secondaryFile}.webp`")
          transition(name="fade-up")
            img.number(
              v-if="secondaryNumber"
              :src="`/img/progression/numbers/${secondaryNumber}.webp`"
            )

        .report(
          v-if="hinted"
          :class="{ dim: hinted < 0 }"
          key="report"
        )
          img.icon(
            :src="`/img/progression/other/secret_reports.webp`"
          )
          transition(name="fade-up")
            img.number(
              v-if="Math.abs(hinted) > 1"
              :src="`/img/progression/numbers/${Math.abs(hinted)}.webp`"
            )

      transition(name="fade-cross")
        img.cross(v-if="cell.disabled", src="/img/minimal/other/cross.webp")

      slot(name="after")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import type { Item } from "@/store/types";

const tracker = namespace("tracker_important");

@Component
export default class ImportantCell extends Vue {
  @Prop(String) file!: string;
  @Prop(Number) hinted!: number;
  @Prop(String) width!: string;

  @tracker.Action primary!: Function;
  @tracker.Action secondary!: Function;
  @tracker.Action disable!: Function;

  cls: string = this.cell.cls ?? "";

  get cell(): Item {
    return this.$store.getters["tracker_important/cell"](this.file);
  }

  get secondaryFile(): string {
    return this.$store.getters["tracker_important/secondary"](this.file);
  }

  get secondaryNumber(): string {
    return this.$store.getters["tracker_important/secondaryNumber"](this.file);
  }

  styledIcon(file: string): string {
    const cell = this.$store.getters["tracker_important/cell"](file);
    const style = this.$store.state.settings.iconStyles[cell.category]?.value;

    if (style === cell.categoryExclude) {
      return `default/${file}`;
    }

    switch (style) {
      case "Minimal":
        return `minimal/${file}`;
      case "Classic":
        return `legacy/${file}`;
      default:
        return `default/${file}`;
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  position relative
  display inline-flex
  align-items center
  justify-content center
  width 55px

>>> img
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.icon
  width 100%
  opacity .35
  transition opacity .25s

  &.opaque
    opacity 1

  &.disabled
    opacity .18

>>> .number
  position absolute
  right 1%
  bottom 5%
  width 72%

.secondary
  position absolute
  top 0
  left -10%
  width 40%

  img
    width 100%

  .number
    top 7.5%
    left -25%
    height 38%
    width auto

    &[src='/img/progression/numbers/max.webp']
      left 55%

  .drive &
    left 0
    width 36%

  .proof &
    left initial
    top 0
    right 0
    width 35%

.report
  position absolute
  bottom -10%
  left -10%
  width 40%

  img
    width 100%
    vertical-align bottom
    opacity 1
    transition opacity .2s

  &.dim .icon
    opacity .45

  .pages &
    bottom -5%
    width 55%

>>> .fade-up-enter-active
>>> .fade-up-leave-active
  transition opacity .25s, transform .25s

>>> .fade-up-enter
>>> .fade-up-leave-to
  opacity 0
  transform translateY(4px)

.cross
  position absolute
  width 50%
  height auto
  opacity 1

.fade-cross-enter-active
.fade-cross-leave-active
  transition opacity .25s, transform .25s

.fade-cross-enter
.fade-cross-leave-to
  opacity 0
  transform translateY(10px)
</style>
