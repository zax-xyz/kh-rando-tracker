<template lang="pug">
#app(@click.self="handleClick" :class="{ transparent: route.name === 'remote' }")
  router-view(v-if="route.meta.full")
  template(v-else)
    main(@contextmenu="e => e.preventDefault()" :style="mainStyle")
      ImportantGrid(v-if="game === Game.KH2_IC")
      BaseGrid(v-else v-for="(_, client) in clients" :key="client" :clientId="client")
    TheFooter(v-if="footer")
    ModalView
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import semver from "semver";

const BaseGrid = () => import("./components/tracker/normal/BaseGrid.vue");
const ImportantGrid = () => import("./components/tracker/important/ImportantGrid.vue");
import TheFooter from "./components/TheFooter.vue";
import ModalView from "./components/menu/ModalView.vue";
import { Game } from "@/store/settings";

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
  onRouteChange(to: Route, _from: Route): void {
    if (to.meta.title) document.title = `${to.meta.title} | KH Item Tracker`;
    else document.title = "KH Item Tracker";
  }

  async created() {
    document.body.onmousedown = (event: MouseEvent) => {
      if (event.button === 1)
        // Prevent autoscroll on middle click
        return false;
    };

    if (!this.$store.state.settings.autosave) {
      this.$store.dispatch("tracker/resetState");
      this.$store.commit("tracker_important/resetState");
    }

    let version = this.$store.state.version;
    if (semver.valid(version) && semver.lt(version, "2.10.0")) {
      const { migrate } = await import("./migrations/2.10.0");
      await migrate(this.$store);
    }

    if (this.$route.query.footer === "0") {
      this.$store.commit("toggleFooter");
    }

    version = this.$store.state.version;
    if (version && version !== this.$store.state.currVersion) {
      this.$router.push("changelog");
    }

    this.$store.commit("updateVersion");

    if (
      this.$store.state.settings.game !== Game.KH2_IC &&
      this.$store.getters["tracker/items"]("self") === undefined
    ) {
      await this.$store.dispatch("tracker/addClient", "self");
    }
  }

  get route(): Route {
    return this.$route;
  }

  get Game() {
    return Game;
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

  get game(): Game {
    return this.$store.state.settings.game;
  }

  get clients(): object {
    const clients = this.$store.state.tracker;

    return this.$store.state.co_op.single ? { self: clients.self } : clients;
  }

  get footer(): boolean {
    return this.$store.state.footer;
  }

  handleClick(): void {
    if (!this.importantMode) {
      return;
    }

    this.$store.commit("tracker_important/selectLocation", "Free");
  }
}
</script>

<style lang="stylus" scoped>
main
  filter drop-shadow(0 3px 15px rgba(0, 0, 0, .5))
</style>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap')

$font = Lato, Helvetica, Arial, sans-serif

*
  box-sizing border-box

body
  margin 0

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
  line-height 1.6
  background #333 no-repeat fixed center / cover
  $over = rgba(0, 0, 0, .5)
  background-image linear-gradient($over, $over), url('/img/bg.webp')

  &.transparent
    background transparent

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
