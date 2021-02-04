import Vue from "vue";

export enum IconStyle {
  CLASSIC = "Classic",
  DEFAULT = "Default",
  MINIMAL = "Minimal",
}

const state = {
  bgColor: "",
  bgImg: "",
  disableShadows: false,
  autosave: true,

  customDefaults: {} as { [key: string]: { [key: string]: any } },
  importantChecksMode: true,

  iconStyle: {
    worlds: IconStyle.DEFAULT,
    cups: IconStyle.DEFAULT,
    data: IconStyle.DEFAULT,
    levels: IconStyle.DEFAULT,
    drive: IconStyle.DEFAULT,
    magic: IconStyle.DEFAULT,
    forms: IconStyle.DEFAULT,
    summons: IconStyle.DEFAULT,
    reports: IconStyle.DEFAULT,
    pages: IconStyle.DEFAULT,
    charm: IconStyle.DEFAULT,
    proofs: IconStyle.DEFAULT,
  } as { [key: string]: IconStyle },

  // normal mode. kept outside in the root to remain backwards-compatible with old user settings
  scroll: false,
  columns: "",
  size: "",
  padding: "",
  itemNums: [] as Array<number>,

  important: {
    width: "",
    worldSize: "",
    worldVerticalPadding: "",
    checkSize: "",
    checkVerticalPadding: "",
    hintsAtBottom: true,
    autoHideHints: true,
    autoHideHintsDelay: null,
    atlantica: false,
  },
};

export type State = typeof state;

const mutations = {
  setSettings(state: State, payload: typeof state) {
    Object.assign(state, payload);
  },

  setImportantSettings(state: State, payload: typeof state.important) {
    Object.assign(state.important, payload);
  },

  setNums(state: State, payload: { nums: Array<number> }): void {
    state.itemNums = payload.nums;
  },

  resetNums(state: State): void {
    state.itemNums = [];
  },

  setDefault(state: State, payload: { file: string; defaults: object }) {
    Vue.set(state.customDefaults, payload.file, payload.defaults);
  },

  setImportantChecksMode(state: State, enabled: boolean): void {
    state.importantChecksMode = enabled;
  },

  setIconStyle(state: State, payload: { name: string; value: IconStyle }) {
    state.iconStyle[payload.name] = payload.value;
  },
};

export const settings = {
  namespaced: true,
  state,
  mutations,
};
