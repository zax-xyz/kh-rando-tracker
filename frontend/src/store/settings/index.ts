const state = {
  scroll: false,
  columns: "",
  size: "",
  padding: "",
  bgColor: "",
  bgImg: "",
  disableShadows: false,
  itemNums: [] as Array<number>,
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
};

export default {
  namespaced: true,
  state,
  mutations,
};
