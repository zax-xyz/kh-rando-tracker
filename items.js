{
  items: {
    // Worlds
    "Roxas World": { file: "worlds/roxas world", data: true },
    "Twilight Town": { file: "worlds/twilight town", total: 3, data: true, },
    "Hollow Bastion": { file: "worlds/hollow bastion", total: 3, data: true, secondary: "fenrir", },
    "Land of Dragons": { file: "worlds/land of dragons", total: 2, data: true, },
    "Olympus Coliseum": { file: "worlds/olympus coliseum", total: 2, data: true, },
    "Beast's Castle": { file: "worlds/beast's castle", total: 2, data: true, },
    "Port Royal": { file: "worlds/port royal", total: 2, data: true, },
    "Agrabah": { file: "worlds/agrabah", total: 2, data: true, },
    "Halloween Town": { file: "worlds/halloween town", total: 2, data: true, },
    "Pride Lands": { file: "worlds/pride lands", total: 2, data: true, },
    "Disney Castle": { file: "worlds/disney castle", data: true, secondary: "terra", },
    "Space Paranoids": { file: "worlds/space paranoids", total: 2, },
    "The World That Never Was": { file: "worlds/the world that never was", data: true, secondary: [ "roxas", "xigbar", "luxord", "saix" ] },
    "Atlantica": { file: "worlds/atlantica", total: 5, data: true, },
    "100 Acre Wood": { file: "worlds/100 acre wood", total: 6, },

    // Drives
    "Valor Form": { file: "drive/valor", total: 7, secondary: "triangle", secondaryClass: "drive", },
    "Wisdom Form": { file: "drive/wisdom", total: 7, secondary: "triangle", secondaryClass: "drive", },
    "Limit Form": { file: "drive/limit", total: 7, secondary: "triangle", secondaryClass: "drive", },
    "Master Form": { file: "drive/master", total: 7, secondary: "triangle", secondaryClass: "drive", },
    "Final Form": { file: "drive/final", total: 7, secondary: "triangle", secondaryClass: "drive", },

    // Magic
    "Fire": { file: "magic/fire", total: 3, },
    "Blizzard": { file: "magic/blizzard", total: 3, },
    "Thunder": { file: "magic/thunder", total: 3, },
    "Cure": { file: "magic/cure", total: 3, },
    "Reflect": { file: "magic/reflect", total: 3, },
    "Magnet": { file: "magic/magnet", total: 3, },

    // Summons
    "Baseball Charm (Chicken Little)": { file: "charms/baseball", total: 7, group: "summon", },
    "Lamp Charm (Genie)": { file: "charms/lamp", total: 7, group: "summon", },
    "Ukelele Charm (Stitch)": { file: "charms/ukelele", total: 7, group: "summon", },
    "Feather Charm (Peter Pan)": { file: "charms/feather", total: 7, group: "summon", },

    // Cup
    "Cup Tournaments": { file: "cup", total: 4, },

    // Proofs/promise charm
    "Promise Charm": { file: "proofs_promise/promise", },
    "Proof of Nonexistence": { file: "proofs_promise/non-existent", },
    "Proof of Connection": { file: "proofs_promise/connections", },
    "Proof of Tranquility": { file: "proofs_promise/tranquil", },
  },

  preloadImages: [
    ...[ ...Array(7).keys() ].map((i) => `numbers/${i + 1}.png`),
    ...[ "roxas", "xigbar", "luxord", "saix" ].map((org) => `secondary/${org}.png`),
  ],
}
