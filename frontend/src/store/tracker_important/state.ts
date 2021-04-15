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
  other?: string | string[];
  otherLevel: number;
}

export interface Check extends Item {
  levelsImportant: boolean;
}

const item = (options: Partial<Item>): Item => ({
  total: 1,
  level: 0,
  opaque: options.level ? true : false,
  secondaryTotal: options.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  ...options,
});

const location = (options: Partial<Item> & Pick<Location, "other">): Location => ({
  checks: 0,
  totalChecks: -1,
  otherLevel: 0,
  ...item(options),
});

const check = (options: Partial<Check>): Check => ({
  levelsImportant: true,
  ...item(options),
});

const CHEST = "other/chest";

const locations = (): Array<{ [key: string]: Location }> => [
  {
    "other/sora's_heart": location({ setting: "Sora's Heart", category: "levels" }),
    "other/drive_form": location({ category: "drive" }),
    "worlds/hollow_bastion": location({
      secondary: [
        CHEST,
        ...[
          "bailey",
          "ansem's_study",
          "dancers",
          "demyx_story",
          "1000_heartless",
          "sephiroth",
          "demyx",
        ].map(i => `hollow_bastion/${i}`),
      ],
      other: ["depths", "mining_area", "engine_chamber", "transport"].map(
        i => `cavern_of_remembrance/${i}`,
      ),
      category: "worlds",
    }),
    "worlds/twilight_town": location({
      secondary: ["mysterious_tower", "berserkers", "mickey", "betwixt_and_between", "axel"].map(
        i => `twilight_town/${i}`,
      ),
      category: "worlds",
    }),
  },

  {
    "worlds/land_of_dragons": location({
      secondary: [
        CHEST,
        ...["village_cave", "summit", "shan_yu", "snipers", "storm_rider", "xigbar"].map(
          i => `land_of_dragons/${i}`,
        ),
      ],
      category: "worlds",
    }),
    "worlds/beast's_castle": location({
      secondary: [
        CHEST,
        ...["thresholder", "beast", "dark_thorn", "dragoons", "xaldin_story", "xaldin"].map(
          i => `beast's_castle/${i}`,
        ),
      ],
      category: "worlds",
    }),
    "worlds/olympus_coliseum": location({
      secondary: [
        CHEST,
        ...["cerberus", "the_lock", "hydra", "hades", "zexion"].map(c => `olympus_coliseum/${c}`),
      ],
      other: ["pain_panic_cup", "cerberus_cup", "titan_cup", "goddess_cup", "hades_cup"].map(
        c => `olympus_coliseum/${c}`,
      ),
      category: "worlds",
    }),
    "worlds/space_paranoids": location({
      secondary: [
        CHEST,
        ...[
          "dataspace",
          "hostile_program",
          "solar_sailer",
          "master_control_program",
          "larxene",
        ].map(i => `space_paranoids/${i}`),
      ],
      category: "worlds",
    }),
  },

  {
    "worlds/halloween_town": location({
      secondary: [
        CHEST,
        ...[
          "candy_cane_lane",
          "prison_keeper",
          "oogie_boogie",
          "presents",
          "experiment",
          "vexen",
        ].map(i => `halloween_town/${i}`),
      ],
      category: "worlds",
    }),
    "worlds/port_royal": location({
      secondary: [
        CHEST,
        ...["town", "isla_de_muerta", "barbossa", "gamblers", "grim_reaper", "luxord"].map(
          i => `port_royal/${i}`,
        ),
      ],
      category: "worlds",
    }),
    "worlds/agrabah": location({
      secondary: [
        CHEST,
        ...[
          "abu",
          "chasm_of_challenges",
          "elemental_lords",
          "magic_switches",
          "jafar",
          "lexaeus",
        ].map(i => `agrabah/${i}`),
      ],
      category: "worlds",
    }),
    "worlds/pride_lands": location({
      secondary: [CHEST, ...["oasis", "scar", "groundshaker", "saix"].map(i => `pride_lands/${i}`)],
      category: "worlds",
    }),
  },

  {
    "worlds/disney_castle": location({
      secondary: [
        CHEST,
        "disney_castle/minnie",
        ...["old_pete", "windows_of_time", "pete"].map(i => `timeless_river/${i}`),
        "disney_castle/marluxia",
      ],
      other: "disney_castle/lingering_will",
      category: "worlds",
    }),
    "worlds/100_acre_wood": location({
      secondary: [
        CHEST,
        ...["blustery_rescue", "hunny_slider", "balloon_bounce", "expotition", "hunny_pot"].map(
          i => `100_acre_wood/${i}`,
        ),
      ],
      setting: "100 Acre Wood",
      category: "worlds",
    }),
    "worlds/simulated_twilight_town": location({
      secondary: ["computer_room", "pod_room", "roxas"].map(i => `simulated_twilight_town/${i}`),
      setting: "Simulated Twilight Town",
      category: "worlds",
      categoryExclude: IconStyle.CLASSIC,
    }),
    "worlds/the_world_that_never_was": location({
      secondary: [
        CHEST,
        ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts", "xemnas"].map(
          i => `the_world_that_never_was/${i}`,
        ),
      ],
      category: "worlds",
    }),
    "worlds/atlantica": location({ setting: "Atlantica", category: "worlds" }),
  },
];

const mapChecks = (keys: Array<string | [string, Partial<Check>]>, defaults: Check) =>
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
    "other/torn_pages": check({ total: 5, cls: "pages", setting: "Torn Pages", category: "pages" }),
  },

  {
    ...mapChecks(
      ["magic/fire", "magic/blizzard", "magic/thunder"],
      check({ total: 3, category: "magic", secondary: "other/duck", cls: "magic" }),
    ),
    ...mapChecks(
      [["magic/cure", { setting: "Cure" }], "magic/reflect", "magic/magnet"],
      check({ total: 3, category: "magic" }),
    ),
  },

  {
    ...mapChecks(
      [
        ["drive/valor", { secondary: "other/high_jump" }],
        ["drive/wisdom", { secondary: "other/quick_run" }],
        ["drive/limit", { secondary: "other/dodge_roll" }],
        ["drive/master", { secondary: "other/aerial_dodge" }],
        ["drive/final", { secondary: "other/glide", setting: "Final Form" }],
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
        secondary: ["bronze", "silver", "gold"].map(i => `other/${i}`),
        category: "proofs",
        cls: "proof",
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

const hintSetting = (options: { items: string[] } & Partial<HintSetting>): HintSetting => ({
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
