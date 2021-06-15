import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tracker from "./tracker";
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
    footer: true,
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

    toggleFooter(state) {
      state.footer = !state.footer;
    },

    deleteProperty(state, key: string) {
      Vue.delete(state, key);
    },
  },
  actions: {
    reset({ commit, dispatch, rootState }) {
      if ((rootState as any).settings.game === Game.KH2_IC) {
        commit("tracker_important/resetState");
      } else {
        dispatch("tracker/resetState");
      }
    },
  },
  modules: {
    tracker,
    tracker_important,
    settings,
    co_op,
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      paths: ["settings", "tracker.self", "version"],
    }),
  ],
});
