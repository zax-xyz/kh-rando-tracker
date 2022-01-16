import { Game } from "@/store/settings";
import type { Store } from "@/store";

export const migrate = (store: Store) => {
  // @ts-ignore: this is based on a previous version of the store
  const oldIconSettings = store.state.settings!.iconStyle;
  if (oldIconSettings) {
    Object.entries(oldIconSettings).forEach(([key, value]) => {
      store.commit("settings/setIconStyle", { name: key, value });
    });
    store.commit("settings/wipeOldIconSettings");
  }

  (["size", "padding"] as ("size" | "padding")[]).forEach(s => {
    const setting = store.state.settings![s];
    if (setting && !isNaN(Number(setting))) {
      store.commit("settings/setSettings", { [s]: setting + "px" });
    }
  });

  // @ts-ignore: this is based on a previous version of the store
  const oldItemNums = store.state.settings!.itemNums;
  if (oldItemNums) {
    store.commit("settings/setNums", { game: Game.KH2, nums: oldItemNums });
    store.commit("settings/wipeOldNums");
  }
};
