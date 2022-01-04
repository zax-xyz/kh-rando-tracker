<template lang="pug">
  div
    NavBar(:links="links")

    router-view.content
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class Help extends Vue {
  links = {
    normal: "Normal",
    important: "Important Checks mode",
  };
}
</script>

<style lang="stylus" scoped>
.content
  margin-top 1em
</style>
