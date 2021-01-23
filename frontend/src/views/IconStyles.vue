<template lang="pug">
  div
    .grid
      .group(v-for="(properties, name) in categories")
        h1 {{ properties.title }}
        SliderIconStyles(:options="properties.options" :name="name")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { IconStyle } from "@/store/settings";
import SliderIconStyles from "@/components/SliderIconStyles.vue";

@Component({
  components: {
    SliderIconStyles,
  },
})
export default class IconStyles extends Vue {
  categories = {
    worlds: {
      title: "Worlds",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    cups: {
      title: "Cups",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    data: {
      title: "Data Org",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    drive: {
      title: "Drive Forms (Location)",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    levels: {
      title: "Levels",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    magic: {
      title: "Magic",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    forms: {
      title: "Drive Forms",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    summons: {
      title: "Summons",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    reports: {
      title: "Reports",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    scom: {
      title: "Second Chance/Once More",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    charm: {
      title: "Promise Charm",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
    proofs: {
      title: "Proofs",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
    },
  };
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
