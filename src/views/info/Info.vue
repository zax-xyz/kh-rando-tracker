<template lang="pug">
  div
    NavBar(:links="links")

    router-view.content
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import NavBar from "@/components/menu/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class Info extends Vue {
  links = {
    "/info/about": "About",
    "/info/help": "Help",
    "/info/thanks": "Thanks",
    "/info/changelog": "Changelog",
  };
}
</script>

<style lang="stylus" scoped>
.content
  margin-top 1em
</style>
