<template lang="pug">
  .item(
    :class="cls"
    :style="itemStyle"
    @mousedown="handleMouseDown"
    @wheel="handleWheel"
  )
    img.icon(
      :src="`img/${file}.png`"
      :class="{ opaque: opaque, disabled: disabled }"
    )
    transition(name="fade-up")
      img.number(
        v-if="!disabled && total > 1 && level > 1"
        :src="`img/numbers/${Math.min(total, level)}.png`"
      )
    transition(name="fade-up")
      img.nobody(
        v-if="!disabled && dataFile && level === total + 1"
        :src="`img/nobody/${dataFile}.png`"
      )
    transition(name="fade-up")
      img.secondary(
        v-if="!disabled && secondary && secondaryLevel"
        :src="`img/${secondaryFile}.png`"
      )
    transition(name="fade-cross")
      img.cross(
        v-if="disabled"
        src="img/cross.png"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseCell extends Vue {
  @Prop(String) client!: string;
  @Prop(String) file!: string;

  cellData = this.$store.getters['tracker/cell'](this.client, this.file);
  cls: string = this.cellData.cls ?? null;

  get total(): number { return this.cellData.total }
  get opaque(): boolean { return this.cellData.opaque }
  get level(): number { return this.cellData.level }
  get dataFile(): string { return this.cellData.data ?? null }
  get secondary(): string | Array<string> { return this.cellData.secondary ?? null }
  get secondaryLevel(): number { return this.cellData.secondaryLevel }
  get secondaryFile(): string { return this.$store.getters['tracker/secondary'](this.client, this.file) }
  get disabled(): boolean { return this.cellData.disabled }

  get itemStyle(): object {
    return {
      width: `${100 / (this.$store.state.settings.columns || 5)}%`,
      padding: `${this.$store.state.settings.padding || 5}px`,
    };
  }

  dispatch(mutation: string, offset: number = 1, shift: boolean = false): void {
    this.$store.dispatch(mutation, {
      client: this.client,
      cell: this.file,
      offset,
      shift,
    });
  }

  handleMouseDown(event: MouseEvent): void {
    if (this.$store.state.drag) {
      if (event.button === 2)
        this.$emit('remove')

      return;
    }

    const offset = event.ctrlKey ? -1: 1;

    switch (event.button) {
      case 0:
        // Left Click
        this.dispatch('tracker/primary', offset, event.shiftKey);
        break;

      case 2:
        // Right Click
        this.dispatch('tracker/secondary', offset);
        break;

      case 1:
        // Middle Click
        this.dispatch('tracker/disable');
        break;
    }
  }

  handleWheel(event: WheelEvent): void {
    if (!this.$store.state.settings.scroll)
      return;

    // Prevent page scroll
    event.preventDefault();

    // Increment/decrement
    const offset = -Math.sign(event.deltaY);
    this.dispatch('tracker/primary', offset, event.shiftKey);
  }
}
</script>

<style lang="stylus" scoped>
.item
  position relative
  display inline-flex
  align-items center
  justify-content center

img
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.icon
  max-width 100%
  max-height 100px
  opacity .35
  transition opacity .25s

  &.opaque
    opacity 1

  &.disabled
    opacity .18

.number
  position absolute
  right 1%
  bottom 5%
  width 72%

.nobody
  position absolute
  top 5%
  left 0
  width 40%

.secondary
  position absolute
  top 5%
  right 0
  width 30%

  /.drive &
  /.hundred_acre &
    left 0
    top 7.5%
    width 75%

.fade-up-enter-active
.fade-up-leave-active
  transition opacity .25s, transform .25s

.fade-up-enter
.fade-up-leave-to
  opacity 0
  transform translateY(4px)

.cross
  position absolute
  width 50%
  height auto

  opacity 1

.fade-cross-enter-active
.fade-cross-leave-active
  transition opacity .25s, transform .25s

.fade-cross-enter
.fade-cross-leave-to
  opacity 0
  transform translateY(10px)
</style>