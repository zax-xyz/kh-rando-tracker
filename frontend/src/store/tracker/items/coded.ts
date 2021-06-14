import { IconStyle } from "../../settings";
import { item, Items } from "../state";

export const items: Items = {
  "worlds/kh1/destiny_islands": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/traverse_town": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/wonderland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/olympus_coliseum": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/agrabah": item({
    category: "worlds",
    minimal: "worlds/agrabah",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh1/hollow_bastion": item({
    category: "worlds",
    minimal: "worlds/hollow_bastion",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/other/system_sector": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/other/castle_oblivion": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
};
