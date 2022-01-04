<template lang="pug">
div
  BaseGrid(v-if="ready" clientId="self")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseGrid from "@/components/tracker/normal/BaseGrid.vue";

@Component({
  components: {
    BaseGrid,
  },
})
export default class Remote extends Vue {
  ready = false;

  async beforeMount() {
    await this.$store.dispatch("settings/setGame", this.$route.params.game);
    this.$store.dispatch("reset");
    this.$store.dispatch("co_op/join", { room: this.$route.params.room });
    this.ready = true;
  }
}
</script>
