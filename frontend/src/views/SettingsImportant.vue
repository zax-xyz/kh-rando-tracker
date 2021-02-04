<template lang="pug">
  div
    .row.grid
      input(
        placeholder="500px"
        v-model="settings.width"
      )
      p.name Grid Width

    .row.grid
      input(
        placeholder="60px"
        v-model="settings.worldSize"
      )
      p.name World Icon Size

    .row.grid
      input(
        placeholder="7.5px"
        v-model="settings.worldVerticalPadding"
      )
      p.name World Row Vertical Padding

    .row.grid
      input(
        placeholder="55px"
        v-model="settings.checkSize"
      )
      p.name Check Icon Size

    .row.grid
      input(
        placeholder="2.5px"
        v-model="settings.checkVerticalPadding"
      )
      p.name Check Row Vertical Padding

    .row.grid
      SwitchSlider(v-model="settings.hintsAtBottom")
      div
        p.name Show hints at bottom
        BaseTooltip If enabled, a single line will be shown at the bottom of the tracker for the last hint found

    .row.grid
      SwitchSlider(v-model="settings.autoHideHints")
      div
        p.name Autohide hint screen
        BaseTooltip Automatically hides the report selection screen or "[location] as [num] important checks" screen. Note that with the show hints at bottom setting, this is always immediate.

    .row.grid
      input(
        placeholder="3000"
        v-model.number="settings.autoHideHintsDelay"
      )
      div
        p.name Autohide hint delay (ms)
        BaseTooltip This only has effect if 'Show hints at bottom' is off. Otherwise, it is always immediate

    .row.grid
      SwitchSlider(v-model="settings.atlantica")
      div
        p.name Show Atlantica
        BaseTooltip Loading hints will override this option. This is only for when hints are not used.
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
export default class SettingsImportant extends Vue {
  settings: State["important"] = { ...this.$store.state.settings.important };

  @Watch("settings", { deep: true })
  onSettingsChanged(): void {
    this.$store.commit("settings/setImportantSettings", this.settings);
  }
}
</script>
