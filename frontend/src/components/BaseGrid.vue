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
      :key="(kh1fmMode ? 'kh2' : 'kh1') + items[i]"
      :client="clientId"
      :file="items[i]"
      @remove="remove(i)"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";

import BaseCell from "./BaseCell.vue";

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

  get items(): Array<string> {
    const tracker = this.$store.state.settings.kh1fmMode
      ? this.$store.state.tracker_1fm
      : this.$store.state.tracker;

    return Object.keys(tracker.clients[this.clientId]);
  }

  get itemNums(): Array<number> {
    if (!this.$store.state.settings.kh1fmMode) {
      const itemNums = this.$store.state.settings.itemNums;
      if (itemNums.length) return itemNums;
    }

    return [...Array(Object.keys(this.items).length).keys()];
  }

  set itemNums(nums: Array<number>) {
    this.$store.commit("settings/setNums", { nums: nums });
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
