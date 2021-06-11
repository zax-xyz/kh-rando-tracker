import { ActionTree } from "vuex";

import { Item, State } from "./state";
import { RootState } from "../types";

const actions: ActionTree<State, RootState> = {
  primary({ commit, dispatch, state, rootState }, { client, cell, offset = 1, shift = false }) {
    // @ts-ignore
    const items = state.clients[client][rootState.settings.game];
    const item: Item = items[cell];
    if (item.disabled) return;

    dispatch(
      "co_op/sendClick",
      { type: "user_primary", client, cell, offset, shift },
      { root: true },
    );

    var level = item.level;
    const total =
      item.total +
      (typeof item.data === "string" ? 1 : typeof item.data === "object" ? item.data.length : 0);
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
        commit("setOpaque", { item, opaque: true });
      }
    } else {
      commit("setOpaque", { item, opaque: false });
    }

    const group = item.group;

    const groupItems = [];
    if (group) {
      for (const key in items) if (items[key].group === group) groupItems.push(key);
    } else {
      groupItems.push(cell);
    }

    for (const item of groupItems) {
      commit("setLevel", { item: items[item], level });
    }
  },

  secondary({ commit, dispatch, getters, state, rootState }, { client, cell, offset = 1 }) {
    // @ts-ignore
    const item: Item = getters.cell(client, cell);
    if (item.disabled) return;

    const secondary = item.secondary;
    if (!secondary) return;

    dispatch("co_op/sendClick", { type: "user_secondary", client, cell, offset }, { root: true });

    // Increment level with wrapping overflow based on total
    const length = Array.isArray(secondary) ? secondary.length : item.secondaryTotal;
    const end = 1 + length + +item.secondaryMax;
    commit("setSecondaryLevel", {
      client,
      cell,
      level: (item.secondaryLevel + end + offset) % end,
    });
  },

  disable({ commit, dispatch, getters }, { client, cell }) {
    const item: Item = getters.cell(client, cell);
    dispatch("co_op/sendClick", { type: "user_disable", client, cell }, { root: true });

    commit("disable", { item });
  },
};

export default actions;
