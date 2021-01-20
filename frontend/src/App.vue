<template lang="pug">
#app
  main(
    @contextmenu="(e) => e.preventDefault()"
    :style="mainStyle"
  )
    BaseGrid(
      v-if="!importantMode"
      v-for="(_, client) in clients"
      :key="client"
      :clientId="client"
    )
    ImportantGrid(v-else)
  TheFooter(v-if="footer")
  ModalView
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

import BaseGrid from "./components/BaseGrid.vue";
import TheFooter from "./components/TheFooter.vue";
import ModalView from "./components/ModalView.vue";
import ImportantGrid from "./components/ImportantGrid.vue";

@Component({
  components: {
    BaseGrid,
    TheFooter,
    ModalView,
    ImportantGrid,
  },
})
export default class extends Vue {
  @Watch("$route", { immediate: true })
  onRouteChange(to: Route, from: Route): void {
    if (to.meta.title) document.title = `${to.meta.title} | KH2FM Item Tracker`;
    else document.title = "KH2FM Item Tracker";
  }

  created() {
    ["size", "padding"].forEach((s) => {
      // @ts-ignore
      const setting = this.$store.state.settings[s];
      if (setting && !isNaN(Number(setting))) {
        // @ts-ignore
        this.$store.commit("settings/setSettings", { [s]: setting + "px" });
      }
    });
  }

  get mainStyle(): object {
    if (!this.footer) {
      return {
        display: "flex",
        "align-items": "center",
        flex: 1,
      };
    }

    return {};
  }

  get importantMode(): boolean {
    return this.$store.state.settings.importantChecksMode;
  }

  get clients(): object {
    return this.$store.state.tracker.clients;
  }

  get footer(): boolean {
    return this.$route.query.footer !== "0";
  }

  mounted(): void {
    document.body.onmousedown = (event: MouseEvent) => {
      if (event.button === 1)
        // Prevent autoscroll on middle click
        return false;
    };
  }
}
</script>

<style lang="stylus" scoped>
main
  filter drop-shadow(0 3px 15px rgba(0, 0, 0, .5))
</style>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap')

$font = Lato, Helvetica, Arial, sans-serif

*
  box-sizing border-box

body
  margin 0
  background #333 no-repeat fixed center / cover
  $over = rgba(0, 0, 0, .5)
  background-image linear-gradient($over, $over), url('../img/bg.jpg')

#app
button
input
  // Why does Chrome need separate font styles
  font-family $font

#app
  display flex
  flex-direction column
  align-items center
  min-height 100vh
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color white
  line-height 1.5

a
  color hsl($accent-hue, $link-sat, 68%)
  text-decoration-color transparent
  transition color .25s, text-decoration-color .25s

  &:hover
    color hsl($accent-hue, $link-sat, 73%)
    text-decoration-color initial

button-colors($hue, $sat = $button-sat, $lig = $button-lig)
  color hsl($hue, 100%, 98%)
  background hsl($hue, $sat, $lig)
  box-shadow 0 2px 5px hsla($hue, $sat, $lig + 5%, .2)

  &:hover
    background hsl($hue, $sat, $lig - 5%)

button
  padding 7px 15px
  button-colors($accent-hue)
  border-radius 3px
  border 0
  outline 0
  cursor pointer
  transition color .25s, background-color .25s, box-shadow .25s, transform .25s

  &:hover
    transform translateY(-2px)

  &.alt
    button-colors($secondary-hue)

  &.success
    button-colors($green-hue, 70%, 70%)
    color hsl(120, 76.5%, 3.3%)
</style>
