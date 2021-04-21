import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tracker from "./tracker";
import tracker_1fm from "./tracker_1fm";
import { settings } from "./settings";
import co_op from "./co_op";
import tracker_important from "./tracker_important";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drag: false,
    edit: false,
    version: "",
    currVersion: process.env.PACKAGE_VER as string,
  },
  mutations: {
    toggleDrag(state) {
      state.drag = !state.drag;
    },

    toggleEdit(state) {
      state.edit = !state.edit;
    },

    updateVersion(state) {
      state.version = state.currVersion;
    },
  },
  modules: {
    tracker,
    tracker_important,
    tracker_1fm,
    settings,
    co_op,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      paths: ["settings", "tracker_important", "tracker_1fm", "tracker.clients.self", "version"],
    }),
  ],
});
