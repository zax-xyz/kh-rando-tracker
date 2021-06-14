import { IconStyle } from "../../settings";
import { item, Items } from "../state";

export const items: Items = {
  "worlds/bbs/land_of_departure": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/enchanted_dominion": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/dwarf_woodlands": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/castle_of_dreams": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/mysterious_tower": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/radiant_garden": item({
    category: "worlds",
    minimal: "worlds/hollow_bastion",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/bbs/disney_town": item({
    category: "worlds",
    minimal: "worlds/disney_castle",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/bbs/olympus_coliseum": item({
    category: "worlds",
    minimal: "worlds/kh1/olympus_coliseum",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/bbs/deep_space": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/neverland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/keyblade_graveyard": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/mirage_arena": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/bbs/dark_world": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
};
