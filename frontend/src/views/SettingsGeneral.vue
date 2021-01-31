<template lang="pug">
  div
    .row.grid
      input(
        placeholder="#212121"
        v-model="settings.bgColor"
      )
      div
        p.name Background color
        BaseTooltip Accepts any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">CSS color</a>

    .row.grid
      input.long(
        placeholder="https://..."
        v-model="settings.bgImg"
      )
      div
        p.name Background image
        BaseTooltip The image must be provided as a URL

    .row.grid
      SwitchSlider(v-model="settings.disableShadows")
      div
        p.name Disable image shadows
        BaseTooltip Can significantly improve performance on slower devices

    .row.grid
      SwitchSlider(v-model="settings.autosave")
      div
        p.name Autosave
        BaseTooltip Saves your tracker state so that if you close the page, your progress will still be remembered for next time

    .row.grid
      button(
        @click="save"
        style="grid-row: 1; margin-left: auto"
      ) Export Settings
      div(style="grid-row: 1")
        button(
          @click="load"
        ) Import Settings
        input(
          ref="fileLoader"
          type="file"
          accept=".json"
          style="display: none"
          @change="onChange"
        )
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { saveAs } from "file-saver";

import BaseTooltip from "@/components/BaseTooltip.vue";
import SwitchSlider from "@/components/SwitchSlider.vue";
import { State } from "@/store/settings";

@Component({
  components: {
    BaseTooltip,
    SwitchSlider,
  },
})
export default class SettingsGeneral extends Vue {
  settings: State = { ...this.$store.state.settings };

  @Watch("settings", { deep: true })
  onSettingsChanged(): void {
    this.$store.commit("settings/setSettings", this.settings);
  }

  save(): void {
    const file = new Blob([JSON.stringify(this.$store.state.settings)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file, "kh2fm-tracker-settings.json");
  }

  load(): void {
    (this.$refs.fileLoader as HTMLElement).click();
  }

  onChange(event: Event): void {
    const elem = event.target as HTMLElement & { files: FileList };
    const reader = new FileReader();

    reader.onload = (event: Event) => {
      this.$store.commit("settings/setSettings", JSON.parse((event.target as any).result));
    };
    reader.readAsText(elem.files[0]);
  }
}
</script>
