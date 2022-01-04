<template lang="pug">
div
  p.footnote [Does not yet work with important checks mode]

  h1 Co-Op

  h2 Join Room
  form(@submit.prevent="join")
    .row.grid
      input.long(placeholder="Room ID" v-model="joinRoomId")
      div
        button(type="submit") Join Room

  h2 Create Room
  form(@submit.prevent="create")
    .row.grid
      input.long(placeholder="Room Size" v-model.number="roomSize")
      div
        button(type="submit") Create Room

  .row(v-if="message")
    p {{ message }}

  .row.grid
    SwitchSlider(v-model="singleMode")
    p.name Single Mode

  template(v-if="link")
    h3 OBS Browser Source Link
    p
      a(:href="link") {{ link }}

  .row
    p.footnote Note: Everyone should join the room BEFORE doing anything on the tracker as the server doesn't save anyone's state, it only tells others what you add to it.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SwitchSlider from "@/components/menu/SwitchSlider.vue";

@Component({
  components: {
    SwitchSlider,
  },
})
export default class Settings extends Vue {
  joinRoomId: string = "";
  createRoomId: string = "";
  roomSize: number | null = null;
  singleMode: boolean = this.$store.state.co_op.single;

  get message(): string {
    if (this.$store.state.co_op.joined) return `Joined room ${this.$store.state.co_op.room}`;

    const err = this.$store.state.co_op.error;
    if (err) return err;

    return "";
  }

  get link(): string | undefined {
    if (this.$store.state.co_op.joined && this.$store.state.co_op.single) {
      const base = process.env.VUE_APP_DOMAIN;
      const game = this.$store.state.settings.game;
      const room = this.$store.state.co_op.room;
      return `${base}/remote/${game}/${room}`;
    }
  }

  join(_event: Event): void {
    this.$store.dispatch("co_op/join", { room: this.joinRoomId });
  }

  create(_event: Event): void {
    this.$store.dispatch("co_op/create", { size: this.roomSize || 2, single: this.singleMode });
  }
}
</script>
