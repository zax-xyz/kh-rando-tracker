import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tracker from "./tracker";
import tracker_1fm from "./tracker_1fm";
import tracker_other from "./tracker_other";
import { Game, settings } from "./settings";
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
  actions: {
    reset({ commit, rootState }) {
      // @ts-ignore
      switch (rootState.settings.game) {
        case Game.KH1:
          commit("tracker_1fm/resetState");
          break;
        case Game.KH2:
          commit("tracker/resetState");
          break;
        case Game.KH2_IC:
          commit("tracker_important/resetState");
          break;
        default:
          commit("tracker_other/resetState");
          break;
      }
    },
  },
  modules: {
    tracker,
    tracker_important,
    tracker_1fm,
    tracker_other,
    settings,
    co_op,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      paths: [
        "settings",
        "tracker_important",
        "tracker_1fm.clients.self",
        "tracker.clients.self",
        "version",
      ],
    }),
  ],
});
