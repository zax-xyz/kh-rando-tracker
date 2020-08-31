<template lang="pug">
  div
    h2 Edit Item
    h4 File: {{ file }}

    .row.grid
      input.long
      p Custom image

    .row.grid
      input(
        :placeholder="settings.total"
      )
      p Total

    .row.grid
      input(
        :placeholder="settings.level"
      )
      p Default Level

    .row.grid
      input.long(
        :placeholder="settings.group"
      )
      p Group

    .row.grid
      p Secondary (right click)
      input.long(
        :placeholder="JSON.stringify(settings.secondary)"
      )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EditItem extends Vue {
  get file(): string {
    return this.$route.params.file;
  }

  get settings(): object {
    return this.$store.state.tracker.clients[""][this.file];
  }
}
</script>

<style lang="stylus" scoped>

</style>