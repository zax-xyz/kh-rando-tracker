<template lang="pug">
  SliderMulti(:ticks="options" v-model="value" width="200px")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { IconStyle } from "@/store/settings";
import SliderMulti from "@/components/SliderMulti.vue";

@Component({
  components: {
    SliderMulti,
  },
})
export default class SliderIconStyles extends Vue {
  @Prop(String) name!: string;
  @Prop(Array) options!: string[];

  get value(): number {
    const index = this.options.indexOf(this.$store.state.settings.iconStyle[this.name]);
    if (index === -1) {
      this.$store.commit("settings/setIconStyle", { name: this.name, value: "Default" });
      return this.value;
    }

    return index;
  }

  set value(newValue) {
    this.$store.commit("settings/setIconStyle", { name: this.name, value: this.options[newValue] });
  }
}
</script>

<style lang="stylus" scoped>
.icon-styles-container
  display flex
  flex-direction column
  align-items center
  padding 0 2em 2em
  margin .75em

  h1
    font-size 1.1em
</style>
