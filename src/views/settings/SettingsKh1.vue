<template lang="pug">
div
  .row
    p Note:
      |
      |
      span.footnote You can also use #[code Toggle Rearrange] under #[code Normal] settings and remove icons by right-clicking on them (or rearrange them by dragging).

  .row.grid
    SwitchSlider(v-model="settings.expandRaftSupplies")
    p.name Expand Raft Supplies

  .row.grid
    SwitchSlider(v-model="settings.correspondingMagic")
    div
      p.name Select corresponding replaced spells
      BaseTooltip Every instance of a particular spell in KH1 rando will be replaced with the same spell. I.e., if Fire is replaced with Blizzard, every Fire check in the game will be Blizzard. These are unmoved from their original locations.

  .row.grid
    SwitchSlider(v-model="show.worlds")
    p.name Show Worlds

  .row.grid
    SwitchSlider(v-model="show.cups")
    p.name Show Cups

  .row.grid
    SwitchSlider(v-model="show.levels")
    p.name Show Levels

  .row.grid
    SwitchSlider(v-model="show.magic")
    p.name Show Magic

  .row.grid
    SwitchSlider(v-model="show.summons")
    p.name Show Summons

  .row.grid
    SwitchSlider(v-model="show.reports")
    p.name Show Reports

  .row.grid
    SwitchSlider(v-model="show.dalmations")
    p.name Show Dalmations

  .row.grid
    SwitchSlider(v-model="show.trinities")
    p.name Show Trinities

  .row.grid
    SwitchSlider(v-model="show.jackInTheBox")
    p.name Show Jack-in-the-box

  .row.grid
    SwitchSlider(v-model="show.crystalTrident")
    p.name Show Crystal Trident

  .row.grid
    SwitchSlider(v-model="show.libraryBooks")
    p.name Show Library Books
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import BaseTooltip from "@/components/menu/BaseTooltip.vue";
import SwitchSlider from "@/components/menu/SwitchSlider.vue";
import { Game, State } from "@/store/settings";

@Component({
  components: {
    BaseTooltip,
    SwitchSlider,
  },
})
export default class SettingsKh1 extends Vue {
  settings: State[Game.KH1] = { ...this.$store.state.settings[Game.KH1] };
  show: State[Game.KH1]["show"] = { ...this.$store.state.settings[Game.KH1].show };

  get drag(): boolean {
    return this.$store.state.drag;
  }

  @Watch("settings", { deep: true })
  onSettingsChanged(): void {
    this.$store.commit("settings/setKh1Settings", this.settings);
  }

  @Watch("show", { deep: true })
  onShowChanged(): void {
    this.$store.commit("settings/setKh1Show", this.show);
  }

  toggleDrag() {
    this.$store.commit("toggleDrag");
  }

  reset() {
    this.$store.commit("settings/resetNums");
  }
}
</script>
