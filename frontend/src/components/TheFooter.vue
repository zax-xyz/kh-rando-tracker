<template lang="pug">
  footer
    .container
      .info KH Item Tracker - Version {{ version }}

      .buttons
        router-link(
          v-for="route in routes"
          :to="route"
          :key="route"
          tag="button"
        ) {{ title(route) }}
        button(@click="reset") Reset Tracker

      .buttons
        label(for="game") Game
        select(name="game" v-model="game")
          option(:value="Game.KH2" selected) KH2
          option(:value="Game.KH2_IC") KH2 (Important Checks Mode)
          option(:value="Game.KH1") KH1
          option(:value="Game.COM") CoM
          option(:value="Game.DAYS") Days
          option(:value="Game.BBS") BBS
          option(:value="Game.CODED") Coded
          option(:value="Game.DDD") DDD
          option(:value="Game.KH3") KH3

      .buttons(
        v-if="game === Game.KH2"
      )
        button(
          :class="{ success: hintsLoaded }"
          @click="selectHints"
        ) Upload Hints
        input(
          ref="file"
          type="file"
          accept=".txt,.hint"
          hidden
          @change="loadHints"
        )

      .buttons
        button(@click="popout") Popout window
        button(@click="hideFooter") Hide Footer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import BaseTooltip from "./BaseTooltip.vue";
import SwitchSlider from "./SwitchSlider.vue";
import { Game } from "@/store/settings";

const tracker = namespace("tracker_important");

@Component({
  components: {
    BaseTooltip,
    SwitchSlider,
  },
})
export default class TheFooter extends Vue {
  @tracker.State hintsLoaded!: boolean;

  routes: Array<string> = ["info", "co-op", "settings"];
  version = process.env.PACKAGE_VER;

  title(route: string): string {
    return route[0].toUpperCase() + route.slice(1);
  }

  get Game() {
    return Game;
  }

  get fileElem(): HTMLInputElement {
    return this.$refs.file as HTMLInputElement;
  }

  get importantMode(): boolean {
    return this.$store.state.settings.importantChecksMode;
  }

  set importantMode(toggled: boolean) {
    this.$store.commit("settings/setImportantChecksMode", toggled);
  }

  get kh1fmMode(): boolean {
    return this.$store.state.settings.kh1fmMode;
  }

  set kh1fmMode(toggled: boolean) {
    this.$store.commit("settings/setKh1fmMode", toggled);
  }

  get game(): string {
    return this.$store.state.settings.game;
  }

  set game(game: string) {
    this.$store.commit("settings/setGame", game);
  }

  selectHints() {
    this.fileElem.click();
  }

  loadHints() {
    const files = this.fileElem.files;
    if (files === null || files.length === 0) return;

    this.$store.dispatch("tracker_important/loadHints", files[0]);
  }

  popout(): void {
    window.open("#/", "", "left=0,top=0,width=600,height=1200,menubar=no,toolbar=no,scrollbars=no");
  }

  hideFooter(): void {
    this.$router.push({ query: { footer: "0" } });
  }

  reset(): void {
    switch (this.game) {
      case "kh1":
        this.$store.commit("tracker_1fm/resetState");
        break;
      case "kh2":
        if (this.importantMode) {
          this.$store.commit("tracker_important/resetState");
        } else {
          this.$store.commit("tracker/resetState");
        }
    }
  }
}
</script>

<style scoped lang="stylus">
footer
  flex 1
  position relative
  width 100%
  padding 15px
  font-size 14px
  background $bg-color
  z-index 1

.container
  max-width 1200px
  margin 0 auto

  > *
    padding 2.5px 0

.buttons
  display flex
  align-items center
  justify-content center
  padding 5px 0

  > *
    margin 0 3px

select
  padding 6px 5px
  background #464646
  color white
  text-align center
  border 0
  border-radius 3px;
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.2)
  transition background-color 0.2s

  &:hover
    background #333
</style>
