import { ActionTree } from "vuex";
import { Game } from ".";
import { RootState } from "../types";
import { State } from "./state";

const actions: ActionTree<State, RootState> = {
  async setGame({ commit, rootState }, game: Game) {
    if (game !== Game.KH2_IC) {
      if (rootState.tracker!.self[game] === undefined) {
        const { items } = await import(`../tracker/items/${game}`);
        commit("tracker/addGame", { client: "self", game, items }, { root: true });
      }
    }

    commit("setGame", game);
  },
};

export default actions;
