import { IconStyle } from "../../settings";
import { item, Items } from "../state";

export const items: Items = {
  "worlds/kh1/traverse_town": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/agrabah": item({
    category: "worlds",
    minimal: "worlds/agrabah",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/halloween_town": item({
    category: "worlds",
    minimal: "worlds/halloween_town",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/monstro": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/wonderland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/olympus_coliseum": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/atlantica": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/100_acre_wood": item({
    category: "worlds",
    minimal: "worlds/100_acre_wood",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/hollow_bastion": item({
    category: "worlds",
    minimal: "worlds/hollow_bastion",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/neverland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/twilight_town": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/destiny_islands": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/other/castle_oblivion": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
};
