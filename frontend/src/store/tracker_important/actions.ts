import { ActionTree } from "vuex";

import { Check, Hints, Items, Item, State } from "./state";
import locations from "./codes";
import { RootState } from "../types";

export const actions: ActionTree<State, RootState> = {
  primary(
    { commit, dispatch, getters, state },
    { cell, offset = 1, shift = false }: { cell: string; offset: number; shift: boolean }
  ) {
    const items: Items = state.items;
    const item: Item = getters.cell(cell);
    if (item.disabled) return;

    dispatch("co_op/sendClick", { type: "user_primary", cell, offset }, { root: true });

    var level = item.level;
    const data = Boolean(item.data);
    const total = item.total + ~~data;
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
      if (!shift) commit("setOpaque", { item, opaque: true });
    } else {
      commit("setOpaque", { item, opaque: false });
    }

    const group = item.group;

    const groupItems: string[] = [];
    if (group) {
      for (const [key, item] of Object.entries(items.checks)) {
        if (item.group === group) {
          groupItems.push(key);
        }
      }
    } else {
      groupItems.push(cell);
    }

    for (const i of groupItems) {
      const item: Item = getters.cell(i);
      commit("setLevel", { item, level });
    }

    if (
      cell in state.items.checks &&
      ((item as Check).levelsImportant ||
        (offset === 1 && level === 1) ||
        (offset < 0 && level === 0 && !shift))
    ) {
      // Don't increment check count if levels aren't important and we are levelling, but
      // increment if we are going down to 0
      commit("incrementChecks", offset);
    }
  },

  secondary({ commit, dispatch, getters }, { cell, offset = 1 }) {
    const item = getters.cell(cell);
    if (item.disabled) return;

    const secondary = item.secondary;
    if (!secondary) return;

    dispatch("co_op/sendClick", { type: "user_secondary", cell, offset }, { root: true });

    // Increment level with wrapping overflow based on total
    const end =
      1 + ((Array.isArray(secondary) ? secondary.length : item.secondaryTotal) + item.secondaryMax);

    commit("setSecondaryLevel", { item, level: (item.secondaryLevel + end + offset) % end });
  },

  disable({ commit, dispatch, getters }, { cell }) {
    dispatch("co_op/sendClick", { type: "user_disable", cell }, { root: true });

    const item = getters.cell(cell);
    commit("disable", item);
  },

  foundCheck({ commit, dispatch }, { check, location }) {
    dispatch("primary", { cell: check });
    if (location === "Free") {
      return;
    }

    commit("incrementLocationChecks", { location });
    dispatch("checkTotal", location);
  },

  checkTotal({ commit, dispatch, getters }, location: string) {
    const cell = getters.cell(location);
    if (cell.checks === cell.totalChecks) {
      if (cell.level === 0) {
        dispatch("primary", { cell: location });
      } else {
        commit("setOpaque", { item: cell, opaque: true });
      }
    }
  },

  undoCheck({ commit, dispatch, getters }, { check, location }) {
    const cell = getters.cell(check);

    if (cell.cls === "drive" || cell.group === "summon") {
      commit("setOpaque", { item: cell, opaque: false });
      commit("incrementChecks", -1);
    } else {
      dispatch("primary", { cell: check, offset: -1 });
    }

    commit("incrementLocationChecks", { location, offset: -1 });
  },

  loadHints({ commit }, file: File) {
    // Modified from https://github.com/Jsmartee/kh2fm-hints-demo/blob/master/js/main.js
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csv = reader.result as string;

      const lines = csv.split(/\r\n|\n/);
      const hints: Hints = [];

      const [reportValues, reportLocationAddresses] = [0, 1].map(i =>
        lines[i].slice(0, -1).split(".")
      );

      reportValues.forEach((value, index) => {
        const parts = value.split(",");
        const hintedLocation = getWorldByAddress(parts[0]);
        const checks = parseInt(parts[1]) - 32;

        const reportLocation = getWorldByAddress(reportLocationAddresses[index]);

        hints.push({
          report: reportLocation,
          location: hintedLocation,
          checks,
          found: false,
          incorrectCounter: 0,
        });
      });

      commit("setHints", hints);
    };
  },

  foundHint({ dispatch, commit, state }, index: number) {
    const location = state.hints[index].location;
    dispatch("checkTotal", location);
    commit("foundHint", index);
  },
};

function getWorldByAddress(address: string): string {
  const location = Object.entries(locations).find(([_, addresses]) => {
    return addresses.includes(address);
  });

  if (typeof location === "undefined") return "";

  return location[0];
}
