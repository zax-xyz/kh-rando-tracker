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

export const kh1Settings = {
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
    crystalTrident: false,
    libraryBooks: true,
  },
  expandRaftSupplies: true,
  correspondingMagic: true,
};

export type State = typeof state;

export const state = {
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
      games: [Game.KH2, Game.KH3],
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
      games: [Game.KH2, Game.KH2_IC, Game.KH3],
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
    raftSupplies: {
      title: "Raft Supplies",
      games: [Game.KH1],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    flan: {
      title: "Flantastic Seven",
      games: [Game.KH3],
      options: [IconStyle.DEFAULT, IconStyle.MINIMAL],
      value: IconStyle.DEFAULT,
    },
    luckyEmblems: {
      title: "Lucky Emblems",
      games: [Game.KH3],
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
  longPressDelay: 150,

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
