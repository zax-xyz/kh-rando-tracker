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
      v-if="showLocation"
      key="location"
    )
      img(:src="`img/progression/worlds/${location}.webp`")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import ImportantCell from "./ImportantCell.vue";
import type { Check, Items, Location } from "@/store/tracker_important/state";
import type { Item } from "@/store/types";

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
  @tracker.Getter hasProof!: Function;
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

    if (
      this.items.all[this.file].cls === "drive" &&
      !this.checkLocations.length &&
      this.hasProof("other/drive_form")
    ) {
      // if a proof is on a drive level then all forms must be hinted
      return -1;
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

  get showLocation(): boolean {
    return (
      (this.file.startsWith("other/proof_") || this.file === "other/promise_charm") &&
      this.locations.length > 0
    );
  }

  get locations(): string[] {
    return this.checkLocations[this.file];
  }

  get location(): string {
    if (this.locations[0] == "Free") {
      return "garden_of_assemblage";
    }

    return this.locations[0].split("/")[1];
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
  bottom -15%
  left -10%
  width 40%

  img
    width 100%
    filter drop-shadow(1px 1px 5px black)
</style>
