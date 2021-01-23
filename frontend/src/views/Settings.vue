<template lang="pug">
  div
    NavBar(:links="links")

    router-view.content
    .row
      p.footnote Note: In some browsers, using the tracker as a local file may not allow settings to persist across sessions
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class Settings extends Vue {
  links = {
    general: "General",
    icons: "Icon Styles",
    normal: "Normal",
    important: "Important Checks Mode",
  };
}
</script>

<style lang="stylus" scoped>
.content
  margin-top 1em
</style>
