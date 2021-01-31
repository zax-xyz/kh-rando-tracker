import { ActionTree } from "vuex";

import { Check, Hints, Items, Item, State } from "./state";
import { formatItem } from "@/util";
import locations from "./codes";
import { RootState } from "../types";
import { items } from "../tracker/state";

export const actions: ActionTree<State, RootState> = {
  primary(
    { commit, dispatch, getters, state },
    { cell, offset = 1, shift = false }: { cell: string; offset: number; shift: boolean },
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

    if (
      !getters.isLocation(cell) &&
      ((item as Check).levelsImportant ||
        (!shift && ((offset === 1 && !item.opaque) || (offset < 0 && level === 0))))
    ) {
      // Don't increment check count if levels aren't important and we are levelling, but
      // increment if we are going down to 0
      commit("incrementChecks", offset);
    }

    if (level) {
      if (!shift && !item.opaque) {
        commit("setOpaque", { item, opaque: true });
      }
    } else {
      commit("setOpaque", { item, opaque: false });
    }

    const group = item.group;

    const groupItems: string[] = group
      ? Object.keys(items.all).filter(k => items.all[k].group === group)
      : [cell];

    for (const i of groupItems) {
      const item: Item = getters.cell(i);
      commit("setLevel", { item, level });
    }
  },

  secondary({ commit, dispatch, getters }, { cell, offset = 1 }) {
    const item = getters.cell(cell) as Item;
    if (item.disabled) return;

    const secondary = item.secondary;
    if (!secondary) return;

    dispatch("co_op/sendClick", { type: "user_secondary", cell, offset }, { root: true });

    // Increment level with wrapping overflow based on total
    const length = Array.isArray(secondary) ? secondary.length : item.secondaryTotal;
    const end = 1 + length + +item.secondaryMax;

    commit("setSecondaryLevel", { item, level: (item.secondaryLevel + end + offset) % end });
  },

  disable({ commit, dispatch, getters }, { cell }) {
    dispatch("co_op/sendClick", { type: "user_disable", cell }, { root: true });

    const item = getters.cell(cell);
    commit("disable", item);
  },

  foundCheck({ commit, dispatch, state }, { check, location, shift = false }) {
    const item = state.items.all[check] as Check;
    const opaque = item.opaque;

    dispatch("primary", { cell: check, shift });

    if (location === "Free" && (opaque || shift) && !item.levelsImportant) {
      console.log(formatItem(check), "levelled up to", item.level);
      return;
    }

    const setting = item.setting;
    if (setting && !state.hintSettings[setting].enabled) {
      // if it is off in the hint settings, then don't increment checks
      return;
    }

    commit("incrementLocationChecks", { location });
    commit("setCheckLocation", { check, location });
    dispatch("checkTotal", location);

    console.log(formatItem(check), "found in", formatItem(location));
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

  undoCheck({ commit, dispatch, getters, state }, { check, location, shift = false }) {
    const cell = getters.cell(check);

    if (!cell.levelsImportant) {
      if (location === "Free" && cell.level > 1) {
        dispatch("primary", { cell: check, offset: -1, shift: cell.opaque ? shift : true });
        console.log(formatItem(check), "unlevelled to", cell.level);
        return;
      }

      commit("setOpaque", { item: cell, opaque: false });
      commit("incrementChecks", -1);
    } else {
      dispatch("primary", { cell: check, offset: -1, shift });
    }

    const setting = state.items.all[check].setting;
    if (setting && !state.hintSettings[setting].enabled) {
      // if it is off in the hint settings, then don't decrement checks
      return;
    }

    commit("incrementLocationChecks", { location, offset: -1 });
    commit("removeCheckLocation", { check, location });

    console.warn("Removed", formatItem(check), "from", formatItem(location));
  },

  loadHints({ commit }, file: File) {
    // based on https://github.com/Jsmartee/kh2fm-hints-demo/blob/master/js/main.js
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csv = reader.result as string;

      const lines = csv.split(/\r\n|\n/);
      const hints: Hints = [];

      const [reportValues, reportLocationAddresses] = [0, 1].map(i =>
        lines[i].slice(0, -1).split("."),
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

      const settings = lines[2].split(" - ").slice(1, -1);
      commit("setHintSettings", Object.fromEntries(settings.map(s => [s, true])));
    };
  },

  foundHint({ dispatch, commit, state }, index: number) {
    const hint = state.hints[index];
    commit("setLocationTotal", { location: hint.location, checks: hint.checks });
    dispatch("checkTotal", hint.location);
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
