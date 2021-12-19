import Vue from "vue";
import { MutationTree } from "vuex";
import { Game, IconStyle } from ".";
import { kh1Settings, State } from "./state";

const mutations: MutationTree<State> = {
  setSettings(state, payload: State) {
    // Object.entries(payload).forEach(([key, value]) => Vue.set(state, key, value));
    Object.assign(state, payload);
  },

  setImportantSettings(state, payload: typeof state.important) {
    Object.assign(state.important, payload);
  },

  setKh1Settings(state, payload: typeof kh1Settings) {
    Object.assign(state[Game.KH1], payload);
  },

  setKh1Show(state, payload: typeof kh1Settings.show) {
    Object.assign(state[Game.KH1].show, payload);
  },

  setNums(state, payload: { game: Game; nums: number[] }): void {
    Vue.set(state.itemNums2, payload.game, [...payload.nums]);
  },

  resetNums(state, game: Game): void {
    Vue.set(state.itemNums2, game, undefined);
  },

  wipeOldNums(state): void {
    Vue.set(state, "itemNums", undefined);
  },

  setDefault(state, payload: { file: string; defaults: object }) {
    Vue.set(state.customDefaults, payload.file, payload.defaults);
  },

  setGame(state, game: Game): void {
    state.game = game;
  },

  setIconStyle(state, payload: { name: string; value: IconStyle }): void {
    const setting = state.iconStyles[payload.name];

    if (typeof setting === "undefined" || !setting.options.includes(payload.value)) {
      return;
    }

    state.iconStyles[payload.name].value = payload.value;
  },

  wipeOldIconSettings(state): void {
    Vue.set(state, "iconStyle", undefined);
  },
};

export default mutations;
