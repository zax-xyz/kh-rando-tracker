import Vue from "vue";
import { items as defaultItems, State } from "./state";

export default {
  addClient(state: State, payload: { client: string }): void {
    Vue.set(state.clients, payload.client, JSON.parse(JSON.stringify(defaultItems))); // Shitty deep copy
  },

  removeClient(state: State, payload: { client: string }): void {
    Vue.delete(state.clients, payload.client);
  },

  setOpaque(state: State, payload: { client: string; cell: string; opaque: boolean }): void {
    state.clients[payload.client][payload.cell].opaque = payload.opaque;
  },

  setLevel(state: State, payload: { client: string; cell: string; level: number }): void {
    state.clients[payload.client][payload.cell].level = payload.level;
  },

  setSecondaryLevel(state: State, payload: { client: string; cell: string; level: number }): void {
    state.clients[payload.client][payload.cell].secondaryLevel = payload.level;
  },

  disable(
    state: State,
    payload: {
      client: string;
      cell: string;
    }
  ): void {
    const item = state.clients[payload.client][payload.cell];
    item.disabled = !item.disabled;
  },
};
