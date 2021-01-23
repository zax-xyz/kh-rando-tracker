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
