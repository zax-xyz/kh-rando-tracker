import { world, item, levels, wayfinder } from "../factories";
import { Items } from "../state";

export const items: Items = {
  "worlds/bbs/land_of_departure": world(),
  "worlds/bbs/enchanted_dominion": world(),
  "worlds/bbs/dwarf_woodlands": world(),
  "worlds/bbs/castle_of_dreams": world(),
  "worlds/bbs/mysterious_tower": world(),
  "worlds/bbs/radiant_garden": world({ minimal: "worlds/hollow_bastion" }),
  "worlds/bbs/disney_town": world({ minimal: "worlds/disney_castle" }),
  "worlds/bbs/olympus_coliseum": world({ minimal: "worlds/kh1/olympus_coliseum" }),
  "worlds/bbs/deep_space": world(),
  "worlds/bbs/neverland": world(),
  "worlds/bbs/keyblade_graveyard": world(),
  "worlds/bbs/mirage_arena": world(),
  "worlds/bbs/dark_world": world(),
  "other/bbs/puzzle": item({ total: 20, category: "puzzle" }),
  "other/sora's_level": levels(),
  "other/secret_reports": item({ total: 13, category: "reports" }),
  "other/bbs/terra's_wayfinder": wayfinder(),
  "other/bbs/ventus's_wayfinder": wayfinder(),
  "other/bbs/aqua's_wayfinder": wayfinder(),
};
