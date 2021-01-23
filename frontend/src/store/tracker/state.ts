import { IconStyle } from "../settings";

const CROWNS = ["bronze", "silver", "gold"].map(i => `secondary/crowns/${i}`);
const CHEST = "secondary/chest";
const DONALD = "secondary/duck";

interface Item {
  total?: number;
  data?: string;
  secondary?: string | string[];
  secondaryTotal?: number;
  secondaryMax?: boolean;
  cls?: string;
  group?: string;

  category?: string;
  categoryExclude?: IconStyle;

  // set in the loop below
  id?: number;
  level?: number;
  opaque?: boolean;
  disabled?: boolean;
  secondaryLevel?: number;
}

export const items: { [key: string]: Item } = {
  // Worlds
  "worlds/simulated_twilight_town": {
    data: "roxas",
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  },
  "worlds/twilight_town": { total: 3, data: "axel", secondary: CHEST, category: "worlds" },
  "worlds/hollow_bastion": {
    total: 2,
    data: "demyx",
    secondary: [CHEST, "secondary/sephiroth"],
    category: "worlds",
  },
  "worlds/cavern_of_remembrance": {
    secondary: ["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}`),
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  },
  "worlds/land_of_dragons": { total: 2, data: "xigbar", secondary: CHEST, category: "worlds" },
  "worlds/beast's_castle": { total: 2, data: "xaldin", secondary: CHEST, category: "worlds" },
  "worlds/olympus_coliseum": {
    total: 2,
    data: "zexion",
    secondary: [
      CHEST,
      ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}`),
    ],
    category: "worlds",
  },
  "worlds/disney_castle": {
    data: "marluxia",
    secondary: [CHEST, "secondary/lingering_will"],
    category: "worlds",
  },
  "worlds/timeless_river": {
    secondary: CHEST,
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
  },
  "worlds/port_royal": { total: 2, data: "luxord", secondary: CHEST, category: "worlds" },
  "worlds/agrabah": { total: 2, data: "lexaeus", secondary: CHEST, category: "worlds" },
  "worlds/halloween_town": { total: 2, data: "vexen", secondary: CHEST, category: "worlds" },
  "worlds/pride_lands": { total: 2, data: "saix", secondary: CHEST, category: "worlds" },
  "worlds/space_paranoids": { total: 2, data: "larxene", secondary: CHEST, category: "worlds" },
  "worlds/the_world_that_never_was": {
    data: "xemnas",
    secondary: [
      CHEST,
      ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}`),
    ],
    category: "worlds",
  },
  "worlds/atlantica": { total: 6, data: "larxene", cls: "atlantica", category: "worlds" },
  "worlds/100_acre_wood": {
    total: 6,
    secondary: "secondary/page",
    secondaryTotal: 5,
    cls: "hundred_acre",
    category: "worlds",
  },
  "worlds/underdrome_cups": { total: 5, category: "cups" },
  "worlds/replica_data": { total: 13, category: "data" },

  // Level
  "other/sora's_level": {
    total: 27,
    level: 1,
    secondary: ["second_chance", "once_more", "survival_abilities"].map(
      i => `secondary/abilities/${i}`
    ),
    cls: "levels",
    category: "levels",
  },

  // Drives
  "drive/valor": {
    total: 7,
    secondary: "secondary/drive/jump",
    secondaryTotal: 3,
    secondaryMax: true,
    cls: "drive",
    category: "forms",
  },
  "drive/wisdom": {
    total: 7,
    secondary: "secondary/drive/quick",
    secondaryTotal: 3,
    secondaryMax: true,
    cls: "drive",
    category: "forms",
  },
  "drive/limit": {
    total: 7,
    secondary: "secondary/drive/dodge",
    secondaryTotal: 3,
    secondaryMax: true,
    cls: "drive",
    category: "forms",
  },
  "drive/master": {
    total: 7,
    secondary: "secondary/drive/aerial",
    secondaryTotal: 3,
    secondaryMax: true,
    cls: "drive",
    category: "forms",
  },
  "drive/final": {
    total: 7,
    secondary: "secondary/drive/glide",
    secondaryTotal: 3,
    secondaryMax: true,
    cls: "drive",
    category: "forms",
  },

  // Magic
  "magic/fire": { total: 3, secondary: DONALD, cls: "magic", category: "magic" },
  "magic/blizzard": { total: 3, secondary: DONALD, cls: "magic", category: "magic" },
  "magic/thunder": { total: 3, secondary: DONALD, cls: "magic", category: "magic" },
  "magic/cure": { total: 3, secondary: DONALD, cls: "magic", category: "magic" },
  "magic/reflect": { total: 3, category: "magic" },
  "magic/magnet": { total: 3, category: "magic" },

  // Summons
  "summons/chicken_little": { total: 7, group: "summon", category: "summons" },
  "summons/genie": { total: 7, group: "summon", category: "summons" },
  "summons/stitch": { total: 7, group: "summon", category: "summons" },
  "summons/peter_pan": { total: 7, group: "summon", category: "summons" },

  // Other
  "other/secret_reports": { total: 13, category: "reports" },
  "other/promise_charm": { category: "charm" },
  "other/proof_of_nonexistence": { secondary: CROWNS, category: "proofs" },
  "other/proof_of_connection": { secondary: CROWNS, category: "proofs" },
  "other/proof_of_tranquility": { secondary: CROWNS, category: "proofs" },
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
    "": JSON.parse(JSON.stringify(items)), // Shitty deep copy
  },
};

export type State = {
  clients: {
    [key: string]: typeof items;
  };
};

[
  ...[...Array(27).keys()].map(i => `numbers/${i + 1}.png`),
  "numbers/max.png",
  "secondary/page.png",
  ...["jump", "quick", "dodge", "aerial", "glide"].map(g => `secondary/drive/${g}.png`),
  ...["bronze", "silver", "gold"].map(c => `secondary/crowns/${c}.png`),
  ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}.png`),
  ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}.png`),
  ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}.png`),
  "secondary/lingering_will.png",
  "secondary/sephiroth.png",
  "secondary/triangle.png",
  "secondary/chest.png",
].forEach(src => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `img/${src}`;
});
