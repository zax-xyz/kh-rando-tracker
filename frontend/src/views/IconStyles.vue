<template lang="pug">
  div
    .grid
      .group(
        v-for="(properties, name) in categories"
        v-if="properties.games === undefined || properties.games.includes(game)"
      )
        h1 {{ properties.title }}
        SliderIconStyles(
          :options="properties.options"
          :name="name"
          :iconStyle="properties.value"
        )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SliderIconStyles from "@/components/SliderIconStyles.vue";
import { Game } from "@/store/settings";

@Component({
  components: {
    SliderIconStyles,
  },
})
export default class IconStyles extends Vue {
  categories = this.$store.state.settings.iconStyles;

  get game(): Game {
    return this.$store.state.settings.game;
  }
}
</script>

<style lang="stylus" scoped>
.grid
  display flex
  justify-content space-around
  flex-wrap wrap

.group
  display flex
  flex-direction column
  align-items center
  padding 0 2em 2em
  margin .75em

  h1
    font-size 1.1em
</style>
