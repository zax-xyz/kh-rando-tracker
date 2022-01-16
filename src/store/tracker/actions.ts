import { ActionTree } from "vuex";

import { State } from "./state";
import { RootState } from "../types";
import { Game } from "../settings";
import router from "../../router";

const actions: ActionTree<State, RootState> = {
  primary(
    { commit, dispatch, state, rootState },
    { client, cell, offset = 1, shift = false, remote = false },
  ) {
    const game: Game = rootState.settings!.game;
    const items = state[client][game];
    const item = items[cell];
    if (item.disabled) return;

    if (!remote) {
      dispatch(
        "co_op/sendClick",
        { type: "user_primary", client, item: cell, offset, shift },
        { root: true },
      );
    }

    let level = item.level;
    const total = item.total + (typeof item.data === "string" ? 1 : item.data?.length ?? 0);
    const end = total + 1;

    // Increment level with wrapping overflow based on total,
    // but not if locked but levelled - assume it is now unlocked for first time
    if (!level || item.opaque || shift) {
      level = (level + end + offset) % end;
    }

    // Shift click to indicate levelling without fully unlocking
    // I.e. levelling drive forms through its auto ability
    if (shift) {
      if (offset > 0 && level - offset === 0) {
        level += 1;
      } else if (offset < 0 && level === 1) {
        level = 0;
      }
    }

    if (level) {
      if (!shift) {
        commit("setOpaque", { client, game, cell, opaque: true });
      }
    } else {
      commit("setOpaque", { client, game, cell, opaque: false });
    }

    const group = item.group;

    const groupItems: string[] = [];
    if (group) {
      for (const key in items) if (items[key].group === group) groupItems.push(key);
    } else {
      groupItems.push(cell);
    }

    for (const gItem of groupItems) {
      commit("setLevel", { client, game, cell: gItem, level });

      if (
        (offset > 0 && item.secondaryAuto?.includes(level))
        || (offset < 0 && item.secondaryAuto?.includes(level - offset))
        || (offset < 0 && level === total && item.secondaryAuto?.includes(level))
      ) {
        let newSecLevel = (items[gItem].secondaryLevel + offset) % items[gItem].secondaryTotal;
        if (newSecLevel < 0) {
          newSecLevel = items[gItem].secondaryTotal + newSecLevel;
        }

        commit("setSecondaryLevel", {
          client,
          game,
          cell: gItem,
          level: newSecLevel,
        });
      } else if (level === 0) {
        commit("setSecondaryLevel", {
          client,
          game,
          cell: gItem,
          level: 0,
        });
      }
    }

    if (
      !remote
      && client === "self"
      && rootState.settings!.kh1.correspondingMagic
      && item.popupTitle !== undefined
    ) {
      if (level === 1 && offset > 0) {
        router.push(`item_popup/${cell}`);
      } else if (level === 0) {
        commit("setCorrespondingItem", { client: "self", game, item: cell, other: "" });
      }
    }
  },

  secondary({ commit, dispatch, state, rootState }, { client, cell, offset = 1, remote = false }) {
    const game: Game = rootState.settings!.game;
    const items = state[client][game];
    const item = items[cell];
    if (item.disabled) return;

    const secondary = item.secondary;
    if (!secondary) return;

    if (!remote)
      dispatch(
        "co_op/sendClick",
        { type: "user_secondary", client, item: cell, offset },
        { root: true },
      );

    // Increment level with wrapping overflow based on total
    const length = Array.isArray(secondary) ? secondary.length : item.secondaryTotal;
    const end = 1 + length + +item.secondaryMax;
    commit("setSecondaryLevel", {
      client,
      game,
      cell,
      level: (item.secondaryLevel + end + offset) % end,
    });
  },

  disable({ commit, dispatch, rootState }, { client, cell, remote }) {
    if (!remote)
      dispatch("co_op/sendClick", { type: "user_disable", client, item: cell }, { root: true });

    const game = rootState.settings!.game;

    commit("disable", { client, game, cell });
  },

  setCorrespondingItem({ commit, dispatch, rootState }, { client, cell, other, remote = false }) {
    if (!remote)
      dispatch(
        "co_op/sendClick",
        { type: "user_corresponding", client, item: cell, other },
        { root: true },
      );

    const game = rootState.settings!.game;

    commit("setCorrespondingItem", { client, game, cell, other });
  },

  async addClient({ commit, rootState, state }, client: string) {
    const game = rootState.settings!.game;
    const { items } = await import(`./items/${game}`);

    if (state[client] === undefined) {
      commit("addClient", { client });
    }

    commit("addGame", { client, game, items });
  },

  async resetState({ commit, rootState, state }) {
    const game = rootState.settings!.game;
    const { items } = await import(`./items/${game}`);
    for (const client in state) {
      if (Object.prototype.hasOwnProperty.call(state, client)) {
        commit("addGame", { client, game, items });
      }
    }
  },
};

export default actions;
