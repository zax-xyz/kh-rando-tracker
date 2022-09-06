import semver from "semver";

import { Game } from "@/store/settings";
import type { Store } from "@/store";

export const migrate = async (store: Store) => {
  if (semver.lt(store.state.version, "2.10.0")) {
    const { migrate } = await import("./2.10.0");
    await migrate(store);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const settings = store.state.settings!;

  settings.iconStyles.levels.games = [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3, Game.BBS];
  settings.iconStyles.reports.games = [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3, Game.BBS];
};
