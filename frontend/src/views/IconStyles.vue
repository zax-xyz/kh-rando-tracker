<template lang="pug">
  div
    h2 Icon Styles

    .row.grid
      span Worlds
      select(v-model="styles.worlds")
        option(value="0") Default
        option(value="1") Minimal
        option(value="2") Classic
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class IconStyles extends Vue {
  get styles() {
    return this.$store.state.settings.iconStyle;
  }

  set styles(newValue) {
    this.$store.commit("settings/setIconStyle", newValue);
  }
}
</script>

<style lang="stylus" scoped></style>
