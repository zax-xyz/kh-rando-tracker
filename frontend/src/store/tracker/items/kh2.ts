import { IconStyle } from "../../settings";
import { CHEST, item, Items, mapItems } from "../state";

export const items: Items = {
  // Worlds
  "worlds/simulated_twilight_town": item({
    data: "roxas",
    secondary: ["twilight_thorn", "struggle", "computer_room", "pod_room"].map(
      i => `simulated_twilight_town/${i}`,
    ),
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/twilight_town": item({
    total: 3,
    data: "axel",
    secondary: ["mysterious_tower", "berserkers", "mickey", "betwixt_and_between"].map(
      i => `twilight_town/${i}`,
    ),
    category: "worlds",
  }),
  "worlds/hollow_bastion": item({
    total: 2,
    data: "demyx",
    secondary: [
      CHEST,
      ...["bailey", "ansem's_study", "dancers", "demyx_story", "1000_heartless", "sephiroth"].map(
        i => `hollow_bastion/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/cavern_of_remembrance": item({
    secondary: ["depths", "mining_area", "engine_chamber", "transport"].map(
      i => `cavern_of_remembrance/${i}`,
    ),
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/land_of_dragons": item({
    total: 2,
    data: "xigbar",
    secondary: [
      CHEST,
      ...["village_cave", "summit", "shan_yu", "snipers", "storm_rider"].map(
        i => `land_of_dragons/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/beast's_castle": item({
    total: 2,
    data: "xaldin",
    secondary: [
      CHEST,
      ...["thresholder", "beast", "dark_thorn", "dragoons", "xaldin_story"].map(
        i => `beast's_castle/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/olympus_coliseum": item({
    total: 2,
    data: "zexion",
    secondary: [
      CHEST,
      ...[
        "cerberus",
        "the_lock",
        "hydra",
        "hades",
        "pain_panic_cup",
        "cerberus_cup",
        "titan_cup",
        "goddess_cup",
        "hades_cup",
      ].map(c => `olympus_coliseum/${c}`),
    ],
    category: "worlds",
  }),
  "worlds/disney_castle": item({
    data: "marluxia",
    secondary: [CHEST, ...["minnie", "lingering_will"].map(i => `disney_castle/${i}`)],
    category: "worlds",
  }),
  "worlds/timeless_river": item({
    secondary: [CHEST, ...["old_pete", "windows_of_time", "pete"].map(i => `timeless_river/${i}`)],
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/port_royal": item({
    total: 2,
    data: "luxord",
    secondary: [
      CHEST,
      ...["town", "isla_de_muerta", "barbossa", "gamblers", "grim_reaper"].map(
        i => `port_royal/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/agrabah": item({
    total: 2,
    data: "lexaeus",
    secondary: [
      CHEST,
      ...["abu", "chasm_of_challenges", "elemental_lords", "magic_switches", "jafar"].map(
        i => `agrabah/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/halloween_town": item({
    total: 2,
    data: "vexen",
    secondary: [
      CHEST,
      ...["candy_cane_lane", "prison_keeper", "oogie_boogie", "presents", "experiment"].map(
        i => `halloween_town/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/pride_lands": item({
    total: 2,
    data: "saix",
    secondary: [CHEST, ...["oasis", "scar", "groundshaker"].map(i => `pride_lands/${i}`)],
    category: "worlds",
  }),
  "worlds/space_paranoids": item({
    total: 2,
    data: "larxene",
    secondary: [
      CHEST,
      ...["dataspace", "hostile_program", "solar_sailer", "master_control_program"].map(
        i => `space_paranoids/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/the_world_that_never_was": item({
    data: "xemnas",
    secondary: [
      CHEST,
      ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(
        i => `the_world_that_never_was/${i}`,
      ),
    ],
    category: "worlds",
  }),
  "worlds/atlantica": item({ total: 6, cls: "atlantica", category: "worlds" }),
  "worlds/100_acre_wood": item({
    total: 6,
    secondary: "100_acre_wood/torn_pages",
    secondaryTotal: 5,
    cls: "hundred_acre",
    category: "worlds",
  }),
  "worlds/underdrome_cups": item({
    total: 5,
    secondary: ["pain_panic_cup", "cerberus_cup", "titan_cup", "goddess_cup", "hades_cup"].map(
      c => `olympus_coliseum/${c}`,
    ),
    category: "cups",
  }),
  "worlds/replica_data": item({ total: 13, category: "data" }),

  // Level
  "other/sora's_level": item({
    total: 27,
    showFirst: true,
    level: 1,
    numbers: [
      ...[...Array(15).keys()].map(i => i + 1),
      ...[...Array(6).keys()].map(i => 20 + i * 5),
      ...[...Array(5).keys()].map(i => 50 + i * 10),
      99,
    ],
    secondary: ["other/once_more", "other/second_chance", "other/survival_abilities"],
    cls: "levels",
    category: "levels",
  }),

  // Drives
  ...mapItems(
    [
      ["drive/valor", { secondary: "other/high_jump" }],
      ["drive/wisdom", { secondary: "other/quick_run" }],
      ["drive/limit", { secondary: "other/dodge_roll" }],
      ["drive/master", { secondary: "other/aerial_dodge" }],
      ["drive/final", { secondary: "other/glide" }],
    ],
    item({
      total: 7,
      secondaryTotal: 3,
      secondaryMax: true,
      cls: "drive",
      category: "forms",
    }),
  ),

  // Magic
  ...mapItems(
    ["magic/fire", "magic/blizzard", "magic/thunder"],
    item({ total: 3, category: "magic", secondary: "other/duck", cls: "magic" }),
  ),
  ...mapItems(
    ["magic/cure", "magic/reflect", "magic/magnet"],
    item({ total: 3, category: "magic" }),
  ),

  // Summons
  ...mapItems(
    ["summons/chicken_little", "summons/genie", "summons/stitch", "summons/peter_pan"],
    item({ total: 7, group: "summon", category: "summons" }),
  ),

  // Other
  "other/secret_reports": item({ total: 13, category: "reports" }),
  "other/promise_charm": item({ category: "charm" }),
  ...mapItems(
    ["other/proof_of_nonexistence", "other/proof_of_connection", "other/proof_of_tranquility"],
    item({
      secondary: ["bronze", "silver", "gold"].map(i => `other/${i}`),
      category: "proofs",
    }),
  ),
};
