const CROWNS = ["bronze", "silver", "gold"].map(i => `secondary/crowns/${i}`);

interface Item {
  total?: number;
  data?: string;
  secondary?: string|string[];
  cls?: string;
  group?: string;

  // set in the loop below
  id?: number;
  level?: number;
  opaque?: boolean;
  disabled?: boolean;
  secondaryLevel?: number;

  showData?: boolean;
}

export const items: { [key: string]: Item } = {
  // Worlds
  "worlds/simulated_twilight_town": { data: "roxas" },
  "worlds/twilight_town": { total: 3, data: "axel" },
  "worlds/hollow_bastion": {
    total: 2,
    data: "demyx",
    secondary: "secondary/sephiroth"
  },
  "worlds/cavern_of_remembrance": {
    secondary: ["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}`)
  },
  "worlds/land_of_dragons": { total: 2, data: "xigbar" },
  "worlds/beast's_castle": { total: 2, data: "xaldin" },
  "worlds/olympus_coliseum": {
    total: 2,
    data: "zexion",
    secondary: ["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}`)
  },
  "worlds/disney_castle": {
    data: "marluxia",
    secondary: "secondary/lingering_will"
  },
  "worlds/timeless_river": {},
  "worlds/port_royal": { total: 2, data: "luxord" },
  "worlds/agrabah": { total: 2, data: "lexaeus" },
  "worlds/halloween_town": { total: 2, data: "vexen" },
  "worlds/pride_land": { total: 2, data: "saix" },
  "worlds/space_paranoids": { total: 2, data: "larxene" },
  "worlds/the_world_that_never_was": {
    data: "xemnas",
    secondary: ["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}`)
  },
  "worlds/atlantica": { total: 6, data: "larxene", cls: "atlantica" },
  "worlds/100_acre_wood": {
    total: 6,
    secondary: ["page", "page2", "page3", "page4", "page5"].map(p => `secondary/pages/${p}`),
    cls: "hundred_acre"
  },
  "worlds/underdrome_cups": { total: 5 },
  "worlds/replica_data": { total: 13 },

  // Level
  "other/sora's_level": {
    total: 27,
    level: 1,
    secondary: ["second_chance", "once_more", "survival_abilities"].map(i => `abilities/${i}`)
  },

  // Drives
  "drive/valor": {
    total: 7,
    secondary: ["jump", "jump2", "jump3", "jump4"].map(i => `secondary/drive/${i}`),
    cls: "drive"
  },
  "drive/wisdom": {
    total: 7,
    secondary: ["quick", "quick2", "quick3", "quick4"].map(i => `secondary/drive/${i}`),
    cls: "drive"
  },
  "drive/limit": {
    total: 7,
    secondary: ["dodge", "dodge2", "dodge3", "dodge4"].map(i => `secondary/drive/${i}`),
    cls: "drive"
  },
  "drive/master": {
    total: 7,
    secondary: ["aerial", "aerial2", "aerial3", "aerial4"].map(i => `secondary/drive/${i}`),
    cls: "drive"
  },
  "drive/final": {
    total: 7,
    secondary: ["glide", "glide2", "glide3", "glide4"].map(i => `secondary/drive/${i}`),
    cls: "drive"
  },

  // Magic
  "magic/fire": { total: 3 },
  "magic/blizzard": { total: 3 },
  "magic/thunder": { total: 3 },
  "magic/cure": { total: 3 },
  "magic/reflect": { total: 3 },
  "magic/magnet": { total: 3 },

  // Summons
  "summons/chicken_little": { total: 7, group: "summon" },
  "summons/genie": { total: 7, group: "summon" },
  "summons/stitch": { total: 7, group: "summon" },
  "summons/peter_pan": { total: 7, group: "summon" },

  // Other
  "other/secret_reports": { total: 13 },
  "other/promise_charm": {},
  "other/proof_of_nonexistence": { secondary: CROWNS },
  "other/proof_of_connection": { secondary: CROWNS },
  "other/proof_of_tranquility": { secondary: CROWNS },
};

for (const [i, item] of Object.values(items).entries()) {
  item.id = i;
  item.total = item.total ?? 1;
  item.level = item.level ?? 0;
  item.opaque = Boolean(item.level);
  item.disabled = false;
  if (item.secondary) item.secondaryLevel = 0;
}

export const state = {
  clients: {
    "": JSON.parse(JSON.stringify(items)) // Shitty deep copy
  }
};

export type State = {
  clients: {
    [key: string]: typeof items;
  };
};

[
  ...[...Array(27).keys()].map(i => `numbers/${i + 1}.png`),
  "numbers/max.png",
  ...[...Array(5).keys()].map(i => `secondary/page${i ? i + 1 : ""}.png`),
  ...[...Array(4).keys()].map(i => `secondary/drive/jump${i ? i + 1 : ""}.png`),
  ...[...Array(4).keys()].map(i => `secondary/drive/quick${i ? i + 1 : ""}.png`),
  ...[...Array(4).keys()].map(i => `secondary/drive/dodge${i ? i + 1 : ""}.png`),
  ...[...Array(4).keys()].map(i => `secondary/drive/aerial${i ? i + 1 : ""}.png`),
  ...[...Array(4).keys()].map(i => `secondary/drive/glide${i ? i + 1 : ""}.png`),
  ...["bronze", "silver", "gold"].map(c => `secondary/crowns/${c}.png`),
  ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}.png`),
  ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}.png`),
  ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}.png`),
  "secondary/lingering_will.png",
  "secondary/sephiroth.png",
  "secondary/triangle.png"
].forEach(src => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `img/${src}`;
});
