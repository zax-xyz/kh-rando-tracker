import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tracker from "./tracker";
import { settings } from "./settings";
import co_op from "./co_op";
import tracker_important from "./tracker_important";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drag: false,
    edit: false,
  },
  mutations: {
    toggleDrag(state) {
      state.drag = !state.drag;
    },

    toggleEdit(state) {
      state.edit = !state.edit;
    },
  },
  modules: {
    tracker,
    settings,
    co_op,
    tracker_important,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({ paths: ["settings", "tracker_important", "tracker.clients.self"] }),
  ],
});
