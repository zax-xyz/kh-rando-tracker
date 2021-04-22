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
export default class Info extends Vue {
  links = {
    about: "About",
    help: "Help",
    thanks: "Thanks",
    changelog: "Changelog",
  };
}
</script>

<style lang="stylus" scoped>
.content
  margin-top 1em
</style>
