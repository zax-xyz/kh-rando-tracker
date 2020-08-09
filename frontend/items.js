{
  items: {
    // Worlds
    "worlds/simulated_twilight_town": { data: roxas },
    "worlds/twilight_town": { total: 3, data: axel, },
    "worlds/hollow_bastion": { total: 3, data: demyx, secondary: "sephiroth", },
    "worlds/land_of_dragons": { total: 2, data: xigbar, },
    "worlds/beast's_castle": { total: 2, data: xaldin, },
    "worlds/olympus_coliseum": { total: 2, data: zexion, secondary: [ "pain_panic", "cerberus", "titan", "goddess", "paradox" ] },
    "worlds/disney_castle": { data: marluxia, secondary: "lingering_will", },
    "worlds/timeless_river": {},
    "worlds/port_royal": { total: 2, data: luxord, },
    "worlds/agrabah": { total: 2, data: lexaeus, },
    "worlds/halloween_town": { total: 2, data: vexen, },
    "worlds/pride_land": { total: 2, data: saix, },
    "worlds/space_paranoids": { total: 2, },
    "worlds/the_world_that_never_was": { data: xemnas, secondary: [ "XIII", "II", "X", "VII", "kingdom_hearts" ] },
    "worlds/cavern_of_remembrance": { secondary: [ "depths", "mining", "engine", "transport" ] },
    "worlds/atlantica": { total: 6, data: larxene, cls: "atlantica", },
    "worlds/100_acre_wood": { total: 6, secondary: [ "page", "page2", "page3", "page4", "page5" ], secondaryClass: "drive", cls: "hundred_acre", },
    "worlds/underdrome_cups": { total: 5, },
    "worlds/replica_data": { total: 13, },

    // Sora's Level
    "sora's_level": { total: 27, },

    // Drive Forms
    "drive/valor": { total: 7, secondary: [ "jump", "jump2", "jump3", "jump4" ], secondaryClass: "drive", },
    "drive/wisdom": { total: 7, secondary: [ "quick", "quick2", "quick3", "quick4" ], secondaryClass: "drive", },
    "drive/limit": { total: 7, secondary: [ "dodge", "dodge2", "dodge3", "dodge4" ], secondaryClass: "drive", },
    "drive/master": { total: 7, secondary: [ "aerial", "aerial2", "aerial3", "aerial4" ], secondaryClass: "drive", },
    "drive/final": { total: 7, secondary: [ "glide", "glide2", "glide3", "glide4" ], secondaryClass: "drive", },

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
    "secret_reports": { total: 13, },
    "promise_charm": {},
    "proof_of_nonexistence": { secondary: [ "bronze", "silver", "gold" ] },
    "proof_of_connection": { secondary: [ "bronze", "silver", "gold" ] },
    "proof_of_tranquility": { secondary: [ "bronze", "silver", "gold" ] },
  },

  preloadImages: [
    ...[ ...Array(7).keys() ].map((i) => `numbers/${i + 1}.png`),
    ...[ "page", "jump", "quick", "dodge", "aerial", "glide" ].map((org) => `secondary/${org}.png`),
  ],
}
