<template lang="pug">
  .slider(
    tabindex="0"
    ref="slider"
    :style="{ width: width }"
    @keydown="handleKey"
  )
    .bar
    .track(
      :style="{ width: posPercent(selected) }"
    )
    .tick(
      v-for="(tick, index) in ticks"
      :key="index"
      :class="{ active: index <= selected }"
      :style="{ left: posPercent(index) }"
      @mousedown="setValue(index)"
      @mouseover="handleMouseOver(index, $event)"
    )
      span {{ tick }}
    .handle(
      :style="{ left: posPercent(selected) }"
      ref="handle"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SliderMulti extends Vue {
  @Prop(Array) ticks!: string[];
  @Prop(Number) value!: number;
  @Prop({ type: String, default: "250px" }) width!: string;

  selected = this.value;

  setValue(index: number) {
    this.selected = index;
    this.$emit("input", index);
  }

  posPercent(index: number): string {
    return (index / (this.ticks.length - 1)) * 100 + "%";
  }

  handleMouseOver(index: number, event: MouseEvent) {
    if (event.buttons === 1 && this.$refs.slider === document.activeElement) {
      this.setValue(index);
    }
  }

  handleKey(event: KeyboardEvent) {
    if (event.key === "ArrowRight" && this.selected < this.ticks.length - 1) {
      this.selected++;
    } else if (event.key === "ArrowLeft" && this.selected > 0) {
      this.selected--;
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
  display flex
  justify-content space-between
  align-items center
  position relative
  height 8px
  outline 0
  cursor pointer
  user-select none

.bar
  position absolute
  width 100%
  height 4px
  background #383838

.track
  position absolute
  height 4px
  background hsl($accent-hue, $button-sat, 68%)
  transition width .2s

.tick
  position absolute
  display flex
  justify-content center
  width 8px
  height 8px
  border-radius 50%
  background #7a7a7a
  border 2px solid #4d4d4d
  box-shadow 0 1px 3px rgba(0, 0, 0, .3)
  transform translateX(-50%)
  z-index 1

  &.active
    background white
    border-color hsl($accent-hue, $button-sat, 68%)
    transition background .2s step-end, border-color .2s step-end

  span
    padding-top 1em

.handle
  position absolute
  width 12px
  height 12px
  background white
  border 2px solid hsl($accent-hue, $button-sat, $button-lig)
  border-radius 50%
  box-shadow 0 1px 5px rgba(0, 0, 0, .4)
  transform translateX(-50%)
  transition left .2s, box-shadow .2s
  z-index 1

  .slider:focus &
    box-shadow 0 1px 3px rgba(0, 0, 0, .3), 0 0 0 5px hsla($accent-hue, $button-sat, $button-lig, .2)
</style>
