<template lang="pug">
  .grid(
    :class="{ disableShadows: disableShadows }"
    :style="gridStyle"
    @click.self="selectLocation('Free')"
  )
    div(style="z-index: 0")
      .group.locations(
        v-for="row in items.locations"
      )
        draggable.dragArea(
          v-for="name in row"
          v-if="showWorld(name)"
          :style="worldRowStyle"
          :key="name"
          group="checks"
          :disabled="!dragging"
          @change="add(name, $event.added.element)"
          :list="[]"
        )
          ImportantLocation(
            :file="name"
            :style="{ width: settings.worldSize || '60px' }"
            @undo-check="removeCheck(name)"
          )

    draggable.group.checks.dragArea(
      :list="items.checks[0]"
      :group="{ name: 'checks', pull: 'clone', put: false }"
      item=".check"
      :sort="false"
      @start="dragging = true"
      @end="dragging = false"
    )
      .check(
        v-for="name in items.checks[0]"
        :style="{ padding: `${settings.checkVerticalPadding || '2.5px'} 0` }"
      )
        ImportantCheck(
          :key="name"
          :file="name"
          :style="{ width: settings.checkSize }"
          @found-report="add(selectedLocation, 'other/secret_reports')"
        )
      span(
        :style="numChecksStyle"
        @click.exact="incrementChecks(1)"
        @click.ctrl="incrementChecks(-1)"
        @contextmenu="incrementChecks(-1)"
      )
        span {{ numChecks }}
        span  / {{ totalChecks }}

    draggable.group.checks.dragArea(
      v-for="(row, index) in items.checks.slice(1)"
      :list="row"
      :key="index"
      :group="{ name: 'checks', pull: 'clone', put: false }"
      :sort="false"
      @start="dragging = true"
      @end="dragging = false"
    )
      .check(
        v-for="name in row"
        :style="{ padding: `${settings.checkVerticalPadding || '2.5px'} 0` }"
      )
        ImportantCheck(
          :key="name"
          :file="name"
          :style="{ width: settings.checkSize }"
        )

    template(v-if="hintsAtBottom")
      span(v-if="hintMessage") {{ hintMessage }}
      span(v-else) &#8203;
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";
import { State, namespace } from "vuex-class";

import EventBus from "../event-bus";
import ImportantCell from "./ImportantCell.vue";
import ImportantLocation from "./ImportantLocation.vue";
import ImportantCheck from "./ImportantCheck.vue";
import { Hint, HintSetting, Items, Location } from "@/store/tracker_important/state";
import { formatItem } from "@/util";

const tracker = namespace("tracker_important");
const settings = namespace("settings");

type Style = { [key: string]: string };

@Component({
  components: {
    ImportantCell,
    ImportantLocation,
    ImportantCheck,
    draggable,
  },
})
export default class ImportantGrid extends Vue {
  @State("tracker_important") state: any;
  @tracker.State items!: Items;
  @tracker.State hintSettings!: { [key: string]: HintSetting };
  @tracker.State("checks") numChecks!: number;
  @tracker.State hintMessage!: string;
  @tracker.State hintsLoaded!: string;
  @tracker.State foundChecks!: { [key: string]: string[] };
  @tracker.State selectedLocation!: string;
  @tracker.Action foundCheck!: Function;
  @tracker.Action undoCheck!: Function;
  @tracker.Mutation incrementChecks!: Function;
  @tracker.Mutation selectLocation!: Function;

  @settings.State("important") settings: any;
  @settings.State disableShadows!: boolean;

  dragging: boolean = false;

  get hintsAtBottom(): boolean {
    return this.settings.hintsAtBottom;
  }

  get totalChecks(): number {
    let total = 51;
    Object.values(this.hintSettings).forEach((s: HintSetting) => {
      if (s.check && !s.enabled) {
        total -= s.value ?? 1;
      }
    });

    return total;
  }

  get gridStyle(): object {
    const settings = this.$store.state.settings;

    const style: { [key: string]: string } = {
      backgroundColor: settings.bgColor,
      width: this.settings.width,
    };

    const bgImg = settings.bgImg;
    const darken = "rgba(0, 0, 0, .6)";
    if (bgImg) style.backgroundImage = `linear-gradient(${darken}, ${darken}), url(${bgImg})`;

    if (this.$route.query.footer === "0") {
      style.borderRadius = "4px";
      style.margin = "0";
    }

    return style;
  }

  get worldRowStyle(): object {
    return {
      height: this.settings.worldSize || "60px",
      padding: `${this.settings.worldVerticalPadding || "7.5px"} 0`,
    };
  }

  get numChecksStyle(): object {
    return {
      flex: 1,
      fontWeight: "bold",
      alignSelf: "center",
      color: `hsl(${160 - (this.numChecks / this.totalChecks) * 160}, 100%, 75%)`,
    };
  }

  showWorld(location: string): boolean {
    const hintKey = this.items.all[location].setting;
    if (!hintKey) {
      return true;
    }

    if (!this.hintsLoaded && location === "worlds/atlantica") {
      return this.settings.atlantica;
    }

    const hint = this.hintSettings[hintKey];
    return hint.enabled || hint.show;
  }

  showReports(location: string): boolean {
    if (!this.$store.state.tracker_important.hints.length) {
      // hints haven't been loaded, do nothing
      return false;
    }

    // show the Reports view component knows which location to check reports for
    this.$store.commit("tracker_important/setLocation", location);
    this.$router.push("reports");

    return true;
  }

  add(location: string, check: string) {
    // Show menu for reports/hints
    // if showReports returns false, then hints aren't loaded and we just treat this as a regular
    // check
    if (check === "other/secret_reports" && this.showReports(location)) {
      return;
    }

    this.$store.dispatch("tracker_important/foundCheck", { check, location });
  }

  removeCheck(location: string) {
    const items = this.foundChecks[location];
    if (items.length === 0) return;

    this.$store.dispatch("tracker_important/undoCheck", { check: items[0], location });
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
  justify-content space-around
  box-sizing content-box

  &.locations .dragArea
      display flex
      justify-content center
      flex 1
      height 60px
      padding 7.5px 0
      box-sizing content-box

.check
  display flex
  justify-content center
  flex 1

label
  margin-left .4em

.locations .sortable-ghost
  display none
</style>
