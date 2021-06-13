<template lang="pug">
  div
    BaseGrid(clientId="self")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseGrid from "@/components/BaseGrid.vue";

@Component({
  components: {
    BaseGrid,
  },
})
export default class Remote extends Vue {
  beforeMount() {
    this.$store.commit("settings/setGame", this.$route.params.game);
    this.$store.dispatch("reset");
    this.$store.dispatch("co_op/join", { room: this.$route.params.room });
  }
}
</script>
