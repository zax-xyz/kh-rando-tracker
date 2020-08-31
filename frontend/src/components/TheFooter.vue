<template lang="pug">
  footer
    .container
      .info Kingdom Hearts 2 Final Mix Item Tracker - Version {{ version }} (Preview)

      .info
        a(href="https://tracker.zaxu.xyz/old" target="_blank") Click here
        |
        | to use the pre-1.4 version

      .buttons
        router-link(
          v-for="route in routes"
          :to="route"
          :key="route"
          tag="button"
        ) {{ title(route) }}

      .buttons
        button(@click="popout") Popout window
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseTooltip from "./BaseTooltip.vue";

@Component({
  components: {
    BaseTooltip
  }
})
export default class TheFooter extends Vue {
  routes: Array<string> = ["about", "help", "co-op", "settings"];
  version = process.env.PACKAGE_VER;

  title(route: string): string {
    return route[0].toUpperCase() + route.slice(1);
  }

  popout() {
    window.open(
      "#/?footer=0",
      "",
      "left=0,top=0,width=600,height=1200,menubar=no,toolbar=no,scrollbars=no"
    );
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
  padding 5px 0

button
  margin 0 3px
</style>
