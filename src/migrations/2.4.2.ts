import { Game } from "@/store/settings";
import { Store } from "vuex";

export const migrate = (store: Store<any>) => {
  const oldIconSettings = store.state.settings.iconStyle;
  if (oldIconSettings) {
    Object.entries(oldIconSettings).forEach(([key, value]) => {
      store.commit("settings/setIconStyle", { name: key, value });
    });
    store.commit("settings/wipeOldIconSettings");
  }

  ["size", "padding"].forEach(s => {
    const setting = store.state.settings[s];
    if (setting && !isNaN(Number(setting))) {
      // @ts-ignore
      store.commit("settings/setSettings", { [s]: setting + "px" });
    }
  });

  const oldItemNums = store.state.settings.itemNums;
  if (oldItemNums) {
    store.commit("settings/setNums", { game: Game.KH2, nums: oldItemNums });
    store.commit("settings/wipeOldNums");
  }
};
