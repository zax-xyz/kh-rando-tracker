<template lang="pug">
  label.switch
    input(
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    )
    span.slider
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SwitchSlider extends Vue {
  @Prop(Boolean) value!: boolean;
}
</script>

<style lang="stylus" scoped>
.switch
  display inline-block
  width 3em
  height 1.5em

  input
    display none

.slider
  display flex
  align-items center

  height 100%
  padding-left .25em

  background-color #ccc
  border-radius 1em

  cursor pointer
  transition background-color .2s

  input:checked + &
    background-color hsl($accent-hue, $button-sat, $button-lig)

  &:before
    height 1em
    width 1em

    background-color white
    border-radius 50%
    box-shadow 0 2px 5px -2px black
    content ""

    transition margin-left .2s

    input:checked + &
      margin-left 1.5em
</style>