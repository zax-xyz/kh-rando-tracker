<template lang="pug">
  div
    h2 Settings
    p Many of these settings currently have no effect in important checks mode.

    .row.grid
      SwitchSlider(v-model="settings.scroll")
      div
        p Scroll wheel increment/decrement
        BaseTooltip Scroll up on item to +1, scroll down to -1

    .row.grid
      input(
        placeholder="5"
        v-model="settings.columns"
      )
      p Number of grid columns

    .row.grid
      input(
        placeholder="100px"
        v-model="settings.size"
      )
      p Item size

    .row.grid
      input(
        placeholder="5px"
        v-model="settings.padding"
      )
      div
        p Item padding
        BaseTooltip Pre-1.4 versions used 7.5px

    .row.grid
      input.long(
        placeholder="#212121"
        v-model="settings.bgColor"
      )
      div
        p Background color
        BaseTooltip Accepts any valid <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">CSS color</a>

    .row.grid
      input.long(
        placeholder="https://..."
        v-model="settings.bgImg"
      )
      div
        p Background image
        BaseTooltip The image must be provided as a URL

    .row.grid
      SwitchSlider(v-model="settings.disableShadows")
      div
        p Disable image shadows
        BaseTooltip Can significantly improve performance on slower devices

    .row.grid
      button(
        :class="{ alt: drag }"
        @click="toggleDrag"
      ) Toggle Rearrange Mode
      div
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

    // .row.grid
      router-link(
        to="settings/icons"
        tag="button"
      ) Icon Styles
      p Edit Icon Styles


    .row.grid
      button(
        @click="save"
      ) Save as File
      div
        p Export settings

    .row.grid
      button(
        @click="load"
      ) Upload File
      p Import settings
      input(
        ref="fileLoader"
        type="file"
        accept=".json"
        style="display: none"
        @change="onChange"
      )

    .row
      p.footnote Note: In some browsers, using the tracker as a local file may not allow settings to persist across sessions
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
export default class Settings extends Vue {
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
    this.$store.commit("settings/resetNums");
  }

  toggleEdit() {
    this.$store.commit("toggleEdit");
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
