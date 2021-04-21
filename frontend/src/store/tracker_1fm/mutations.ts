import Vue from "vue";
import { MutationTree } from "vuex";
import { items as defaultItems, State } from "./state";

const mutations: MutationTree<State> = {
  addClient(state, payload: { client: string }): void {
    Vue.set(state.clients, payload.client, JSON.parse(JSON.stringify(defaultItems))); // Shitty deep copy
  },

  removeClient(state, payload: { client: string }): void {
    Vue.delete(state.clients, payload.client);
  },

  setOpaque(state, payload: { client: string; cell: string; opaque: boolean }): void {
    state.clients[payload.client][payload.cell].opaque = payload.opaque;
  },

  setLevel(state, payload: { client: string; cell: string; level: number }): void {
    state.clients[payload.client][payload.cell].level = payload.level;
  },

  setSecondaryLevel(state, payload: { client: string; cell: string; level: number }): void {
    state.clients[payload.client][payload.cell].secondaryLevel = payload.level;
  },

  disable(state, payload: { client: string; cell: string }): void {
    const item = state.clients[payload.client][payload.cell];
    item.disabled = !item.disabled;
  },

  resetState(state): void {
    state.clients.self = JSON.parse(JSON.stringify(defaultItems));
  },
};

export default mutations;
