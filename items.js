{
  items: {
    // Worlds
    "worlds/roxas world": { data: true },
    "worlds/twilight_town": { total: 3, data: true, },
    "worlds/hollow_bastion": { total: 3, data: true, secondary: "fenrir", },
    "worlds/land_of_dragons": { total: 2, data: true, },
    "worlds/olympus_coliseum": { total: 2, data: true, },
    "worlds/beast's_castle": { total: 2, data: true, },
    "worlds/port_royal": { total: 2, data: true, },
    "worlds/agrabah": { total: 2, data: true, },
    "worlds/halloween_town": { total: 2, data: true, },
    "worlds/pride_lands": { total: 2, data: true, },
    "worlds/disney_castle": { data: true, secondary: "terra", },
    "worlds/space_paranoids": { total: 2, },
    "worlds/the_world_that_never_was": { data: true, secondary: [ "roxas", "xigbar", "luxord", "saix" ] },
    "worlds/atlantica": { total: 5, data: true, },
    "worlds/100_acre_wood": { total: 6, },

    // Drives
    "drive/valor": { total: 7, secondary: "triangle", secondaryClass: "drive", },
    "drive/wisdom": { total: 7, secondary: "triangle", secondaryClass: "drive", },
    "drive/limit": { total: 7, secondary: "triangle", secondaryClass: "drive", },
    "drive/master": { total: 7, secondary: "triangle", secondaryClass: "drive", },
    "drive/final": { total: 7, secondary: "triangle", secondaryClass: "drive", },

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

    // Cup
    "cup": { total: 4, },

    // Proofs/promise charm
    "proofs_promise/promise": {},
    "proofs_promise/non-existent": {},
    "proofs_promise/connections": {},
    "proofs_promise/tranquil": {},
  },

  preloadImages: [
    ...[ ...Array(7).keys() ].map((i) => `numbers/${i + 1}.png`),
    ...[ "roxas", "xigbar", "luxord", "saix" ].map((org) => `secondary/${org}.png`),
  ],
}
