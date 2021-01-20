<template lang="pug">
  .grid(
    :class="{ disableShadows: disableShadows }"
    :style="gridStyle"
  )
    .group.locations(v-for="row in locations")
      draggable.dragArea(
        v-for="(location, name) in row"
        :key="name"
        group="checks"
        :disabled="!dragging"
        @change="(o) => add(name, o.added)"
        :list="foundChecks[name]"
        style="display: flex"
      )
        ImportantCell(
          :file="name"
          :hinted="numHinted(name)"
          style="width: 60px"
          @undo-check="removeCheck(name)"
        )

    draggable.group.checks.dragArea(
      :list="Object.keys(checks[0])"
      :group="{ name: 'checks', pull: 'clone', put: false }"
      item="ImportantCell"
      :sort="false"
      @start="dragging = true"
      @end="dragging = false"
    )
      ImportantCell(
        v-for="(check, name) in checks[0]"
        :key="name"
        :file="name"
        :hinted="numHinted(name)"
        @found-report="showReports"
      )
      span(
        :style="numChecksStyle"
      )
        span {{ numChecks }}
        span  / {{ totalChecks }}

    draggable.group.checks.dragArea(
      v-for="(row, index) in checks.slice(1)"
      :list="Object.keys(row)"
      :key="index"
      :group="{ name: 'checks', pull: 'clone', put: false }"
      :sort="false"
      @start="dragging = true"
      @end="dragging = false"
    )
      ImportantCell(
        v-for="(check, name) in row"
        :key="name"
        :file="name"
        :hinted="numHinted(name)"
      )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";

import EventBus from "../event-bus";
import ImportantCell from "./ImportantCell.vue";
import { Hint, HintSetting, Item, Items } from "@/store/tracker_important/state";

type ItemMap = { [key: string]: Item };
type Style = { [key: string]: string };

function splitRows(items: ItemMap): ItemMap[] {
  const rows = [{}] as ItemMap[];

  for (const [name, item] of Object.entries(items)) {
    if (name.startsWith("ROW END")) {
      rows.push({});
      continue;
    }

    rows[rows.length - 1][name] = item;
  }

  return rows;
}

function mapToStringArray(items: ItemMap[]): { [key: string]: string[] } {
  return Object.fromEntries(items.flatMap((l) => Object.keys(l)).map((l) => [l, []]));
}

@Component({
  components: {
    ImportantCell,
    draggable,
  },
})
export default class ImportantGrid extends Vue {
  items: Items = this.$store.state.tracker_important.items;

  locations = splitRows(this.items.locations) as Items["locations"][];
  checks = splitRows(this.items.checks) as Items["checks"][];

  // create a mapping from locations to list of checks found there
  foundChecks: { [key: string]: string[] } = mapToStringArray(this.locations);
  checkLocations: { [key: string]: string[] } = mapToStringArray(this.checks);

  dragging: boolean = false;

  get totalChecks(): number {
    let total = 51;
    Object.values(this.$store.state.tracker_important.hintSettings).forEach((s: HintSetting) => {
      if (!s.enabled) {
        total -= s.value;
      }
    });

    return total;
  }

  get gridStyle(): object {
    if (this.$route.query.footer === "0") {
      return {
        "border-radius": "4px",
        margin: "0",
      };
    }

    return {};
  }

  get numChecksStyle(): object {
    return {
      fontWeight: "bold",
      alignSelf: "center",
      color: `hsl(${160 - (this.numChecks / this.totalChecks) * 160}, 100%, 75%)`,
    };
  }

  get disableShadows(): boolean {
    return this.$store.state.settings.disableShadows;
  }

  get numChecks(): number {
    return this.$store.state.tracker_important.checks;
  }

  numHinted(item: string): number {
    if (!this.$store.getters["tracker_important/isLocation"](item)) {
      // checks
      if (item !== "other/torn_page" && this.items.checks[item].cls !== "drive") {
        // only track hinted for pages and drives
        return 0;
      }

      // return number of locations for this check that have been hinted
      let hinted = 0;
      let dimmed = false;
      this.checkLocations[item].forEach((l) => {
        if (this.items.locations[l].totalChecks !== -1) {
          hinted++;
          return;
        }

        if (this.foundChecks[l].some((c) => c.startsWith("other/proof_"))) {
          hinted++;
          dimmed = true;
        }
      });

      return hinted * (-1) ** +dimmed;
    }

    if (this.items.locations[item].totalChecks === -1) {
      // not hinted
      return 0;
    }

    const reportLocation = this.$store.state.tracker_important.hints.find(
      (h: Hint) => h.location === item
    ).report;

    return reportLocation === "Free"
      ? 0 // GoA/Critical Extra will never be hinted
      : this.items.locations[reportLocation].totalChecks !== -1
      ? 1 // World is hinted and we have the report
      : // Otherwise, if the world has a proof, then it must be hinted by some report we don't have
        -this.foundChecks[reportLocation].some((c) => c.startsWith("other/proof_"));
  }

  showReports(location: string): boolean {
    if (!this.$store.state.tracker_important.hints.length) {
      return false;
    }

    // so the Reports view component knows which location to check reports for
    this.$store.commit("tracker_important/setLocation", location);
    this.$router.push("reports");

    EventBus.$on("correctReport", (hintLocation: string, checks: number, index: number) => {
      EventBus.$off("correctReport");
      EventBus.$off("wrongReport");

      this.$store.dispatch("tracker_important/foundCheck", {
        check: "other/secret_reports",
        location,
      });
      this.$store.commit("tracker_important/setLocationTotal", {
        location: hintLocation,
        checks,
      });
      this.$store.dispatch("tracker_important/foundHint", index);

      if (location !== "Free") {
        this.checkLocations["other/secret_reports"].push(location);
      }
    });

    // if the user didn't get the right report, then make sure the report isn't included in the list
    EventBus.$on("wrongReport", () => {
      EventBus.$off("correctReport");
      EventBus.$off("wrongReport");

      this.foundChecks[location].shift();
    });

    return true;
  }

  add(location: string, added: { element: string; newIndex: number }) {
    if (added.newIndex === 1) {
      // With no visible list of elements, the item will always either be added at index 0 if
      // dragged onto the left half of the location icon, or 1 if dragged onto the right half.
      // If it is index 1, then we swap the first 2 items to ensure the new item is added at the
      // front of the list and we can maintain order. However, the event still reports 1 even if
      // there are no other items and the real index is 0, so we have to add a check for this
      const locations: string[] = this.foundChecks[location];

      if (locations.length > 1) {
        [locations[0], locations[1]] = [locations[1], locations[0]];
      }
    }

    // Show menu for reports/hints
    if (added.element === "other/secret_reports" && this.showReports(location)) {
      return;
    }

    this.$store.dispatch("tracker_important/foundCheck", { check: added.element, location });
    this.checkLocations[added.element].push(location);
  }

  removeCheck(location: string) {
    const items = this.foundChecks[location];
    if (items.length === 0) return;

    const check = items.shift() as string;
    this.$store.dispatch("tracker_important/undoCheck", { check, location });
    this.checkLocations[check].pop();
  }
}
</script>

<style lang="stylus" scoped>
.grid
  max-width calc(100vw - 25px)
  width 500px
  padding 15px
  margin 5px 5px 0
  background $bg-color no-repeat center / cover
  border-radius 4px 4px 0 0
  user-select none

.dragArea
  display inline-block

.group
  display flex
  // align-items center
  justify-content space-around
  padding 5px 0

  &.checks
    padding 2.5px 0

label
  margin-left .4em

.locations .sortable-ghost
  display none
</style>
