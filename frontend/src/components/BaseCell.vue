<template lang="pug">
  .item(
    :class="cls"
    :style="itemStyle"
    @mousedown="handleMouseDown"
    @wheel="handleWheel"
  )
    img.icon(
      :src="`/img/${styledIcon(file)}.webp`"
      :class="{ opaque: cell.opaque, disabled: cell.disabled }"
    )

    template(v-if="!cell.disabled")
      transition(name="fade-up")
        img.number(
          v-if="cell.total > 1 && cell.level > 1 || (cell.showFirst && cell.level)"
          :src="`/img/progression/numbers/${number}.webp`"
        )
      transition(name="fade-up")
        img.nobody(
          v-if="cell.data && cell.level > cell.total"
          :src="`/img/progression/${file.split('/').slice(-1)[0]}/${dataFile}.webp`"
        )
      transition(name="fade-up")
        .secondary(v-if="cell.secondaryLevel")
          img(:src="`/img/progression/${secondaryFile}.webp`")
          transition(name="fade-up")
            img.number(
              v-if="secondaryNumber"
              :src="`/img/progression/numbers/${secondaryNumber}.webp`"
            )
      transition(name="fade-up")
        img.corresponding(
          v-if="corresponding"
          :src="`/img/default/${corresponding}.webp`"
        )

    transition(name="fade-cross")
      img.cross(v-if="cell.disabled", src="/img/minimal/other/cross.webp")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Game } from "@/store/settings";
import { Item } from "@/store/tracker/state";

@Component
export default class BaseCell extends Vue {
  @Prop(String) client!: string;
  @Prop(String) file!: string;

  cls: string | null = this.cell.cls ?? null;

  get game(): Game {
    return this.$store.state.settings.game;
  }

  get cell(): Item {
    return this.$store.getters["tracker/cell"](this.client, this.file);
  }

  get number(): number {
    const level = Math.min(this.cell.total, this.cell.level);
    if (!this.cell.numbers) {
      return level;
    }

    return this.cell.numbers[level - 1];
  }

  get dataFile(): string | undefined {
    if (typeof this.cell.data === "string") return this.cell.data;
    return this.cell.data?.[this.cell.level - this.cell.total - 1];
  }

  get secondaryFile(): string {
    return this.$store.getters["tracker/secondary"](this.client, this.file);
  }

  get secondaryNumber(): string {
    return this.$store.getters["tracker/secondaryNumber"](this.client, this.file);
  }

  get corresponding(): string {
    return this.cell.correspondingItem;
  }

  get customDefaults() {
    return this.$store.state.settings.customDefaults[this.file];
  }

  custom(property: string, fallback: any): any {
    return this.customDefaults?.[property] ?? fallback;
  }

  styledIcon(file: string): string {
    const cell = this.$store.getters["tracker/cell"](this.client, file);
    const style = cell.isMinimal
      ? "Minimal"
      : this.$store.state.settings.iconStyles[cell.category]?.value;

    if (style === cell.categoryExclude) {
      return `default/${file}`;
    }

    switch (style) {
      case "Minimal":
        return `minimal/${cell.minimal ?? file}`;
      case "Classic":
        return `legacy/${file}`;
      default:
        return `default/${file}`;
    }
  }

  get itemStyle(): object {
    const width = 100 / (this.$store.state.settings.columns || 5);
    return {
      width: `${width}%`,
      height: 0,
      padding: `${width / 2}% ${this.$store.state.settings.padding || "7.5px"}`,
    };
  }

  dispatch(mutation: string, offset: number = 1, shift: boolean = false): void {
    this.$store.dispatch(`tracker/${mutation}`, {
      client: this.client,
      cell: this.file,
      offset,
      shift,
    });
  }

  handleMouseDown(event: MouseEvent): void {
    if (this.$store.state.drag) {
      if (event.button === 2) this.$emit("remove");

      return;
    }

    if (this.$store.state.edit) {
      this.$router.push({ name: "EditItem", params: { file: this.file } });
      return;
    }

    const offset = event.ctrlKey ? -1 : 1;

    switch (event.button) {
      case 0:
        // Left Click
        this.dispatch("primary", offset, event.shiftKey);
        break;

      case 2:
        // Right Click
        this.dispatch("secondary", offset);
        break;

      case 1:
        // Middle Click
        this.dispatch("disable");
        break;
    }
  }

  handleWheel(event: WheelEvent): void {
    if (!this.$store.state.settings.scroll) return;

    // Prevent page scroll
    event.preventDefault();

    // Increment/decrement
    const offset = -Math.sign(event.deltaY);
    this.dispatch("primary", offset, event.shiftKey);
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
  width 100%
  opacity .35
  transition opacity .25s

  &.opaque
    opacity 1

  &.disabled
    opacity .18

.number
  position absolute
  right 5%
  bottom 9%
  width 74%

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
    top 7.5%
    left -25%
    height 38%
    width auto

    &[src='/img/progression/numbers/max.webp']
      left 55%

  /.drive &
  /.hundred_acre &
  /.levels &
  /.magic &
    left 0
    top 7.5%
    width 35%

  /.levels &
    width 75%

.corresponding
  position absolute
  bottom 0
  left 0
  width 40%

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
