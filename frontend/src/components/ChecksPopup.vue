<template lang="pug">
  div(
    @click.stop=""
    @click.right.stop.prevent=""
   )
    img(
      v-for="check in checks"
      :src="`img/${check}.png`"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChecksPopup extends Vue {
  @Prop(String) location!: string;

  get checks(): string[] {
    return this.$store.state.tracker_important.foundChecks[this.location];
  }
}
</script>

<style lang="stylus" scoped>
div
  position absolute
  left 50%
  top 115%
  display flex
  flex-wrap wrap
  justify-content center
  max-width 45px * 4
  min-width 10px
  width max-content
  min-height 10px
  padding 5px
  box-sizing content-box
  border-radius 4px
  background rgba(0, 0, 0, .8)
  box-shadow 0 2px 10px rgba(0, 0, 0, .5), 0 6px 5px -5px rgba(0, 0, 0, .25)
  transform translateX(-50%)
  z-index 1

  &:after
    position absolute
    left 50%
    bottom 100%
    border 5px solid transparent
    border-bottom-color rgba(0, 0, 0, .8)
    transform translateX(-50%)
    content ' '

img
  width 45px
</style>
