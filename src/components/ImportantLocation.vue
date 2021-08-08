<template lang="pug">
  ImportantCell(
    :class="{ active: settings.preselectWorld && selectedLocation === file }"
    :width="settings.worldSize"
    :file="file"
    :hinted="hinted"
    @click.left.exact.native="handleClick"
    @click.left.ctrl.exact.native="removeCheck"
    @click.left.shift.exact.native="showOther"
    @click.middle.exact.native="showChecks = !showChecks"
    @click.middle.shift.exact.native="disable({ cell: file })"
   )
    span.checksNumber(
      v-if="cell.checks || cell.totalChecks > -1"
      key="number"
    ) {{ cell.checks }}
      template(v-if="cell.totalChecks !== -1")
        span(style="color: #fdbd8a")  / 
        span(style="color: hsl(0, 100%, 75%)") {{ cell.totalChecks }}
      template(v-else-if="willBeHinted")
        span(style="color: #fdbd8a")  / 
        span(style="color: hsl(0, 100%, 75%); opacity: .45") ?

    .other(
      v-if="cell.otherLevel"
      key="other"
    )
      img(:src="`/img/progression/${otherFile}.webp`")

    template(v-slot:after)
      transition(name="fade-in")
        ChecksPopup(
          v-if="showChecks"
          :location="file"
          key="checkPopup"
        )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ChecksPopup from "./ChecksPopup.vue";
import ImportantCell from "./ImportantCell.vue";
import type { Hint, Items, Location } from "@/store/tracker_important/state";
import type { Item } from "@/store/types";
import { formatItem } from "@/util";

const tracker = namespace("tracker_important");
const settings = namespace("settings");

@Component({
  components: {
    ChecksPopup,
    ImportantCell,
  },
})
export default class ImportantLocation extends Vue {
  @Prop(String) file!: string;

  @tracker.State items!: Items;
  @tracker.State foundChecks!: { [key: string]: string[] };
  @tracker.State hints!: Hint[];
  @tracker.State selectedLocation!: string;
  @tracker.Action primary!: Function;
  @tracker.Action disable!: Function;
  @tracker.Action other!: Function;
  @tracker.Action undoCheck!: Function;
  @tracker.Mutation selectLocation!: Function;

  @settings.State("important") settings!: { [key: string]: any };

  showChecks = false;

  get cell(): Location {
    return this.$store.getters["tracker_important/cell"](this.file);
  }

  get hinted(): number {
    if ((this.items.all[this.file] as Location).totalChecks === -1) {
      // not hinted
      return 0;
    }

    const reportLocation = this.hints.find(h => h.location === this.file)?.report;
    if (!reportLocation) return 0;

    return reportLocation === "Free" ||
      (this.items.all[reportLocation] as Location).totalChecks !== -1
      ? 1 // World is hinted, or it was goa/critical extra, which also counts
      : // Otherwise, check if we know it will be hinted but we just don't have the report yet
        // i.e., it has a proof or hints a world with a proof
        -this.$store.getters["tracker_important/willBeHinted"](reportLocation);
  }

  get willBeHinted(): boolean {
    return (
      // we are only interested in whether it will be hinted when it hasn't already
      (this.items.all[this.file] as Location).totalChecks === -1 &&
      this.$store.getters["tracker_important/willBeHinted"](this.file)
    );
  }

  get otherFile(): string | undefined {
    const other = this.cell.other;
    if (Array.isArray(other)) {
      return other[this.cell.otherLevel - 1];
    }

    return other;
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
        return `classic/${file}`;
      default:
        return `default/${file}`;
    }
  }

  handleClick(event: MouseEvent): void {
    if (this.settings.preselectWorld) {
      if (this.file === this.selectedLocation) {
        this.selectLocation("Free");
      } else {
        this.selectLocation(this.file);
      }
    } else {
      const shift = event.shiftKey;

      this.primary({ cell: this.file, offset: 1, shift });
      console.log("Clicked on", formatItem(this.file) + (event.shiftKey ? " (shift)" : ""));
    }
  }

  removeCheck(): void {
    const checks = this.foundChecks[this.file];
    if (checks.length) {
      this.undoCheck({ check: checks[checks.length - 1], location: this.file });
    }
  }

  showOther(event: MouseEvent) {
    this.other({ cell: this.file, offset: event.ctrlKey ? -1 : 1 });
  }
}
</script>

<style lang="stylus" scoped>
>>> .item
  width 65px

>>> .item::before
  content ''
  position absolute
  width 100%
  padding-bottom 100%
  border-radius 50%
  transform scale(0.75)
  transition background .2s, border-radius .2s, transform .2s, box-shadow .2s

.active >>> .item::before
  background hsla($accent-hue, $button-sat, $button-lig, .15)
  border-radius 12%
  box-shadow 0 0 7px hsla($accent-hue, $button-sat, $button-lig, .1)
  transform scale(1.4)

.checksNumber
  position absolute
  right -20%
  bottom -15%
  color #fbf993
  font-size 1.2rem
  font-weight bold
  text-shadow -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.other
  position absolute
  top 0
  right -5%
  width 40%

  img
    width 100%

.fade-in-enter-active
  transition opacity .15s ease-out, transform .15s ease-out, transform-origin .15s step-end

.fade-in-leave-active
  transition opacity .15s ease-out, transform .15s ease-out, transform-origin .15s step-start

.fade-in-enter
.fade-in-leave-to
  opacity 0
  transform-origin top
  transform translateX(-50%) translateY(-10px) scale(0.8)
</style>
