import { State } from "./state";

export default {
  cell: (state: State) => (client: string, item: string) => {
    return state.clients[client][item];
  },

  secondary: (_: State, getters: { [key: string]: any }) => (
    client: string,
    item: string
  ) => {
    const cell = getters.cell(client, item);
    if (typeof cell.secondary === "string") return cell.secondary;

    // If it isn't a string, we assume it's an array and index it by level
    return cell.secondary[cell.secondaryLevel - 1];
  },

  secondaryNumber: (_: State, getters: { [key: string]: any }) => (
    client: string,
    item: string
  ) => {
    const cell = getters.cell(client, item);
    if (typeof cell.secondary === "string") {
      if (cell.secondaryMax && cell.secondaryLevel == cell.secondaryTotal + 1)
        return "max";
      if (cell.secondaryLevel > 1)
        return cell.secondaryLevel;
    }
  },
};
