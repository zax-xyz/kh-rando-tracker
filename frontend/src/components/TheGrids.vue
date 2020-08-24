<template lang="pug">
div
  .grid
    .item(
      v-for="item in items"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  items = [
    { name: "" }
  ]
}
</script>

<style scoped lang="stylus">
</style>
