<template lang="pug">
  draggable.grid(
    tag="transition-group"
    :componentData="componentData"
    :style="gridStyle"
    :class="{ disableShadows: disableShadows }"
    v-model="itemNums"
    animation="250"
    :disabled="!drag"
    @start="dragging = true"
    @end="dragging = false"
  )
    BaseCell(
      v-for="i in itemNums"
      v-if="shouldShow(items[i])"
      :key="game + items[i]"
      :client="clientId"
      :file="items[i]"
      @remove="remove(i)"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";

import BaseCell from "./BaseCell.vue";
import { Item } from "@/store/types";
import { Game } from "@/store/settings";

@Component({
  components: {
    BaseCell,
    draggable,
  },
})
export default class BaseGrid extends Vue {
  @Prop({ type: String, required: false, default: "self" }) clientId!: string;

  dragging: boolean = false;

  get disableShadows(): boolean {
    return this.$store.state.settings.disableShadows;
  }

  get kh1fmMode(): boolean {
    return this.$store.state.settings.kh1fmMode;
  }

  get game(): Game {
    return this.$store.state.settings.game;
  }

  get tracker() {
    return this.$store.getters["tracker/items"](this.clientId);
  }

  get items(): Array<string> {
    return Object.keys(this.tracker);
  }

  get itemNums(): Array<number> {
    const itemNums = this.$store.state.settings.itemNums2[this.game];
    if (itemNums && itemNums.length) return itemNums;

    return [...Array(Object.keys(this.items).length).keys()];
  }

  set itemNums(nums: Array<number>) {
    this.$store.commit("settings/setNums", { nums: nums, game: this.game });
  }

  get componentData(): object {
    return {
      props: {
        tag: "div",
        type: "transition",
        name: !this.dragging ? "flip-list" : null,
      },
    };
  }

  get drag(): boolean {
    return this.$store.state.drag;
  }

  get gridStyle(): object {
    const settings = this.$store.state.settings;
    const columns = settings.columns || 5;
    const size = settings.size || "100px";
    const padding = settings.padding ? settings.padding.split(/\s/).slice(-1)[0] : "5px";

    const style: { [key: string]: string } = {
      "max-width": `calc(${columns} * (${size} + 2 * ${padding}))`,
      "background-color": settings.bgColor,
    };

    const bgImg = settings.bgImg;
    const darken = "rgba(0, 0, 0, .6)";
    if (bgImg) style["background-image"] = `linear-gradient(${darken}, ${darken}), url(${bgImg})`;

    if (this.$route.query.footer === "0") {
      style["border-radius"] = "4px";
      style.margin = "0";
    }

    return style;
  }

  shouldShow(name: string) {
    const item: Item = this.tracker[name];
    const { category, show, dontShow } = item;
    const settings = this.$store.state.settings?.[this.game];

    let shouldShow = true;
    if (category !== undefined) {
      const showSetting: boolean | undefined = settings?.show?.[category];
      shouldShow = showSetting === undefined || showSetting;

      if (!shouldShow) {
        return false;
      }
    }

    if (show) {
      shouldShow = settings[show];
    } else if (dontShow) {
      shouldShow = !settings[dontShow];
    }

    return shouldShow;
  }

  remove(index: number): void {
    this.itemNums = this.itemNums.filter(i => i !== index);
  }
}
</script>

<style scoped lang="stylus">
.grid
  display inline-flex
  flex-wrap wrap
  justify-content center
  max-width 550px
  padding 15px
  margin 5px 5px 0
  background $bg-color no-repeat center / cover
  border-radius 4px 4px 0 0
  box-sizing content-box
  user-select none

  /.transparent &
    margin 0
    background transparent

.disableShadows >>> img
  filter none

.flip-list-move
  transition transform .2s

.flip-list-enter
.flip-list-leave-to
  opacity 0

.flip-list-leave-active
  position absolute
</style>
