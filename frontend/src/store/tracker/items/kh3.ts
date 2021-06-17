import { IconStyle } from "../../settings";
import { item, Items, mapItems } from "../state";

export const items: Items = {
  "worlds/kh3/olympus": item({
    category: "worlds",
    minimal: "worlds/kh1/olympus_coliseum",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh3/twilight_town": item({
    category: "worlds",
    minimal: "worlds/twilight_town",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/kh3/toy_box": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/kingdom_of_corona": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/monstropolis": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/arendelle": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/caribbean": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/san_fransokyo": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/dark_world": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/final_world": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/keyblade_graveyard": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/scala_ad_caelum": item({ category: "worlds", categoryExclude: IconStyle.CLASSIC }),
  "worlds/kh3/100_acre_wood": item({
    category: "worlds",
    minimal: "worlds/100_acre_wood",
    categoryExclude: IconStyle.CLASSIC,
  }),
  "worlds/replica_data": item({ total: 13, category: "data" }),
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
  ...mapItems(
    ["fire", "blizzard", "thunder", "cure", "aero", "water"].map(i => `magic/${i}`),
    item({ total: 3, category: "magic", cls: "magic" }),
  ),
  ...mapItems(
    [
      "summons/meow_wow",
      "summons/ralph",
      ["summons/pride", { minimal: "summons/simba" }],
      "summons/ariel",
      "summons/ohana",
    ],
    item({ category: "summons" }),
  ),
  "other/data_reports": item({ total: 13, category: "reports" }),
};

// preload all the number images we use
for (let i = 0; i <= 3; i++) {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `/img/progression/${i + 1}.webp`;
}
