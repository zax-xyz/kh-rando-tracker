<template lang="pug">
  div
    h2 Edit Item
    h4 File: {{ file }}

    .row.grid
      p Image
      input.long(
        :placeholder="file"
      )

    .row.grid
      p Total
      input(
        :placeholder="settings.total"
      )

    .row.grid
      p Default Level
      input(
        :placeholder="settings.level"
      )

    .row.grid
      p Group
      input.long(
        :placeholder="settings.group"
      )

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
input
  width 3em !important

  &.long
    width 100% !important
</style>
