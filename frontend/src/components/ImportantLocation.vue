<template lang="pug">
  ImportantCell(
    :file="file"
    :hinted="hinted"
    @click.left.native="handleClick"
   )
    span.checksNumber(
      v-if="cell.checks || cell.totalChecks > -1"
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ImportantCell from "./ImportantCell.vue";
import { Hint, Item, Items, Location } from "@/store/tracker_important/state";
import { formatItem } from "@/util";

const tracker = namespace("tracker_important");

@Component({
  components: {
    ImportantCell,
  },
})
export default class ImportantLocation extends Vue {
  @Prop(String) file!: string;

  @tracker.State items!: Items;
  @tracker.State foundChecks!: { [key: string]: string[] };
  @tracker.State hints!: Hint[];
  @tracker.Action primary!: Function;
  @tracker.Action undoCheck!: Function;

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

  handleClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;

    if (offset == -1) {
      const checks = this.foundChecks[this.file];
      if (checks.length) {
        this.undoCheck({ check: checks[checks.length - 1], location: this.file });
      }

      return;
    }

    const shift = event.shiftKey;

    this.primary({ cell: this.file, offset, shift });
    console.log("Clicked on", formatItem(this.file) + (event.shiftKey ? " (shift)" : ""));
  }
}
</script>

<style lang="stylus" scoped>
.checksNumber
  position absolute
  right -20%
  bottom -15%
  color #fbf993
  font-size 1.2rem
  font-weight bold
  text-shadow -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.nobody
  position absolute
  top 5%
  left 0
  width 40%
</style>
