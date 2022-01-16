import semver from "semver";

import { Game } from "@/store/settings";
import type { Store } from "@/store";

export const migrate = async (store: Store) => {
  if (semver.lt(store.state.version, "2.4.3")) {
    const { migrate } = await import("./2.4.3");
    await migrate(store);
  }

  /* eslint-disable -- this should be fine */
  store.state.settings!.iconStyles.data.games = [Game.KH2, Game.KH3];
  store.state.settings!.iconStyles.proofs.games = [Game.KH2, Game.KH2_IC, Game.KH3];
};
