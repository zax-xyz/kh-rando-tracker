import { MutationTree } from "vuex";

import { Hints, Item, Location, State, initialState } from "./state";

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

  setHintSettings(state, settings: { [key: string]: boolean }) {
    for (const key in state.hintSettings) {
      state.hintSettings[key].enabled = settings[key] ?? false;

      if (!settings[key] && state.hintSettings[key].disable) {
        state.hintSettings[key].items.forEach(i => {
          state.items.all[i].disabled = true;
        });
      }
    }
  },

  setLocation(state, location: string): void {
    state.currentLocation = location;
  },

  incrementLocationChecks(
    state,
    { location, offset = 1 }: { location: string; offset: number },
  ): void {
    const locationState = state.items.all[location] as Location;
    if (!locationState) return;

    locationState.checks += offset;
  },

  incrementChecks(state, offset: number = 1): void {
    state.checks += offset;
  },

  setLocationTotal(state, payload: { location: string; checks: number }): void {
    (state.items.all[payload.location] as Location).totalChecks = payload.checks;
  },

  setCheckLocation(state, payload: { check: string; location: string }) {
    state.checkLocations[payload.check].push(payload.location);
    state.foundChecks[payload.location].push(payload.check);
  },

  removeCheckLocation(state, payload: { check: string; location: string }) {
    const locations = state.checkLocations[payload.check];
    locations.splice(locations.indexOf(payload.location), 1);

    const checks = state.foundChecks[payload.location];
    checks.splice(checks.indexOf(payload.check), 1);
  },

  foundHint(state, index: number): void {
    state.hints[index].found = true;
  },

  incrementIncorrectReport(state, index: number): void {
    state.hints[index].incorrectCounter++;
  },

  setHintMessage(state, message: string): void {
    state.hintMessage = message;
  },

  resetState(state): void {
    Object.assign(state, initialState());
  },
};
