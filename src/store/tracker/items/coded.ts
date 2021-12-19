import { world } from "../factories";
import { Items } from "../state";

export const items: Items = {
  "worlds/kh1/destiny_islands": world(),
  "worlds/kh1/traverse_town": world(),
  "worlds/kh1/wonderland": world(),
  "worlds/kh1/olympus_coliseum": world(),
  "worlds/kh1/agrabah": world({ minimal: "worlds/agrabah" }),
  "worlds/kh1/hollow_bastion": world({ minimal: "worlds/hollow_bastion" }),
  "worlds/other/system_sector": world(),
  "worlds/other/castle_oblivion": world(),
};
