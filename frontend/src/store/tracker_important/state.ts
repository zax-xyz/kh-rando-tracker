import { IconStyle } from "../settings";

export interface Item {
  total: number;
  level: number;
  opaque: boolean;

  // for icons displayed in the corner activated by right-click
  secondaryLevel: number;
  secondary?: string | string[];
  secondaryTotal: number;
  secondaryMax: boolean;

  disabled: boolean;

  data?: string;

  cls?: string; // just used for styling the specific items/groups of items
  group?: string; // used for levelling multiple items at once, e.g. summons

  // the corresponding hint setting key for this item
  setting?: string;

  // the category to be used for customising icon styles, e.g. "worlds", "drive", etc.
  category?: string;
  // the IconStyle to exclude for this item. used because some items don't have icons in
  // a particular style despite all others in the category having ones. e.g. STT and 'Classic'
  categoryExclude?: IconStyle;
}

export interface Location extends Item {
  checks: number;
  totalChecks: number;
}

export interface Check extends Item {
  levelsImportant: boolean;
}

interface Options {
  [key: string]: any;
}

const item = (options: Options): Item => ({
  total: 1,
  level: 0,
  opaque: options.level ? true : false,
  secondaryTotal: options.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  ...options,
});

const location = (options: Options): Location => ({
  checks: 0,
  totalChecks: -1,
  ...item(options),
});

const check = (options: Options): Check => ({
  levelsImportant: true,
  ...item(options),
});

const CHEST = "secondary/chest";

const locations = (): Array<{ [key: string]: Location }> => [
  {
    "other/sora's_heart": location({ setting: "Sora's Heart", category: "levels" }),
    "other/drive_forms": location({ category: "drive" }),
    "worlds/hollow_bastion": location({
      data: "demyx",
      secondary: [
        CHEST,
        ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}`),
        "secondary/sephiroth",
      ],
      category: "worlds",
    }),
    "worlds/twilight_town": location({ data: "axel", secondary: CHEST, category: "worlds" }),
  },

  {
    "worlds/land_of_dragons": location({ data: "xigbar", secondary: CHEST, category: "worlds" }),
    "worlds/beast's_castle": location({ data: "xaldin", secondary: CHEST, category: "worlds" }),
    "worlds/olympus_coliseum": location({
      data: "zexion",
      secondary: [
        CHEST,
        ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(
          c => `secondary/cups/${c}`,
        ),
      ],
      category: "worlds",
    }),
    "worlds/space_paranoids": location({ data: "larxene", secondary: CHEST, category: "worlds" }),
  },

  {
    "worlds/halloween_town": location({ data: "vexen", secondary: CHEST, category: "worlds" }),
    "worlds/port_royal": location({ data: "luxord", secondary: CHEST, category: "worlds" }),
    "worlds/agrabah": location({ data: "lexaeus", secondary: CHEST, category: "worlds" }),
    "worlds/pride_lands": location({ data: "saix", secondary: CHEST, category: "worlds" }),
  },

  {
    "worlds/disney_castle": location({
      data: "marluxia",
      secondary: [CHEST, "secondary/lingering_will"],
      category: "worlds",
    }),
    "worlds/100_acre_wood": location({ setting: "100 Acre Wood", category: "worlds" }),
    "worlds/simulated_twilight_town": location({
      data: "roxas",
      setting: "Simulated Twilight Town",
      category: "worlds",
      categoryExclude: IconStyle.CLASSIC,
    }),
    "worlds/the_world_that_never_was": location({
      data: "xemnas",
      secondary: [
        CHEST,
        ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}`),
      ],
      category: "worlds",
    }),
    "worlds/atlantica": location({ setting: "Atlantica", category: "worlds" }),
  },
];

const mapChecks = (keys: Array<string | [string, Options]>, defaults: Check) =>
  Object.fromEntries(
    keys.map(k =>
      // each element is either a string to be used as a key and given the defaults, or an array of
      // the key and options to add to the defaults, e.g. ["final", { category: "Final Form" }]
      !Array.isArray(k) ? [k, { ...defaults }] : [k[0], { ...defaults, ...k[1] }],
    ),
  );

