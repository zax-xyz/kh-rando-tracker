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
};

type State = typeof state;

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
};

export default {
  namespaced: true,
  state,
  mutations,
};
