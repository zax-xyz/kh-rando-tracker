import { GetterTree } from "vuex";

import { Item, State } from "./state";
import { RootState } from "../types";

const getters: GetterTree<State, RootState> = {
  cell: state => (client: string, item: string) => {
    return state.clients[client][item];
  },

  secondary: (_, getters: { [key: string]: any }) => (client: string, item: string) => {
    const cell: Item = getters.cell(client, item);
    if (typeof cell.secondary === "string") {
      return cell.secondary;
    }

    if (Array.isArray(cell.secondary)) {
      return cell.secondary[cell.secondaryLevel - 1];
    }
  },

  secondaryNumber: (_, getters: { [key: string]: any }) => (client: string, item: string) => {
    const cell: Item = getters.cell(client, item);

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

export default getters;
