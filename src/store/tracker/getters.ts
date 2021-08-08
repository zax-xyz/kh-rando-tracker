import { GetterTree } from "vuex";

import { Item, State } from "./state";
import { RootState } from "../types";
import { Game } from "../settings";

const getters: GetterTree<State, RootState> = {
  items: (state, _, rootState) => (client: string) => {
    const game: Game = (rootState as any).settings.game;
    return state[client][game];
  },

  cell: (_, getters) => (client: string, item: string) => {
    return getters.items(client)[item];
  },

  secondary: (_, getters) => (client: string, item: string) => {
    const cell: Item = getters.cell(client, item);
    if (typeof cell.secondary === "string") {
      return cell.secondary;
    }

    if (Array.isArray(cell.secondary)) {
      return cell.secondary[cell.secondaryLevel - 1];
    }
  },

  secondaryNumber: (_, getters) => (client: string, item: string) => {
    const cell: Item = getters.cell(client, item);

    if (typeof cell.secondary === "string") {
      if (cell.secondaryMax && cell.secondaryLevel === cell.secondaryTotal + 1) {
        return "max";
      }

      if (cell.secondaryNumbers !== undefined) {
        return cell.secondaryNumbers[cell.secondaryLevel - 1];
      }

      if (cell.secondaryLevel > 1) {
        return cell.secondaryLevel;
      }
    }
  },
};

export default getters;
