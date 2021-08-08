<template lang="pug">
  div
    .row.grid
      SwitchSlider(v-model="settings.preselectWorld")
      div
        p.name Allow pre-selecting worlds
        BaseTooltip This allows you to select the world, then click on the checks without dragging them. This prevents you from being able to manually light up a world by clicking on it.

    .row.grid
      SwitchSlider(v-model="settings.showHintedChecks")
      div
        p.name Show number of hinted checks
        BaseTooltip Shows the number of hinted checks that have been found, and the total number of checks that have been hinted, in the format #[code found / total], next to the number of overall checks found

    .row.grid
      SwitchSlider(v-model="settings.hintsAtBottom")
      div
        p.name Show hints at bottom
        BaseTooltip If enabled, a single line will be shown at the bottom of the tracker for the last hint found

    .row.grid
      SwitchSlider(v-model="settings.autoHideHints")
      div
        p.name Autohide hint screen
        BaseTooltip Automatically hides the report selection screen or "[location] has [num] important checks" screen. Note that with the show hints at bottom setting, this is always immediate.

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
