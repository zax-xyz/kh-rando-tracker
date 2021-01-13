<template lang="pug">
  div
    h1 [Does not yet work with important checks mode]

    h2 Join Room
    form(@submit.prevent="join")
      .row.grid
        input.long(
          placeholder="Room ID"
          v-model="joinRoomId"
        )
        div
          button(type="submit") Join Room

    h2 Create Room
    form(@submit.prevent="create")
      .row.grid
        input.long(
          placeholder="Room Size"
          v-model.number="roomSize"
        )
        div
          button(type="submit") Create Room

    .row(v-if="message")
      p {{ message }}

    .row
      p.footnote Note: Everyone should join the room BEFORE doing anything on the tracker as the server doesn't save anyone's state, it only tells others what you add to it.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Settings extends Vue {
  joinRoomId: string = "";
  createRoomId: string = "";
  roomSize: number | null = null;

  get message(): string {
    if (this.$store.state.co_op.joined) return `Joined room ${this.$store.state.co_op.room}`;

    const err = this.$store.state.co_op.error;
    if (err) return err;

    return "";
  }

  join(event: Event): void {
    this.$store.dispatch("co_op/join", { room: this.joinRoomId });
  }

  create(event: Event): void {
    this.$store.dispatch("co_op/create", { size: this.roomSize || 2 });
  }
}
</script>
