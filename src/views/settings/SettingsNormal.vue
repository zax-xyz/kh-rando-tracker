<template lang="pug">
  div
    .row.grid
      SwitchSlider(v-model="settings.scroll")
      div
        p.name Scroll wheel increment/decrement
        BaseTooltip Scroll up on item to +1, scroll down to -1

    .row.grid
      input(
        placeholder="5"
        v-model="settings.columns"
      )
      p.name Number of grid columns

    .row.grid
      input(
        placeholder="100px"
        v-model="settings.size"
      )
      p.name Item size

    .row.grid
      input(
        placeholder="7.5px"
        v-model="settings.padding"
      )
      div
        p.name Item padding
        BaseTooltip Pre-2.2 versions used 7.5px

    .row.grid
      input(
        placeholder="150"
        v-model.number="settings.longPressDelay"
      )
      div
        p.name Long Press Delay
        BaseTooltip Delay in milliseconds for long-press on mobile to trigger a right-click

    .row.grid
      button(
        :class="{ alt: drag }"
        style="grid-row: 1"
        @click="toggleDrag"
      ) Toggle Rearrange
      div(style="grid-row: 1")
        BaseTooltip Click + drag to move items around, and right click to remove an item
        button(
          @click="reset"
        ) Reset

    // .row.grid
      button(
        :class="{ alt: editItems }"
        @click="toggleEdit"
      ) Edit items
      div
        BaseTooltip Click on an item to open a menu to change its default properties
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import BaseTooltip from "@/components/BaseTooltip.vue";
import SwitchSlider from "@/components/SwitchSlider.vue";
import { State } from "@/store/settings";

@Component({
  components: {
    BaseTooltip,
    SwitchSlider,
  },
})
export default class SettingsNormal extends Vue {
  settings: State = { ...this.$store.state.settings };

  get drag(): boolean {
    return this.$store.state.drag;
  }

  get editItems(): boolean {
    return this.$store.state.edit;
  }

  @Watch("settings", { deep: true })
  onSettingsChanged(): void {
    this.$store.commit("settings/setSettings", this.settings);
  }

  toggleDrag() {
    this.$store.commit("toggleDrag");
  }

  reset() {
    this.$store.commit("settings/resetNums", this.$store.state.settings.game);
  }

  toggleEdit() {
    this.$store.commit("toggleEdit");
  }
}
</script>
