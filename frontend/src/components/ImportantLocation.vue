<template lang="pug">
  ImportantCell(
    :class="{ active: settings.preselectWorld && selectedLocation === file }"
    :width="settings.worldSize"
    :file="file"
    :hinted="hinted"
    @click.left.native="handleClick"
    @click.middle.exact.native="showChecks = !showChecks"
    @click.middle.shift.exact.native="disable({ cell: file })"
   )
    span.checksNumber(
      v-if="cell.checks || cell.totalChecks > -1"
      key="number"
    ) {{ cell.checks }}
      template(v-if="cell.totalChecks > -1")
        span(style="color: #fdbd8a")  / 
        span(style="color: hsl(0, 100%, 75%)") {{ cell.totalChecks }}

    .proofs(
      v-if="proofs.length"
      :style="{ width: `calc(3 * ${proofSize})`, right: `calc(-1.5 * ${proofSize})` }"
      key="proofs"
    )
      transition-group(
        name="proofs"
        tag="div"
        :style="{ height: proofSize }"
      )
        div(
          v-for="proof in proofs"
          :key="proof"
        )
          img(:src="`img/${proof}.png`")

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
import { Hint, Item, Items, Location } from "@/store/tracker_important/state";
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
  @tracker.Action undoCheck!: Function;
  @tracker.Mutation selectLocation!: Function;

  @settings.State("important") settings!: { [key: string]: any };

  showChecks = false;

  get cell(): Item {
    return this.$store.getters["tracker_important/cell"](this.file);
  }

  get hinted(): number {
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

  get proofs(): string[] {
    return this.foundChecks[this.file].filter(c => c.startsWith("other/proof_"));
  }

  get proofSize(): string {
    return `calc(0.4 * ${this.settings.worldSize || "55px"})`;
  }

  handleClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;

    if (offset == -1) {
      const checks = this.foundChecks[this.file];
      if (checks.length) {
        this.undoCheck({ check: checks[checks.length - 1], location: this.file });
      }

      return;
    }

    if (this.settings.preselectWorld) {
      if (this.file === this.selectedLocation) {
        this.selectLocation("Free");
      } else {
        this.selectLocation(this.file);
      }
    } else {
      const shift = event.shiftKey;

      this.primary({ cell: this.file, offset, shift });
      console.log("Clicked on", formatItem(this.file) + (event.shiftKey ? " (shift)" : ""));
    }
  }
}
</script>

<style lang="stylus" scoped>
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

.proofs
  position absolute
  top 0
  // display flex
  // justify-content center

  > div
    // display flex

    > div
      display inline-block
      height 100%
      transition transform .2s, opacity .2s

  img
    height 100%

.proofs-enter
.proofs-leave-to
  opacity 0

.proofs-enter
  transform translateY(10px)

.proofs-leave-to
  transform translateY(10px) translateX(-50%)

.proofs-leave-active
  position absolute

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
