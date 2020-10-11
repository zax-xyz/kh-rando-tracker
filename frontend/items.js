{
  items: {
    // Worlds
    "worlds/simulated_twilight_town": { data: "roxas" },
    "worlds/twilight_town": { total: 3, data: "axel", secondary: "secondary/chest" },
    "worlds/hollow_bastion": { total: 3, data: "demyx", secondary: ["secondary/chest", "secondary/sephiroth"] },
    "worlds/cavern_of_remembrance": { secondary: [ "depths", "mining", "engine", "transport" ].map(i => `secondary/cor/${i}`) },
    "worlds/land_of_dragons": { total: 2, data: "xigbar", secondary: "secondary/chest" },
    "worlds/beast's_castle": { total: 2, data: "xaldin", secondary: "secondary/chest" },
    "worlds/olympus_coliseum": { total: 2, data: "zexion", secondary: ["secondary/chest", ...[ "pain_panic", "cerberus", "titan", "goddess", "paradox" ].map(c => `secondary/cups/${c}`)] },
    "worlds/disney_castle": { data: "marluxia", secondary: ["secondary/chest", "secondary/lingering_will"] },
    "worlds/timeless_river": { secondary: "secondary/chest" },
    "worlds/port_royal": { total: 2, data: "luxord", secondary: "secondary/chest" },
    "worlds/agrabah": { total: 2, data: "lexaeus", secondary: "secondary/chest" },
    "worlds/halloween_town": { total: 2, data: "vexen", secondary: "secondary/chest" },
    "worlds/pride_land": { total: 2, data: "saix", secondary: "secondary/chest" },
    "worlds/space_paranoids": { total: 2, data: "larxene", secondary: "secondary/chest" },
    "worlds/the_world_that_never_was": { data: "xemnas", secondary: ["secondary/chest", ...[ "roxas", "xigbar", "luxord", "saix", "kingdom_hearts" ].map(i => `nobody/${i}`)] },
    "worlds/atlantica": { total: 6, data: "larxene", cls: "atlantica", },
    "worlds/100_acre_wood": { total: 6, secondary: [ "page", "page2", "page3", "page4", "page5" ].map(p => `secondary/pages/${p}`), cls: "hundred_acre", },
    "worlds/underdrome_cups": { total: 5, },
    "worlds/replica_data": { total: 13, },

    // Level
    "other/sora's_level": { total: 27, secondary: [ "second_chance", "once_more", "survival_abilities" ].map(i => `secondary/abilities/${i}`), cls: "drive", },

    // Drives
    "drive/valor": { total: 7, secondary: [ "jump", "jump2", "jump3", "jump4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/wisdom": { total: 7, secondary: [ "quick", "quick2", "quick3", "quick4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/limit": { total: 7, secondary: [ "dodge", "dodge2", "dodge3", "dodge4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/master": { total: 7, secondary: [ "aerial", "aerial2", "aerial3", "aerial4" ].map(i => `secondary/drive/${i}`), cls: "drive", },
    "drive/final": { total: 7, secondary: [ "glide", "glide2", "glide3", "glide4" ].map(i => `secondary/drive/${i}`), cls: "drive", },

    // Magic
    "magic/fire": { total: 3, },
    "magic/blizzard": { total: 3, },
    "magic/thunder": { total: 3, },
    "magic/cure": { total: 3, },
    "magic/reflect": { total: 3, },
    "magic/magnet": { total: 3, },

    // Summons
    "summons/chicken_little": { total: 7, group: "summon", },
    "summons/genie": { total: 7, group: "summon", },
    "summons/stitch": { total: 7, group: "summon", },
    "summons/peter_pan": { total: 7, group: "summon", },

    // Other
    "other/secret_reports": { total: 13, },
    "other/promise_charm": {},
    "other/proof_of_nonexistence": { secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
    "other/proof_of_connection": { secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
    "other/proof_of_tranquility": { secondary: [ "bronze", "silver", "gold" ].map(i => `secondary/crowns/${i}`) },
  },

  preloadImages: [
    ...[ ...Array(26).keys() ].map(i => `numbers/${i + 2}.png`),
    "numbers/max.png",
    ...[ ...Array(4).keys() ].map(i => `secondary/page${i + 2}.png`),

    "secondary/drive/jump.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/jump${i}.png`),

    "secondary/drive/quick.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/quick${i}.png`),

    "secondary/drive/dodge.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/dodge${i}.png`),

    "secondary/drive/aerial.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/aerial${i}.png`),

    "secondary/drive/glide.png",
    ...[ ...Array(3).keys() ].map(i => `secondary/drive/glide${i}.png`),

    ...[ "second_chance", "once_more", "survival_abilities" ].map(c => `secondary/abilities/${c}.png`),
    ...[ "bronze", "silver", "gold" ].map(c => `secondary/crowns/${c}.png`),
    ...[ "pain_panic", "cerberus", "titan", "goddess", "paradox" ].map(c => `secondary/cups/${c}.png`),
    ...[ "roxas", "xigbar", "luxord", "saix", "kingdom_hearts" ].map(i => `nobody/${i}.png`),
    ...[ "depths", "mining", "engine", "transport" ].map(i => `secondary/cor/${i}.png`),
    "lingering_will.png",
    "sephiroth.png",
    "triangle.png",
  ],
}
