<template lang="pug">
#app(
  @click.self="handleClick"
  :class="{ transparent: route.name === 'remote' }"
)
  router-view(v-if="route.meta.full")
  template(v-else)
    main(
      @contextmenu="(e) => e.preventDefault()"
      :style="mainStyle"
    )
      ImportantGrid(v-if="game === Game.KH2_IC")
      BaseGrid(
        v-else
        v-for="(_, client) in clients"
        :key="client"
        :clientId="client"
      )
    TheFooter(v-if="footer")
    ModalView
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

const BaseGrid = () => import("./components/BaseGrid.vue");
const ImportantGrid = () => import("./components/ImportantGrid.vue");
import TheFooter from "./components/TheFooter.vue";
import ModalView from "./components/ModalView.vue";
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
  onRouteChange(to: Route, from: Route): void {
    if (to.meta.title) document.title = `${to.meta.title} | KH Item Tracker`;
    else document.title = "KH Item Tracker";
  }

  created() {
    if (!this.$store.state.settings.autosave) {
      this.$store.commit("tracker/resetState");
      this.$store.commit("tracker_important/resetState");
    }

    // settings migrations
    const oldIconSettings = this.$store.state.settings.iconStyle;
    if (oldIconSettings) {
      Object.entries(oldIconSettings).forEach(([key, value]) => {
        this.$store.commit("settings/setIconStyle", { name: key, value });
      });
      this.$store.commit("settings/wipeOldIconSettings");
    }

    const oldItemNums = this.$store.state.settings.itemNums;
    if (oldItemNums) {
      this.$store.commit("settings/setNums", { game: Game.KH2, nums: oldItemNums });
      this.$store.commit("settings/wipeOldNums");
    }

    ["size", "padding"].forEach(s => {
      const setting = this.$store.state.settings[s];
      if (setting && !isNaN(Number(setting))) {
        // @ts-ignore
        this.$store.commit("settings/setSettings", { [s]: setting + "px" });
      }
    });

    // migration to 2.4.3 with single tracker module
    let oldState = this.$store.state.tracker?.clients?.self;
    if (oldState?.["worlds/simulated_twilight_town"] !== undefined) {
      this.$store.commit("tracker/addClient", { client: "self" });
      this.$store.commit("tracker/addGame", {
        client: "self",
        game: Game.KH2,
        items: oldState,
      });
      this.$store.commit("tracker/removeClient", { client: "clients" });
    }

    oldState = this.$store.state.tracker_1fm?.clients?.self;
    if (oldState !== undefined) {
      this.$store.commit("tracker/addGame", {
        client: "self",
        game: Game.KH1,
        items: oldState,
      });
      this.$store.commit("deleteProperty", "tracker_1fm");
    }

    oldState = this.$store.state.tracker_other?.clients?.self;
    if (oldState !== undefined) {
      for (const game in oldState) {
        this.$store.commit("tracker/addGame", {
          client: "self",
          game,
          items: oldState[game],
        });
      }
      this.$store.commit("deleteProperty", "tracker_other");
    }

    if (
      this.$store.state.settings.game !== Game.KH2_IC &&
      this.$store.getters["tracker/items"]("self") === undefined
    ) {
      this.$store.dispatch("tracker/addClient", "self");
    }
  }

  mounted() {
    document.body.onmousedown = (event: MouseEvent) => {
      if (event.button === 1)
        // Prevent autoscroll on middle click
        return false;
    };

    const version = this.$store.state.version;
    if (version && version !== this.$store.state.currVersion) {
      this.$router.push("changelog");
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
    return this.$route.query.footer !== "0";
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
