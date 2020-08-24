<template lang="pug">
  footer
    .container
      .info Kingdom Hearts 2 Final Mix Item Tracker - Version {{ version }} (Preview)

      .info
        a(href="https://tracker.zaxu.xyz/old" target="_blank") Click here
        |
        | to use the pre-1.4 version

      .buttons
        button(
          :class="{ alt: drag }"
          @click="toggleDrag"
        ) Toggle Rearrange Mode
        BaseTooltip Click + drag to move items around, and right click to remove an item
        button(
          @click="reset"
        ) Reset

      .buttons
        router-link(
          v-for="route in routes"
          :to="route"
          :key="route"
          tag="button"
        ) {{ title(route) }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseTooltip from './BaseTooltip.vue'

@Component({
  components: {
    BaseTooltip,
  },
})
export default class TheFooter extends Vue {
  routes: Array<string> = [
    "about",
    "help",
    "co-op",
    "settings"
  ];
  version = process.env.PACKAGE_VER;

  get drag(): boolean {
    return this.$store.state.drag;
  }

  title(route: string): string {
    return route[0].toUpperCase() + route.slice(1);
  }

  toggleDrag() {
    this.$store.commit('toggleDrag');
  }

  reset() {
    this.$store.commit('settings/resetNums');
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