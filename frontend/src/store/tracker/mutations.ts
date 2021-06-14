import Vue from "vue";
import { MutationTree } from "vuex";
import { Items, State } from "./state";
import { Game } from "../settings";

const mutations: MutationTree<State> = {
  addClient(state, payload: { client: string }): void {
    Vue.set(state, payload.client, {});
  },

  removeClient(state, payload: { client: string }): void {
    Vue.delete(state, payload.client);
  },

  addGame(state, payload: { client: string; game: Game; items: Items }): void {
    Vue.set(state[payload.client], payload.game, JSON.parse(JSON.stringify(payload.items)));
  },

  setOpaque(state, payload: { client: string; game: Game; cell: string; opaque: boolean }): void {
    state[payload.client][payload.game][payload.cell].opaque = payload.opaque;
  },

  setLevel(state, payload: { client: string; game: Game; cell: string; level: number }): void {
    state[payload.client][payload.game][payload.cell].level = payload.level;
  },

  setSecondaryLevel(
    state,
    payload: { client: string; game: Game; cell: string; level: number },
  ): void {
    state[payload.client][payload.game][payload.cell].secondaryLevel = payload.level;
  },

  setCorrespondingItem(
    state,
    payload: { client: string; game: Game; item: string; other: string },
  ): void {
    state[payload.client][payload.game][payload.item].correspondingItem = payload.other;
  },

  disable(state, payload: { client: string; game: Game; cell: string }): void {
    const item = state[payload.client][payload.game][payload.cell];
    item.disabled = !item.disabled;
  },

  resetState(state, payload: { client: string; game: Game; items: Items }): void {
    state[payload.client] = JSON.parse(JSON.stringify(payload.items));
  },
};

export default mutations;
