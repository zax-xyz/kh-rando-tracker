<template lang="pug">
  div
    h2 {{ title }}
    .grid
      img(
        v-for="item in items"
        :src="`/img/default/${item}.webp`"
        @click="select(item)"
      )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Game } from "@/store/settings";
import { Item } from "@/store/tracker/state";

const tracker = namespace("tracker");
const settings = namespace("settings");

@Component
export default class Reports extends Vue {
  @settings.State game!: Game;

  name: string = this.$route.params.item;

  get item(): Item {
    return this.$store.state.tracker.self[this.game][this.name];
  }

  get title(): string {
    return this.item.popupTitle as string;
  }

  get items(): string[] {
    return this.item.popupItems as string[];
  }

  select(item: string) {
    this.$store.commit("tracker/setCorrespondingItem", {
      client: "self",
      game: this.game,
      item: this.name,
      other: item,
    });
    this.$router.push("/");
  }
}
</script>

<style lang="stylus" scoped>
.grid
  display flex
  flex-wrap wrap
  justify-content center
  gap 10px
  max-width 550px
  margin 0 auto

img
  width 100px
</style>
