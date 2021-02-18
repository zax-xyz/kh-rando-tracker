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
        :src="`img/${styledIcon(file)}.png`"
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
          img(:src="`img/${secondaryFile}.png`")
          transition(name="fade-up")
            img.number(
              v-if="secondaryNumber"
              :src="`img/numbers/${secondaryNumber}.png`"
            )

        .report(
          v-if="hinted"
          :class="{ dim: hinted < 0 }"
          key="report"
        )
          img.icon(
            :src="`img/${styledIcon('other/secret_reports')}.png`"
          )
          transition(name="fade-up")
            img.number(
              v-if="Math.abs(hinted) > 1"
              :src="`img/numbers/${Math.abs(hinted)}.png`"
            )

      transition(name="fade-cross")
        img.cross(v-if="cell.disabled", src="img/cross.png")

      slot(name="after")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Item } from "@/store/tracker_important/state";

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
      return file;
    }

    switch (style) {
      case "Default":
        return file;
      case "Minimal":
        return `minimal/${file}`;
      case "Classic":
        return `classic/${file}`;
      default:
        return file;
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
  top 5%
  left -5%
  width 40%

  img
    width 100%

  .number
    top 0
    left 3%
    height 50%
    width auto

    &[src='img/numbers/max.png']
      left 25%

  .drive &
    left 0
    top 7.5%
    width 75%

  .proof &
    left initial
    top 0
    right 0
    width 35%

.report
  position absolute
  bottom -10%
  left -25%
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
