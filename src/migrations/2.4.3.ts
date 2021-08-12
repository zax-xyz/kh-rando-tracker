import semver from "semver";

import { Game } from "@/store/settings";
import { Store } from "vuex";

export const migrate = async (store: Store<any>) => {
  if (semver.lt(store.state.version, "2.4.2")) {
    const { migrate } = await import("./2.4.2");
    await migrate(store);
  }

  let oldState;

  if (undefined !== (oldState = store.state.tracker?.clients?.self)) {
    store.commit("tracker/addClient", { client: "self" });
    store.commit("tracker/addGame", {
      client: "self",
      game: Game.KH2,
      items: oldState,
    });
    store.commit("tracker/removeClient", { client: "clients" });
  }

  if (undefined !== (oldState = store.state.tracker_1fm?.clients?.self)) {
    store.commit("tracker/addGame", {
      client: "self",
      game: Game.KH1,
      items: oldState,
    });
    store.commit("deleteProperty", "tracker_1fm");
  }

  if (undefined !== (oldState = store.state.tracker_other?.clients?.self)) {
    for (const game in oldState) {
      store.commit("tracker/addGame", {
        client: "self",
        game,
        items: oldState[game],
      });
    }
    store.commit("deleteProperty", "tracker_other");
  }

  if (
    store.state.settings.game !== Game.KH2_IC &&
    store.getters["tracker/items"]("self") === undefined
  ) {
    store.dispatch("tracker/addClient", "self");
  }
};
