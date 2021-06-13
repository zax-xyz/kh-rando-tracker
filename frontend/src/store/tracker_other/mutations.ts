import Vue from "vue";
import { MutationTree } from "vuex";
import { items as defaultItems, Item, State } from "./state";

const mutations: MutationTree<State> = {
  addClient(state, payload: { client: string }): void {
    Vue.set(state.clients, payload.client, JSON.parse(JSON.stringify(defaultItems))); // Shitty deep copy
  },

  removeClient(state, payload: { client: string }): void {
    Vue.delete(state.clients, payload.client);
  },

  setOpaque(_state, payload: { item: Item; opaque: boolean }): void {
    payload.item.opaque = payload.opaque;
  },

  setLevel(_state, payload: { item: Item; level: number }): void {
    payload.item.level = payload.level;
  },

  setSecondaryLevel(_state, payload: { item: Item; level: number }): void {
    payload.item.secondaryLevel = payload.level;
  },

  disable(state, payload: { item: Item }): void {
    payload.item.disabled = !payload.item.disabled;
  },

  resetState(state): void {
    state.clients.self = JSON.parse(JSON.stringify(defaultItems));
  },
};

export default mutations;
