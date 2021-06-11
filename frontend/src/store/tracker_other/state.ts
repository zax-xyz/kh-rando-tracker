import type { Item as BaseItem } from "../types";
import { Game } from "../settings";

export type Item = BaseItem & {
  data?: string[] | string;
  minimal?: string;

  // set in the loop below
  id?: number;
};

const item = (options: Partial<Item>): Item => ({
  total: 1,
  showFirst: false,
  level: 0,
  opaque: options.level ? true : false,
  secondaryTotal: options.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  isMinimal: false,
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

export const items: { [key: string]: { [k: string]: Item } } = {
  [Game.COM]: {
    "worlds/kh1/traverse_town": item({ category: "worlds" }),
    "worlds/kh1/agrabah": item({ category: "worlds", minimal: "worlds/agrabah" }),
    "worlds/kh1/halloween_town": item({ category: "worlds", minimal: "worlds/halloween_town" }),
    "worlds/kh1/monstro": item({ category: "worlds" }),
    "worlds/kh1/wonderland": item({ category: "worlds" }),
    "worlds/kh1/olympus_coliseum": item({ category: "worlds" }),
    "worlds/kh1/atlantica": item({ category: "worlds" }),
    "worlds/kh1/100_acre_wood": item({ category: "worlds", minimal: "worlds/100_acre_wood" }),
    "worlds/kh1/hollow_bastion": item({ category: "worlds", minimal: "worlds/hollow_bastion" }),
    "worlds/kh1/neverland": item({ category: "worlds" }),
    "worlds/twilight_town": item({ category: "worlds" }),
    "worlds/kh1/destiny_islands": item({ category: "worlds" }),
    "worlds/other/castle_oblivion": item({ category: "worlds" }),
  },
  [Game.DAYS]: {
    "worlds/twilight_town": item({ category: "worlds" }),
    "worlds/agrabah": item({ category: "worlds" }),
    "worlds/beast's_castle": item({ category: "worlds" }),
    "worlds/olympus_coliseum": item({ category: "worlds" }),
    "worlds/halloween_town": item({ category: "worlds" }),
    "worlds/kh1/wonderland": item({ category: "worlds" }),
    "worlds/kh1/neverland": item({ category: "worlds" }),
    "worlds/the_world_that_never_was": item({ category: "worlds" }),
  },
  [Game.BBS]: {
    "worlds/bbs/land_of_departure": item({ category: "worlds" }),
    "worlds/bbs/enchanted_dominion": item({ category: "worlds" }),
    "worlds/bbs/dwarf_woodlands": item({ category: "worlds" }),
    "worlds/bbs/castle_of_dreams": item({ category: "worlds" }),
    "worlds/bbs/mysterious_tower": item({ category: "worlds" }),
    "worlds/bbs/radiant_garden": item({ category: "worlds", minimal: "worlds/hollow_bastion" }),
    "worlds/bbs/disney_town": item({ category: "worlds", minimal: "worlds/disney_castle" }),
    "worlds/bbs/olympus_coliseum": item({
      category: "worlds",
      minimal: "worlds/kh1/olympus_coliseum",
    }),
    "worlds/bbs/deep_space": item({ category: "worlds" }),
    "worlds/bbs/neverland": item({ category: "worlds" }),
    "worlds/bbs/keyblade_graveyard": item({ category: "worlds" }),
    "worlds/bbs/mirage_arena": item({ category: "worlds" }),
    "worlds/bbs/dark_world": item({ category: "worlds" }),
  },
  [Game.CODED]: {
    "worlds/kh1/destiny_islands": item({ category: "worlds" }),
    "worlds/kh1/traverse_town": item({ category: "worlds" }),
    "worlds/kh1/wonderland": item({ category: "worlds" }),
    "worlds/kh1/olympus_coliseum": item({ category: "worlds" }),
    "worlds/kh1/agrabah": item({ category: "worlds", minimal: "worlds/agrabah" }),
    "worlds/kh1/hollow_bastion": item({ category: "worlds", minimal: "worlds/hollow_bastion" }),
    "worlds/other/system_sector": item({ category: "worlds" }),
    "worlds/other/castle_oblivion": item({ category: "worlds" }),
  },
  [Game.BBS]: {
    "worlds/ddd/traverse_town": item({ category: "worlds" }),
    "worlds/ddd/la_cité_des_cloches": item({ category: "worlds" }),
    "worlds/ddd/the_grid": item({ category: "worlds" }),
    "worlds/ddd/prankster's_paradise": item({ category: "worlds" }),
    "worlds/ddd/country_of_the_musketeers": item({ category: "worlds" }),
    "worlds/ddd/symphony_of_sorcery": item({ category: "worlds" }),
    "worlds/ddd/the_world_that_never_was": item({
      category: "worlds",
      minimal: "worlds/the_world_that_never_was",
    }),
  },
  [Game.KH3]: {
    "worlds/kh3/olympus": item({ category: "worlds", minimal: "worlds/kh1/olympus_coliseum" }),
    "worlds/kh3/twilight_town": item({ category: "worlds", minimal: "worlds/twilight_town" }),
    "worlds/kh3/toy_box": item({ category: "worlds" }),
    "worlds/kh3/kingdom_of_corona": item({ category: "worlds" }),
    "worlds/kh3/monstropolis": item({ category: "worlds" }),
    "worlds/kh3/arendelle": item({ category: "worlds" }),
    "worlds/kh3/caribbean": item({ category: "worlds" }),
    "worlds/kh3/san_fransokyo": item({ category: "worlds" }),
    "worlds/kh3/dark_world": item({ category: "worlds" }),
    "worlds/kh3/final_world": item({ category: "worlds" }),
    "worlds/kh3/keyblade_graveyard": item({ category: "worlds" }),
    "worlds/kh3/scala_ad_caelum": item({ category: "worlds" }),
    "worlds/kh3/100_acre_wood": item({ category: "worlds", minimal: "worlds/100_acre_wood" }),
    "worlds/replica_data": item({ category: "worlds" }),
    "other/sora's_level": item({ category: "levels" }),
    ...mapItems(
      ["fire", "blizzard", "thunder", "cure", "aero", "water"].map(i => `magic/${i}`),
      item({ total: 3, category: "magic", cls: "magic" }),
    ),
    ...mapItems(
      [
        "summons/meow_wow",
        "summons/ralph",
        ["summons/pride", { minimal: "summons/simba" }],
        "summons/ariel",
        "summons/ohana",
      ],
      item({ category: "summons" }),
    ),
    "other/data_reports": item({ category: "reports" }),
  },
};

for (const game of Object.values(items)) {
  for (const [i, item] of Object.values(game).entries()) {
    item.id = i;
  }
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
