import { IconStyle } from "../../settings";
import { item, levelNumbers, levels, magic, world } from "../factories";
import { Item, Items, mapItems } from "../state";
import { preloadNums } from "../util";

export const items: Items = {
  // Worlds
  "worlds/kh1/destiny_islands": world({
    secondary: ["day_one", "day_two", "darkside"].map(i => `kh1/destiny_islands/${i}`),
  }),
  "worlds/kh1/traverse_town": world({
    total: 4,
    secondary: ["leon", "guard_armor", "opposite_armor", "cid"].map(i => `kh1/traverse_town/${i}`),
  }),
  "worlds/kh1/wonderland": world({
    secondary: ["presents", "card_soldiers", "trickmaster"].map(i => `kh1/wonderland/${i}`),
  }),
  "worlds/kh1/olympus_coliseum": world({
    data: ["ice_titan", "sephiroth"],
    secondary: [
      "barrels",
      "cerberus",
      "phil_cup",
      "pegasus_cup",
      "hercules_cup",
      "hades_cup",
      "ice_titan",
      "sephiroth",
    ].map(i => `kh1/olympus_coliseum/${i}`),
  }),
  "worlds/kh1/deep_jungle": world({
    secondary: ["sabor", "black_fruit", "clayton"].map(i => `kh1/deep_jungle/${i}`),
  }),
  "worlds/kh1/agrabah": world({
    minimal: "worlds/agrabah",
    data: "kurt_zisa",
    secondary: ["pot_centipede", "cave_of_wonders", "jafar", "kurt_zisa"].map(
      i => `kh1/agrabah/${i}`,
    ),
  }),
  "worlds/kh1/monstro": world({
    secondary: ["pinocchio_cage", "parasite_cage"].map(i => `kh1/monstro/${i}`),
  }),
  "worlds/kh1/halloween_town": world({
    minimal: "worlds/halloween_town",
    secondary: ["tombstones", "masked_children", "oogie_boogie", "oogie's_manor"].map(
      i => `kh1/halloween_town/${i}`,
    ),
  }),
  "worlds/kh1/atlantica": world({
    secondary: ["shark", "ursula", "giant_ursula"].map(i => `kh1/atlantica/${i}`),
  }),
  "worlds/kh1/neverland": world({
    data: "phantom",
    secondary: ["anti_sora", "captain_hook", "phantom"].map(i => `kh1/neverland/${i}`),
  }),
  "worlds/kh1/hollow_bastion": world({
    total: 2,
    data: "xemnas",
    secondary: ["riku", "maleficent", "dragon_maleficent", "riku_ansem", "behemoth"].map(
      i => `kh1/hollow_bastion/${i}`,
    ),
    minimal: "worlds/hollow_bastion",
  }),
  "worlds/kh1/end_of_the_world": world({
    secondary: ["behemoth", "chernabog", "final_rest"].map(i => `kh1/end_of_the_world/${i}`),
  }),
  "worlds/kh1/100_acre_wood": world({
    total: 6,
    minimal: "worlds/100_acre_wood",
    secondary: "100_acre_wood/torn_pages",
    secondaryTotal: 5,
    cls: "hundred_acre",
  }),
  "worlds/kh1/olympus_cups": world({
    total: 4,
    secondary: [
      "hades_seed_40",
      "hades_seed_20",
      "hades_seed_10",
      "hades_seed_1",
      "hades_solo",
      "hades_timed",
      "hades_complete",
    ].map(i => `kh1/olympus_coliseum/${i}`),
    cls: "cups",
  }),

  // Level
  "other/sora's_level": levels({ numbers: levelNumbers.slice(0, -1).concat([100]) }),

  // Magic
  ...mapItems(
    [
      ...["fire", "blizzard", "thunder", "cure"].map((i): [string, Partial<Item>] => [
        `magic/${i}`,
        { secondary: "other/duck" },
      ]),
      ...["aero", "gravity", "stop"].map((i): [string, Partial<Item>] => [
        `magic/${i}`,
        { categoryExclude: IconStyle.CLASSIC },
      ]),
    ],
    magic({
      popupTitle: "Select Spell Replaced",
      popupItems: ["fire", "blizzard", "thunder", "cure", "aero", "gravity", "stop"].map(
        i => `magic/${i}`,
      ),
    }),
  ),

  // Summons
  ...mapItems(
    [
      ["summons/simba", { secondary: ["kh1/summons/earthshine"] }],
      ["summons/genie_kh1", { minimal: "summons/genie" }],
      ["summons/bambi", { secondary: ["kh1/summons/naturespark"] }],
      ["summons/dumbo", { secondary: ["kh1/summons/watergleam"] }],
      "summons/tinkerbell",
      ["summons/mushu", { secondary: ["kh1/summons/fireglow"] }],
    ],
    item({ category: "summons" }),
  ),

  "other/postcards": item({
    total: 10,
    category: "postcards",
  }),

  "other/dalmatians": item({
    total: 33,
    showFirst: true,
    numbers: [...Array(33).keys()].map(i => (i + 1) * 3),
    secondary: "kh1/wonderland/presents",
    secondaryTotal: 11,
    secondaryAuto: [12, 21, 30, 42, 51, 60, 72, 81, 90, 99].map(i => i / 3),
    cls: "dalmations",
    category: "dalmatians",
  }),

  ...mapItems(
    [
      ["trinities/blue", { total: 17 }],
      ["trinities/red", { total: 6 }],
      ["trinities/green", { total: 9 }],
      ["trinities/yellow", { total: 4 }],
      ["trinities/white", { total: 10 }],
    ],
    item({ category: "trinities" }),
  ),

  // Other
  "other/ansem's_reports": item({
    total: 13,
    minimal: "other/secret_reports",
    category: "reports",
  }),

  "other/raft_supplies": item({
    total: 8,
    category: "raftSupplies",
    dontShow: "expandRaftSupplies",
  }),
  "other/logs": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/cloth": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/rope": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/seagull_egg": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/mushrooms": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/coconuts": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/fish": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/drinking_water": item({
    category: "raftSupplies",
    show: "expandRaftSupplies",
  }),
  "other/jack_in_the_box": item({
    category: "jackInTheBox",
  }),
  "other/crystal_trident": item({
    category: "crystalTrident",
  }),
  "other/library_books": item({
    total: 2,
    category: "libraryBooks",
  }),
  // "other/navi_pieces": item({
  //   total: 2,
  //   category: "navi",
  // }),
  "other/emblem_pieces": item({
    total: 4,
    category: "emblem_pieces",
  }),
  "other/navi_gummi": item({
    category: "navi",
  }),
};

preloadNums(items);