const checks = (): Array<{ [key: string]: Check }> => [
  {
    "other/secret_reports": check({
      total: 13,
      setting: "Secret Ansem Reports",
      category: "reports",
    }),
    "other/torn_page": check({ total: 5, cls: "pages", setting: "Torn Pages" }),
  },

  {
    ...mapChecks(
      ["magic/fire", "magic/blizzard", "magic/thunder"],
      check({ total: 3, category: "magic", secondary: "secondary/duck", cls: "magic" }),
    ),
    ...mapChecks(
      [["magic/cure", { setting: "Cure" }], "magic/reflect", "magic/magnet"],
      check({ total: 3, category: "magic" }),
    ),
  },

  {
    ...mapChecks(
      [
        ["drive/valor", { secondary: "secondary/drive/jump" }],
        ["drive/wisdom", { secondary: "secondary/drive/quick" }],
        ["drive/limit", { secondary: "secondary/drive/dodge" }],
        ["drive/master", { secondary: "secondary/drive/aerial" }],
        ["drive/final", { secondary: "secondary/drive/glide", setting: "Final Form" }],
      ],
      check({
        total: 7,
        secondaryTotal: 3,
        secondaryMax: true,
        cls: "drive",
        levelsImportant: false,
        category: "forms",
      }),
    ),
  },

  {
    ...mapChecks(
      ["summons/chicken_little", "summons/genie", "summons/stitch", "summons/peter_pan"],
      check({ total: 7, group: "summon", category: "summons", levelsImportant: false }),
    ),
  },

  {
    ...mapChecks(
      ["other/second_chance", "other/once_more"],
      check({ setting: "Second Chance & Once More", category: "scom" }),
    ),
    "other/promise_charm": check({ setting: "Promise Charm", category: "charm" }),
    ...mapChecks(
      ["other/proof_of_nonexistence", "other/proof_of_connection", "other/proof_of_tranquility"],
      check({
        secondary: ["bronze", "silver", "gold"].map(i => `secondary/crowns/${i}`),
        category: "proofs",
      }),
    ),
  },
];

export interface Items {
  locations: string[][];
  checks: string[][];
  all: { [key: string]: Item };
}

const items = (): Items => ({
  locations: locations().map(l => Object.keys(l)),
  checks: checks().map(c => Object.keys(c)),
  all: Object.assign({}, ...locations(), ...checks()),
});

export interface Hint {
  report: string;
  location: string;
  checks: number;
  found: boolean;
  incorrectCounter: number;
}

export type Hints = Array<Hint>;

export interface HintSetting {
  items: string[];
  disable: boolean;
  check: boolean;
  value: number;
  enabled: boolean;
  show: boolean;
}

const hintSetting = (options: { items: string[] } & Options): HintSetting => ({
  disable: false,
  enabled: true,
  value: 1,
  check: false,
  show: true,
  ...options,
});

const hintSettings = (): { [key: string]: HintSetting } => ({
  "Promise Charm": hintSetting({ items: ["other/promise_charm"], disable: true, check: true }),
  "Second Chance & Once More": hintSetting({
    items: ["other/second_chance", "other/once_more"],
    check: true,
    value: 2,
  }),
  "Torn Pages": hintSetting({ items: ["other/torn_page"], check: true, value: 5 }),
  "Secret Ansem Reports": hintSetting({
    items: ["other/secret_reports"],
    check: true,
    value: 13,
  }),
  Cure: hintSetting({ items: ["magic/cure"], check: true, value: 3 }),
  "Final Form": hintSetting({ items: ["drive/final"], check: true }),
  "Sora's Heart": hintSetting({ items: ["other/sora's_heart"], disable: true }),
  "Simulated Twilight Town": hintSetting({
    items: ["worlds/simulated_twilight_town"],
    disable: true,
  }),
  "100 Acre Wood": hintSetting({ items: ["worlds/100_acre_wood"], disable: true }),
  Atlantica: hintSetting({ items: ["worlds/atlantica"], show: false }),
});

const mapItems = (key: "locations" | "checks"): { [key: string]: string[] } =>
  Object.fromEntries(
    items()
      [key].flat()
      .map(i => [i, []]),
  );

export const initialState = () => ({
  items: items(),

  foundChecks: { ...mapItems("locations"), Free: [] } as { [key: string]: string[] },
  checkLocations: mapItems("checks"),

  checks: 0,
  totalChecks: 51,

  currentLocation: "",
  selectedLocation: "Free",

  hints: [] as Hints,
  hintsLoaded: false,
  hintSettings: hintSettings(),
  hintMessage: "",
});

export const state = initialState();

export type State = typeof state;
