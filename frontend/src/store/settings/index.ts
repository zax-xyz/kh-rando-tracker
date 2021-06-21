import Vue from "vue";
import { ActionTree, MutationTree } from "vuex";
import { RootState } from "../types";

export enum IconStyle {
  CLASSIC = "Classic",
  DEFAULT = "Default",
  MINIMAL = "Minimal",
}

export enum Game {
  KH1 = "kh1",
  KH2 = "kh2",
  KH2_IC = "kh2_ic",
  KH3 = "kh3",
  COM = "com",
  DAYS = "days",
  BBS = "bbs",
  CODED = "coded",
  DDD = "ddd",
}

const kh1Settings = {
  show: {
    worlds: false,
    cups: false,
    levels: false,
    magic: true,
    summons: true,
    reports: true,
    dalmations: true,
    trinities: true,
    jackInTheBox: true,
    crystalTrident: true,
    libraryBooks: true,
  },
  expandRaftSupplies: true,
  correspondingMagic: true,
};

const state = {
  bgColor: "",
  bgImg: "",
  disableShadows: false,
  autosave: true,

  customDefaults: {} as { [key: string]: { [key: string]: any } },
  game: Game.KH2_IC,

  iconStyles: {
    worlds: {
      title: "Worlds",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    cups: {
      title: "Cups",
      games: [Game.KH1, Game.KH2],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    data: {
      title: "Data Org",
      games: [Game.KH2],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    drive: {
      title: "Drive Forms (Location)",
      games: [Game.KH2_IC],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    levels: {
      title: "Levels",
      games: [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    magic: {
      title: "Magic",
      games: [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    forms: {
      title: "Drive Forms",
      games: [Game.KH2, Game.KH2_IC],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    summons: {
      title: "Summons",
      games: [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    reports: {
      title: "Reports",
      games: [Game.KH1, Game.KH2, Game.KH2_IC, Game.KH3],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    pages: {
      title: "Torn Pages",
      games: [Game.KH2_IC],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    scom: {
      title: "Second Chance/Once More",
      games: [Game.KH2_IC],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    charm: {
      title: "Promise Charm",
      games: [Game.KH2, Game.KH2_IC],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    proofs: {
      title: "Proofs",
      games: [Game.KH2, Game.KH2_IC],
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    dalmatians: {
      title: "Dalmatians",
      games: [Game.KH1],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    trinities: {
      title: "Trinities",
      games: [Game.KH1],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    jackInTheBox: {
      title: "Jack In The Box",
      games: [Game.KH1],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    libraryBooks: {
      title: "Library Books",
      games: [Game.KH1],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
  } as { [key: string]: { title: string; options: IconStyle[]; value: IconStyle } },

  // normal mode. kept outside in the root to remain backwards-compatible with old user settings
  scroll: false,
  columns: "",
  size: "",
  padding: "",
  itemNums2: {} as { [key: string]: number[] },

  important: {
    preselectWorld: true,
    showHintedChecks: true,
    hintsAtBottom: true,
    autoHideHints: true,
    autoHideHintsDelay: null,
    atlantica: false,
    width: "",
    worldSize: "",
    worldVerticalPadding: "",
    checkSize: "",
    checkVerticalPadding: "",
  },

  [Game.KH1]: kh1Settings,
};

export type State = typeof state;

const actions: ActionTree<State, RootState> = {
  async setGame({ commit, rootState }, game: Game) {
    if (game !== Game.KH2_IC) {
      if ((rootState as any).tracker.self[game] === undefined) {
        const { items } = await import(`../tracker/items/${game}`);
        commit("tracker/addGame", { client: "self", game, items }, { root: true });
      }
    }

    commit("setGame", game);
  },
};

const mutations: MutationTree<State> = {
  setSettings(state, payload: State) {
    // Object.entries(payload).forEach(([key, value]) => Vue.set(state, key, value));
    Object.assign(state, payload);
  },

  setImportantSettings(state, payload: typeof state.important) {
    Object.assign(state.important, payload);
  },

  setKh1Settings(state, payload: typeof kh1Settings) {
    Object.assign(state[Game.KH1], payload);
  },

  setKh1Show(state, payload: typeof kh1Settings.show) {
    Object.assign(state[Game.KH1].show, payload);
  },

  setNums(state, payload: { game: Game; nums: number[] }): void {
    Vue.set(state.itemNums2, payload.game, [...payload.nums]);
  },

  resetNums(state, game: Game): void {
    Vue.set(state.itemNums2, game, undefined);
  },

  wipeOldNums(state): void {
    Vue.set(state, "itemNums", undefined);
  },

  setDefault(state, payload: { file: string; defaults: object }) {
    Vue.set(state.customDefaults, payload.file, payload.defaults);
  },

  setGame(state, game: Game): void {
    state.game = game;
  },

  setIconStyle(state, payload: { name: string; value: IconStyle }): void {
    const setting = state.iconStyles[payload.name];

    if (typeof setting === "undefined" || !setting.options.includes(payload.value)) {
      return;
    }

    state.iconStyles[payload.name].value = payload.value;
  },

  wipeOldIconSettings(state): void {
    Vue.set(state, "iconStyle", undefined);
  },
};

export const settings = {
  namespaced: true,
  state,
  actions,
  mutations,
};
