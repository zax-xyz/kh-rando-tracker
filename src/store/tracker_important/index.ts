import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export type { State } from "./state";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
