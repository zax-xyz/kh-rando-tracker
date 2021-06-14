import { IconStyle } from "../../settings";
import { item, Items } from "../state";

export const items: Items = {
  "worlds/ddd/traverse_town": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/ddd/la_cité_des_cloches": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/ddd/the_grid": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/ddd/prankster's_paradise": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/ddd/country_of_the_musketeers": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/ddd/symphony_of_sorcery": item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/ddd/the_world_that_never_was": item({
    category: "worlds",
    minimal: "worlds/the_world_that_never_was",
    categoryExclude: IconStyle.CLASSIC,
  }),
};
