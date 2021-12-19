import { world } from "../factories";
import { Items } from "../state";

export const items: Items = {
  "worlds/kh1/traverse_town": world(),
  "worlds/kh1/agrabah": world({ minimal: "worlds/agrabah" }),
  "worlds/kh1/halloween_town": world({ minimal: "worlds/halloween_town" }),
  "worlds/kh1/monstro": world(),
  "worlds/kh1/wonderland": world(),
  "worlds/kh1/olympus_coliseum": world(),
  "worlds/kh1/atlantica": world(),
  "worlds/kh1/100_acre_wood": world({ minimal: "worlds/100_acre_wood" }),
  "worlds/kh1/hollow_bastion": world({ minimal: "worlds/hollow_bastion" }),
  "worlds/kh1/neverland": world(),
  "worlds/twilight_town": world(),
  "worlds/kh1/destiny_islands": world(),
  "worlds/other/castle_oblivion": world(),
};
