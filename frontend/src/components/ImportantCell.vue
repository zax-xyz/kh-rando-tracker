<template lang="pug">
  .item(
    :class="cls"
    @click="handleClick"
    @contextmenu="handleRightClick"
    @auxclick="handleMiddleClick"
    @wheel="handleWheel"
  )
    img.icon(
      :src="custom('file', `img/${file}.png`)"
      :class="{ opaque: cell.opaque, disabled: cell.disabled }"
    )

    template(v-if="!cell.disabled")
      transition-group(name="fade-up")
        img.number(
          v-if="!isLocation && cell.total > 1 && cell.level > 1"
          :src="`img/numbers/${Math.min(cell.total, cell.level)}.png`"
          key="1"
        )
        span.checksNumber(
          v-else-if="isLocation && cell.checks || cell.totalChecks > -1"
          key="1"
        ) {{ cell.checks }}
          template(v-if="cell.totalChecks > -1")
            span(style="color: #fdbd8a")  / 
            span(style="color: hsl(0, 100%, 75%)") {{ cell.totalChecks }}

        img.nobody(
          v-if="cell.data && cell.level === cell.total + 1"
          :src="`img/nobody/${cell.data}.png`"
          key="2"
        )

        .secondary(
          v-if="cell.secondaryLevel"
          key="3"
        )
          img(:src="`img/${secondaryFile}.png`")
          transition(name="fade-up")
            img.number(
              v-if="secondaryNumber"
              :src="`img/numbers/${secondaryNumber}.png`"
            )

        .report(
          v-if="hinted"
          :class="{ dim: hinted < 0 }"
          key="4"
        )
          img(
            src="img/other/secret_reports.png"
          )
          transition(name="fade-up")
            img.number(
              v-if="Math.abs(hinted) > 1"
              :src="`img/numbers/${Math.abs(hinted)}.png`"
            )

    transition(name="fade-cross")
      img.cross(v-if="cell.disabled", src="img/cross.png")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ImportantCell extends Vue {
  @Prop(String) file!: string;
  @Prop(Number) hinted!: number;

  cell = this.$store.getters["tracker_important/cell"](this.file);
  cls: string = this.cell.cls ?? null;

  get isLocation(): boolean {
    return this.$store.getters["tracker_important/isLocation"](this.file);
  }

  get secondaryFile(): string {
    return this.$store.getters["tracker_important/secondary"](this.file);
  }

  get secondaryNumber(): string {
    return this.$store.getters["tracker_important/secondaryNumber"](this.file);
  }

  get customDefaults() {
    return this.$store.state.settings.customDefaults[this.file];
  }

  custom(property: string, fallback: any): any {
    return this.customDefaults?.[property] ?? fallback;
  }

  dispatch(mutation: string, offset: number = 1, shift: boolean = false): void {
    this.$store.dispatch(mutation, {
      cell: this.file,
      offset,
      shift,
    });
  }

  handleClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;

    if (this.isLocation && offset == -1) {
      this.$emit("undo-check");
      return;
    }

    if (this.file === "other/secret_reports" && offset === 1) {
      this.$emit("found-report", "Free");
      return;
    }

    this.dispatch("tracker_important/primary", offset, event.shiftKey);
  }

  handleRightClick(event: MouseEvent): void {
    const offset = event.ctrlKey ? -1 : 1;
    this.dispatch("tracker_important/secondary", offset);
  }

  handleMiddleClick(event: MouseEvent): void {
    if (event.button !== 1) return;
    this.dispatch("tracker_important/disable");
  }

  handleWheel(event: WheelEvent): void {
    if (!this.$store.state.settings.scroll) return;

    // Prevent page scroll
    event.preventDefault();

    // Increment/decrement
    const offset = -Math.sign(event.deltaY);
    this.dispatch("tracker_important/primary", offset, event.shiftKey);
  }
}
</script>

<style lang="stylus" scoped>
.item
  position relative
  display inline-flex
  align-items center
  justify-content center
  width 55px

img
.checksNumber
  filter drop-shadow(1px 1px 5px rgba(0, 0, 0, .4))

.icon
  width 100%
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

.checksNumber
  position absolute
  right -20%
  bottom -15%
  color #fbf993
  font-size 1.2rem
  font-weight bold
  text-shadow -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000

.nobody
  position absolute
  top 5%
  left 0
  width 40%

.secondary
  position absolute
  top 5%
  right 0
  width 35%

  img
    width 100%

  .number
    top 0
    left 3%
    height 50%
    width auto

    &[src='img/numbers/max.png']
      left 25%

  .drive &
  .hundred_acre &
  .levels &
    left 0
    top 7.5%
    width 75%

  .magic &
    left 0
    width 40%

.report
  position absolute
  bottom -10%
  left -20%
  width 40%

  img
    width 100%
    vertical-align bottom
    transition opacity .2s

  &.dim img
    opacity .45

  .pages &
    bottom -5%
    width 55%

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
