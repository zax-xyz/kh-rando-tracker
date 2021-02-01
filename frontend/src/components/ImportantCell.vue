<template lang="pug">
  div(
    style="display: inline-flex; flex: 1; justify-content: center"
    @click.left="handleClick"
    @click.right="secondary({ cell: file, offset: $event.ctrlKey ? -1: 1 })"
    @click.middle="disable({ cell: file })"
   )
    .item(:class="cls")
      img.icon(
        :src="`img/${styledIcon(file)}.png`"
        :class="{ opaque: cell.opaque, disabled: cell.disabled }"
      )

      transition-group(
        name="fade-up"
        v-if="!cell.disabled"
      )
        img.number(
          v-if="!isLocation && cell.total > 1 && cell.level > 1"
          :src="`img/numbers/${Math.min(cell.total, cell.level)}.png`"
          key="1"
        )
        span.checksNumber(
          v-else-if="isLocation && cell.checks || cell.totalChecks > -1"
          key="1"
        ) {{ cell.checks }}
          template(v-if="cell.totalChecks > -1")
            span(style="color: #fdbd8a")  / 
            span(style="color: hsl(0, 100%, 75%)") {{ cell.totalChecks }}

        img.nobody(
          v-if="cell.data && cell.level === cell.total + 1"
          :src="`img/nobody/${cell.data}.png`"
          key="2"
        )

        .secondary(
          v-if="cell.secondaryLevel"
          key="3"
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
          key="4"
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";

import { Check, Hint, HintSetting, Item, Items, Location } from "@/store/tracker_important/state";
import { formatItem } from "@/util";

const tracker = namespace("tracker_important");

@Component
export default class ImportantCell extends Vue {
  @Prop(String) file!: string;

  @tracker.State items!: Items;
  @tracker.State foundChecks!: { [key: string]: string[] };
  @tracker.State checkLocations!: { [key: string]: string[] };
  @tracker.State hints!: Hint[];
  @tracker.Action primary!: Function;
  @tracker.Action secondary!: Function;
  @tracker.Action disable!: Function;
  @tracker.Action foundCheck!: Function;
  @tracker.Action undoCheck!: Function;

  cls: string = this.cell.cls ?? "";

  get cell(): Item {
    return this.$store.getters["tracker_important/cell"](this.file);
  }

  get isLocation(): boolean {
    return this.$store.getters["tracker_important/isLocation"](this.file);
  }

  get secondaryFile(): string {
    return this.$store.getters["tracker_important/secondary"](this.file);
  }

  get secondaryNumber(): string {
    return this.$store.getters["tracker_important/secondaryNumber"](this.file);
  }

  get hinted(): number {
    if (!this.isLocation) {
      // checks
      if (this.file !== "other/torn_page" && this.items.all[this.file].cls !== "drive") {
        // only track hinted for pages and drives
        return 0;
      }

      // return number of locations for this check that have been hinted
      let hinted = 0;
      let dimmed = false;
      this.checkLocations[this.file].forEach(l => {
        if (l === "Free" || (this.items.all[l] as Location).totalChecks !== -1) {
          // Goa/Critical Extra, or hinted
          hinted++;
          return;
        }

        if (this.foundChecks[l].some(c => c.startsWith("other/proof_"))) {
          // has proof so much be hinted by some report but we don't have it yet
          hinted++;
          dimmed = true;
        }
      });

      return hinted * (-1) ** +dimmed;
    }

    if ((this.items.all[this.file] as Location).totalChecks === -1) {
      // not hinted
      return 0;
    }

    const reportLocation = this.hints.find((h: Hint) => h.location === this.file)?.report;
    if (!reportLocation) return 0;

    return reportLocation === "Free" ||
      (this.items.all[reportLocation] as Location).totalChecks !== -1
      ? 1 // World is hinted, or it was goa/critical extra, which also counts
      : // Otherwise, if the world has a proof, then it must be hinted by some report we don't have
        -this.foundChecks[reportLocation].some(c => c.startsWith("other/proof_"));
  }

  styledIcon(file: string): string {
    const cell = this.$store.getters["tracker_important/cell"](file);
    const style = this.$store.state.settings.iconStyle[cell.category];

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

  handleClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;

    if (this.file === "other/secret_reports" && offset === 1) {
      this.$emit("found-report");
      return;
    }

    const shift = event.shiftKey;

    if (!this.isLocation) {
      // checks
      if (offset === 1) {
        this.foundCheck({ check: this.file, location: "Free", shift });
        return;
      }

      if (!(this.cell as Check).levelsImportant && this.cell.level > 1) {
        this.undoCheck({ check: this.file, location: "Free", shift });
        return;
      }

      const locations = this.checkLocations[this.file];
      if (locations.length) {
        this.undoCheck({ check: this.file, location: locations[locations.length - 1], shift });
      }

      return;
    }

    // locations
    if (offset == -1) {
      const checks = this.foundChecks[this.file];
      if (checks.length) {
        this.undoCheck({ check: checks[checks.length - 1], location: this.file });
      }

      return;
    }

    this.primary({ cell: this.file, offset, shift });
    console.log("Clicked on", formatItem(this.file) + (event.shiftKey ? " (shift)" : ""));
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

img
.checksNumber
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.icon
  width 100%
  opacity .35
  transition opacity .25s

  &.opaque
    opacity 1

  &.disabled
    opacity .18

.number
  position absolute
  right 1%
  bottom 5%
  width 72%

.checksNumber
  position absolute
  right -20%
  bottom -15%
  color #fbf993
  font-size 1.2rem
  font-weight bold
  text-shadow -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000

.nobody
  position absolute
  top 5%
  left 0
  width 40%

.secondary
  position absolute
  top 5%
  right 0
  width 35%

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
  .hundred_acre &
  .levels &
    left 0
    top 7.5%
    width 75%

  .magic &
    left 0
    width 40%

.report
  position absolute
  bottom -10%
  left -20%
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

.fade-up-enter-active
.fade-up-leave-active
  transition opacity .25s, transform .25s

.fade-up-enter
.fade-up-leave-to
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
