<template lang="pug">
  div
    .grid
      .group(v-for="(properties, name) in categories")
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

@Component({
  components: {
    SliderIconStyles,
  },
})
export default class IconStyles extends Vue {
  categories = this.$store.state.settings.iconStyles;
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
