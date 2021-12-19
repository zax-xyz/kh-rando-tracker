import mutations from "./mutations";
import actions from "./actions";
import { state } from "./state";

export { IconStyle, Game } from "./state";

export const settings = {
  namespaced: true,
  state,
  actions,
  mutations,
};
