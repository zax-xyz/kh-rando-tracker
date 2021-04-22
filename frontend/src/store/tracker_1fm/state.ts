import { IconStyle } from "../settings";
import type { Item as BaseItem } from "../types";

const CHEST = "other/chest";

export type Item = BaseItem & {
  data?: string[] | string;
  minimal?: string;

  // set in the loop below
  id?: number;
};

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

const mapItems = (keys: Array<string | [string, Partial<Item>]>, defaults: Item) =>
  Object.fromEntries(
    keys.map(k =>
      // each element is either a string to be used as a key and given the defaults, or an array of
      // the key and options to add to the defaults, e.g. ["final", { category: "Final Form" }]
      !Array.isArray(k) ? [k, { ...defaults }] : [k[0], { ...defaults, ...k[1] }],
    ),
  );

export const items: { [key: string]: Item } = {
  // Worlds
  "worlds/kh1/destiny_islands": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/traverse_town": item({
    total: 4,
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/wonderland": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/olympus_coliseum": item({
    data: ["ice_titan", "sephiroth"],
    minimal: "worlds/olympus_coliseum",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/deep_jungle": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/agrabah": item({
    minimal: "worlds/agrabah",
    data: "kurt_zisa",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/monstro": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/halloween_town": item({
    minimal: "worlds/halloween_town",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/atlantica": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/neverland": item({
    data: "neverland/phantom",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/hollow_bastion": item({
    data: "xemnas",
    secondary: ["riku", "maleficent", "riku_ansem", "behemoth"].map(i => `hollow_bastion/${i}`),
    minimal: "worlds/hollow_bastion",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/end_of_the_world": item({
    secondary: ["behemoth", "chernabog", "final_rest"].map(i => `end_of_the_world/${i}`),
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/100_acre_wood": item({
    total: 6,
    minimal: "worlds/100_acre_wood",
    secondary: "100_acre_wood/torn_pages",
    secondaryTotal: 5,
    cls: "hundred_acre",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/olympus_cups": item({
    total: 4,
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),

  // Level
  "other/sora's_level": item({
    total: 27,
    level: 1,
    numbers: [
      ...[...Array(15).keys()].map(i => i + 1),
      ...[...Array(6).keys()].map(i => 20 + i * 5),
      ...[...Array(6).keys()].map(i => 50 + i * 10),
    ],
    secondary: ["other/once_more", "other/second_chance", "other/survival_abilities"],
    cls: "levels",
    category: "levels",
  }),

  // Magic
  ...mapItems(
    ["magic/fire", "magic/blizzard", "magic/thunder", "magic/cure"],
    item({ total: 3, category: "magic", secondary: "other/duck", cls: "magic" }),
  ),
  ...mapItems(["magic/aero", "magic/gravity", "magic/stop"], item({ total: 3, category: "magic" })),

  // Summons
  ...mapItems(
    [
      "summons/simba",
      "summons/genie_kh1",
      "summons/bambi",
      "summons/dumbo",
      "summons/tinkerbell",
      "summons/mushu",
    ],
    item({ category: "summons" }),
  ),

  // Other
  "other/ansem's_reports": item({ total: 13, category: "reports" }),
};

for (const [i, item] of Object.values(items).entries()) {
  item.id = i;
}

export type State = {
  clients: {
    [key: string]: typeof items;
  };
};

export const state: State = {
  clients: {
    self: JSON.parse(JSON.stringify(items)), // Shitty deep copy
  },
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
