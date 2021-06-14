import { IconStyle } from "../../settings";
import { item, Items } from "../state";

export const items: Items = {
  "worlds/twilight_town": item({ category: "worlds" }),
  "worlds/agrabah": item({ category: "worlds" }),
  "worlds/beast's_castle": item({ category: "worlds" }),
  "worlds/olympus_coliseum": item({ category: "worlds" }),
  "worlds/halloween_town": item({ category: "worlds" }),
  "worlds/kh1/wonderland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh1/neverland": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/the_world_that_never_was": item({ category: "worlds" }),
};
