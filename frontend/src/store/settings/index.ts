import Vue from "vue";

export enum IconStyle {
  CLASSIC = "Classic",
  DEFAULT = "Default",
  MINIMAL = "Minimal",
}

const state = {
  bgColor: "",
  bgImg: "",
  disableShadows: false,
  autosave: true,

  customDefaults: {} as { [key: string]: { [key: string]: any } },
  importantChecksMode: true,

  iconStyles: {
    worlds: {
      title: "Worlds",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    cups: {
      title: "Cups",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    data: {
      title: "Data Org",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    drive: {
      title: "Drive Forms (Location)",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    levels: {
      title: "Levels",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    magic: {
      title: "Magic",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    forms: {
      title: "Drive Forms",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    summons: {
      title: "Summons",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    reports: {
      title: "Reports",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    pages: {
      title: "Torn Pages",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    scom: {
      title: "Second Chance/Once More",
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    charm: {
      title: "Promise Charm",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    proofs: {
      title: "Proofs",
      options: [IconStyle.CLASSIC, IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
  } as { [key: string]: { title: string; options: IconStyle[]; value: IconStyle } },

  // normal mode. kept outside in the root to remain backwards-compatible with old user settings
  scroll: false,
  columns: "",
  size: "",
  padding: "",
  itemNums: [] as Array<number>,

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
};

export type State = typeof state;

const mutations = {
  setSettings(state: State, payload: typeof state) {
    // Object.entries(payload).forEach(([key, value]) => Vue.set(state, key, value));
    Object.assign(state, payload);
  },

  setImportantSettings(state: State, payload: typeof state.important) {
    Object.assign(state.important, payload);
  },

  setNums(state: State, payload: { nums: Array<number> }): void {
    state.itemNums = payload.nums;
  },

  resetNums(state: State): void {
    state.itemNums = [];
  },

  setDefault(state: State, payload: { file: string; defaults: object }) {
    Vue.set(state.customDefaults, payload.file, payload.defaults);
  },

  setImportantChecksMode(state: State, enabled: boolean): void {
    state.importantChecksMode = enabled;
  },

  setIconStyle(state: State, payload: { name: string; value: IconStyle }): void {
    const setting = state.iconStyles[payload.name];

    if (typeof setting === "undefined" || !setting.options.includes(payload.value)) {
      return;
    }

    state.iconStyles[payload.name].value = payload.value;
  },

  wipeOldIconSettings(state: State): void {
    Vue.set(state, "iconStyle", undefined);
  },
};

export const settings = {
  namespaced: true,
  state,
  mutations,
};
