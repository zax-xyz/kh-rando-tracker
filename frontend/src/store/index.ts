import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tracker from "./tracker";
import settings from "./settings";
import co_op from "./co_op";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drag: false,
  },
  mutations: {
    toggleDrag(state) {
      state.drag = !state.drag;
    },
  },
  modules: {
    tracker,
    settings,
    co_op,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [createPersistedState({ paths: ["settings"] })],
});
