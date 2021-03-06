<template lang="pug">
  ImportantCell(
    :width="settings.checkSize"
    :file="file"
    :hinted="hinted"
    @click.left.native="handleClick"
    @click.middle.native="disable({ cell: file })"
   )
    img.number(
      v-if="cell.total > 1 && cell.level > 1"
      :src="`img/progression/numbers/${Math.min(cell.total, cell.level)}.webp`"
      key="number"
    )

    .location(
      v-if="isProof && locations.length"
      key="location"
    )
      img(:src="`img/minimal/${location}.webp`")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ImportantCell from "./ImportantCell.vue";
import { Check, Item, Items, Location } from "@/store/tracker_important/state";

const tracker = namespace("tracker_important");
const settings = namespace("settings");

@Component({
  components: {
    ImportantCell,
  },
})
export default class ImportantCheck extends Vue {
  @Prop(String) file!: string;

  @tracker.State items!: Items;
  @tracker.State foundChecks!: { [key: string]: string[] };
  @tracker.State checkLocations!: { [key: string]: string[] };
  @tracker.Action foundCheck!: Function;
  @tracker.Action undoCheck!: Function;
  @tracker.Action disable!: Function;

  @settings.State("important") settings!: { [key: string]: any };

  get cell(): Item {
    return this.$store.getters["tracker_important/cell"](this.file);
  }

  get hinted(): number {
    if (this.file !== "other/torn_pages" && this.items.all[this.file].cls !== "drive") {
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

      if (this.$store.getters["tracker_important/willBeHinted"](l)) {
        // the world isn't hinted, but will be, as it either has a proof or a hint to a proof
        hinted++;
        dimmed = true;
      }
    });

    return hinted * (-1) ** +dimmed;
  }

  get isProof(): boolean {
    return this.file.startsWith("other/proof_");
  }

  get locations(): string[] {
    return this.checkLocations[this.file];
  }

  get location(): string {
    if (this.locations[0] == "Free") {
      return "worlds/replica_data";
    }

    return this.locations[0];
  }

  handleClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;

    if (this.file === "other/secret_reports" && offset === 1) {
      this.$emit("found-report");
      return;
    }

    const shift = event.shiftKey;

    if (!(this.cell as Check).levelsImportant) {
      if (offset === 1 && this.cell.level >= 1 && (this.cell.opaque || shift)) {
        this.foundCheck({ check: this.file, location: "Free", shift });
        return;
      } else if (offset === -1 && this.cell.level > 1) {
        this.undoCheck({ check: this.file, location: "Free", shift });
        return;
      }
    }

    if (offset === 1) {
      this.foundCheck({
        check: this.file,
        location: this.$store.state.settings.important.preselectWorld
          ? this.$store.state.tracker_important.selectedLocation
          : "Free",
        shift,
      });
      return;
    }

    if (this.locations.length) {
      this.undoCheck({
        check: this.file,
        location: this.locations[this.locations.length - 1],
        shift,
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.location
  position absolute
  bottom -20%
  left -15%
  width 55%

  img
    width 100%
    filter drop-shadow(1px 1px 5px black)
</style>
