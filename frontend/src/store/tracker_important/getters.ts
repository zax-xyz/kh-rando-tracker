import { GetterTree } from "vuex";

import { Item, State } from "./state";
import { RootState } from "../types";

export const getters: GetterTree<State, RootState> = {
  isLocation: (state: State) => (item: string): boolean => {
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
};
