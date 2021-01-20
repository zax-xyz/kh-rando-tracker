import Vue from "vue";

const state = {
  scroll: false,
  columns: "",
  size: "",
  padding: "",
  bgColor: "",
  bgImg: "",
  disableShadows: false,
  itemNums: [] as Array<number>,
  customDefaults: {} as { [key: string]: { [key: string]: any } },
  importantChecksMode: false,
  iconStyle: {
    worlds: 0,
    magic: 0,
    drive: 0,
    summons: 0,
    abilities: 0,
    charm: 0,
    proofs: 0,
  } as { [key: string]: number },
};

export type State = typeof state;

const mutations = {
  setSettings(state: State, payload: typeof state) {
    Object.assign(state, payload);
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

  setIconStyle(state: State, payload: State["iconStyle"]) {
    Object.assign(state.iconStyle, payload);
  },
};

export const settings = {
  namespaced: true,
  state,
  mutations,
};
