import { world } from "../factories";
import { Items } from "../state";

export const items: Items = {
  "worlds/twilight_town": world({ categoryExclude: undefined }),
  "worlds/agrabah": world({ categoryExclude: undefined }),
  "worlds/beast's_castle": world({ categoryExclude: undefined }),
  "worlds/kh1/olympus_coliseum": world(),
  "worlds/halloween_town": world({ categoryExclude: undefined }),
  "worlds/kh1/wonderland": world(),
  "worlds/kh1/neverland": world(),
  "worlds/the_world_that_never_was": world({ categoryExclude: undefined }),
};
