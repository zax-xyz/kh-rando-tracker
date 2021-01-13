import { MutationTree } from "vuex";

import { Hints, Item, State } from "./state";

export const mutations: MutationTree<State> = {
  setOpaque(_state, { item, opaque }: { item: Item; opaque: boolean }): void {
    item.opaque = opaque;
  },

  setLevel(_state, payload: { item: Item; level: number }): void {
    payload.item.level = payload.level;
  },

  setSecondaryLevel(_state, payload: { item: Item; level: number }): void {
    payload.item.secondaryLevel = payload.level;
  },

  disable(_state, item: Item): void {
    item.disabled = !item.disabled;
  },

  setHints(state, hints: Hints): void {
    state.hints = hints;
    state.hintsLoaded = true;
  },

  setLocation(state, location: string): void {
    state.currentLocation = location;
  },

  incrementLocationChecks(
    state,
    { location, offset = 1 }: { location: string; offset: number }
  ): void {
    state.items.locations[location].checks += offset;
  },

  incrementChecks(state, offset: number = 1): void {
    state.checks += offset;
  },

  setLocationTotal(state, payload: { location: string; checks: number }): void {
    state.items.locations[payload.location].totalChecks = payload.checks;
  },

  foundHint(state, index: number): void {
    state.hints[index].found = true;
  },

  incrementIncorrectReport(state, index: number): void {
    state.hints[index].incorrectCounter++;
  },
};
