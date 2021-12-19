import semver from "semver";

import { Game } from "@/store/settings";
import { Store } from "vuex";

export const migrate = async (store: Store<any>) => {
  if (semver.lt(store.state.version, "2.4.3")) {
    const { migrate } = await import("./2.4.3");
    await migrate(store);
  }

  // @ts-ignore
  store.state.settings.iconStyles.data.games = [Game.KH2, Game.KH3];
  store.state.settings.iconStyles.proofs.games = [Game.KH2, Game.KH2_IC, Game.KH3];
};
