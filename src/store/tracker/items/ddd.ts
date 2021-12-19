import { world } from "../factories";
import { Items } from "../state";

export const items: Items = {
  "worlds/ddd/traverse_town": world(),
  "worlds/ddd/la_cité_des_cloches": world(),
  "worlds/ddd/the_grid": world(),
  "worlds/ddd/prankster's_paradise": world(),
  "worlds/ddd/country_of_the_musketeers": world(),
  "worlds/ddd/symphony_of_sorcery": world(),
  "worlds/ddd/the_world_that_never_was": world({ minimal: "worlds/the_world_that_never_was" }),
};
