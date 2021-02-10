import { IconStyle } from "../settings";

const CHEST = "secondary/chest";

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

  // the category to be used for customising icon styles, e.g. "worlds", "drive", etc.
  category?: string;
  // the IconStyle to exclude for this item. used because some items don't have icons in
  // a particular style despite all others in the category having ones. e.g. STT and 'Classic'
  categoryExclude?: IconStyle;

  // set in the loop below
  id?: number;
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

const mapItems = (keys: Array<string | [string, Options]>, defaults: Item) =>
  Object.fromEntries(
    keys.map(k =>
      // each element is either a string to be used as a key and given the defaults, or an array of
      // the key and options to add to the defaults, e.g. ["final", { category: "Final Form" }]
      !Array.isArray(k) ? [k, { ...defaults }] : [k[0], { ...defaults, ...k[1] }],
    ),
  );

export const items: { [key: string]: Item } = {
  // Worlds
  "worlds/simulated_twilight_town": item({
    data: "roxas",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/twilight_town": item({ total: 3, data: "axel", secondary: CHEST, category: "worlds" }),
  "worlds/hollow_bastion": item({
    total: 2,
    data: "demyx",
    secondary: [CHEST, "secondary/sephiroth"],
    category: "worlds",
  }),
  "worlds/cavern_of_remembrance": item({
    secondary: ["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}`),
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/land_of_dragons": item({
    total: 2,
    data: "xigbar",
    secondary: CHEST,
    category: "worlds",
  }),
  "worlds/beast's_castle": item({ total: 2, data: "xaldin", secondary: CHEST, category: "worlds" }),
  "worlds/olympus_coliseum": item({
    total: 2,
    data: "zexion",
    secondary: [
      CHEST,
      ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}`),
    ],
    category: "worlds",
  }),
  "worlds/disney_castle": item({
    data: "marluxia",
    secondary: [CHEST, "secondary/lingering_will"],
    category: "worlds",
  }),
  "worlds/timeless_river": item({
    secondary: CHEST,
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/port_royal": item({ total: 2, data: "luxord", secondary: CHEST, category: "worlds" }),
  "worlds/agrabah": item({ total: 2, data: "lexaeus", secondary: CHEST, category: "worlds" }),
  "worlds/halloween_town": item({ total: 2, data: "vexen", secondary: CHEST, category: "worlds" }),
  "worlds/pride_lands": item({ total: 2, data: "saix", secondary: CHEST, category: "worlds" }),
  "worlds/space_paranoids": item({
    total: 2,
    data: "larxene",
    secondary: CHEST,
    category: "worlds",
  }),
  "worlds/the_world_that_never_was": item({
    data: "xemnas",
    secondary: [
      CHEST,
      ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}`),
    ],
    category: "worlds",
  }),
  "worlds/atlantica": item({ total: 6, data: "larxene", cls: "atlantica", category: "worlds" }),
  "worlds/100_acre_wood": item({
    total: 6,
    secondary: "secondary/page",
    secondaryTotal: 5,
    cls: "hundred_acre",
    category: "worlds",
  }),
  "worlds/underdrome_cups": item({ total: 5, category: "cups" }),
  "worlds/replica_data": item({ total: 13, category: "data" }),

  // Level
  "other/sora's_level": item({
    total: 27,
    level: 1,
    secondary: ["second_chance", "once_more", "survival_abilities"].map(
      i => `secondary/abilities/${i}`,
    ),
    cls: "levels",
    category: "levels",
  }),

  // Drives
  ...mapItems(
    [
      ["drive/valor", { secondary: "secondary/drive/jump" }],
      ["drive/wisdom", { secondary: "secondary/drive/quick" }],
      ["drive/limit", { secondary: "secondary/drive/dodge" }],
      ["drive/master", { secondary: "secondary/drive/aerial" }],
      ["drive/final", { secondary: "secondary/drive/glide" }],
    ],
    item({
      total: 7,
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      category: "forms",
    }),
  ),

  // Magic
  ...mapItems(
    ["magic/fire", "magic/blizzard", "magic/thunder"],
    item({ total: 3, category: "magic", secondary: "secondary/duck", cls: "magic" }),
  ),
  ...mapItems(
    ["magic/cure", "magic/reflect", "magic/magnet"],
    item({ total: 3, category: "magic" }),
  ),

  // Summons
  ...mapItems(
    ["summons/chicken_little", "summons/genie", "summons/stitch", "summons/peter_pan"],
    item({ total: 7, group: "summon", category: "summons" }),
  ),

  // Other
  "other/secret_reports": item({ total: 13, category: "reports" }),
  "other/promise_charm": item({ category: "charm" }),
  ...mapItems(
    ["other/proof_of_nonexistence", "other/proof_of_connection", "other/proof_of_tranquility"],
    item({
      secondary: ["bronze", "silver", "gold"].map(i => `secondary/crowns/${i}`),
      category: "proofs",
    }),
  ),
};

for (const [i, item] of Object.values(items).entries()) {
  item.id = i;
}

export const state = {
  clients: {
    self: JSON.parse(JSON.stringify(items)), // Shitty deep copy
  },
};

export type State = {
  clients: {
    [key: string]: typeof items;
  };
};

[
  ...[...Array(27).keys()].map(i => `numbers/${i + 1}.png`),
  "numbers/max.png",
  "secondary/page.png",
  ...["jump", "quick", "dodge", "aerial", "glide"].map(g => `secondary/drive/${g}.png`),
  ...["bronze", "silver", "gold"].map(c => `secondary/crowns/${c}.png`),
  ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}.png`),
  ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}.png`),
  ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}.png`),
  "secondary/lingering_will.png",
  "secondary/sephiroth.png",
  "secondary/triangle.png",
  "secondary/chest.png",
].forEach(src => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `img/${src}`;
});
