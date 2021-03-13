import { GetterTree } from "vuex";

import { Item, State } from "./state";
import { RootState } from "../types";

export const getters: GetterTree<State, RootState> = {
  isLocation: state => (item: string): boolean => {
    return state.items.locations.flat().includes(item);
  },

  cell: state => (item: string): Item => {
    return state.items.all[item] ?? {};
  },

  secondary: (_, getters) => (item: string): string | undefined => {
    const cell: Item = getters.cell(item);

    if (typeof cell.secondary === "string") {
      return cell.secondary;
    }

    if (Array.isArray(cell.secondary)) {
      return cell.secondary[cell.secondaryLevel - 1];
    }
  },

  secondaryNumber: (_, getters) => (item: string): string | number | undefined => {
    const cell = getters.cell(item);

    if (typeof cell.secondary === "string") {
      if (cell.secondaryMax && cell.secondaryLevel === cell.secondaryTotal + 1) {
        return "max";
      }

      if (cell.secondaryLevel > 1) {
        return cell.secondaryLevel;
      }
    }
  },

  hasProof: state => (location: string): boolean =>
    state.foundChecks[location].some(c => c.startsWith("other/proof_")),

  willBeHinted: (state, getters) => (location: string): boolean => {
    return (
      // the world has a proof
      getters.hasProof(location) ||
      // the world has a report that hints a world with a proof
      state.hints
        .filter(h => h.found && h.report === location)
        .some(h => getters.hasProof(h.location)) ||
      // the world has a form and a proof is on drive levels
      (getters.hasProof("other/drive_form") &&
        state.foundChecks[location].some(c => c.startsWith("drive/"))) ||
      // the world has a page and a proof is in 100AW
      (getters.hasProof("worlds/100_acre_wood") &&
        state.foundChecks[location].includes("other/torn_pages"))
    );
  },
};
