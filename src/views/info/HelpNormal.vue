<template lang="pug">
div
  h3 Left Click
  p The item will become activated, lighting up to full opacity.
  p When clicking on a world more than once, if applicable, a number will appear in the bottom right indicating how many visits (in KH2, this includes Songs for Atlantica and pages for 100 Acre Wood) have been completed. There are similar systems for drive, magic, summon, Sora levels, etc. The counter for levels increases in increments of +1 from 1-15, +5 from 15-50, and +10 from 50-99.
  p After all visits have been completed, clicking again will either trigger a symbol to appear in the top left, for defeat of the Data Org/Absent Sillhouette fight (KH2 only), or reset the cell back to its original state.

  h3 Right Click
  p Some items have icons that appear next to them upon right-click, cycling through these lists:
  .defintions
    Collapse(v-for="(definitions, game) in gameDefinitions" :name="game" :key="game")
      DefinitionsList(:definitions="definitions")

  h3 Middle Click
  p A red cross will be put over the item, for if a world/item is disabled in the seed. (Items can now be completely removed in rearrange mode.)

  h3 Modifiers
  p Holding ctrl while clicking on an item will go backwards rather than forwards. This works both for left click and right click.
  p Holding shift while left clicking will increase the level without lighting up the item. This is useful in KH2 if you are leveling up a drive form using its auto ability but haven't unlocked the form itself. E.g. leveling up Valor Form through Auto Valor.

  h3 OBS Browser Source
  p Gameaddict has a #[a(href="https://docs.google.com/document/d/1STiVyCUkyx9_ZiEuXBU71gJSisJT4hvagxvqK0VOqU8/edit") guide] on using the tracker as a browser source in OBS if you wish to use it this way. This is not the same as capturing your browser window directly - the tracker is opened in OBS itself.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseTooltip from "@/components/menu/BaseTooltip.vue";
import Collapse from "@/components/menu/Collapse.vue";
import DefinitionsList from "@/components/menu/DefinitionsList.vue";

@Component({
  components: {
    BaseTooltip,
    Collapse,
    DefinitionsList,
  },
})
export default class HelpNormal extends Vue {
  gameDefinitions: { [key: string]: { [key: string]: string } } = {
    KH2: {
      "Simulated Twilight Town":
        "Defeated the Computer Room, Entered the Pod Room, Defeated Data Roxas",

      "Twilight Town":
        "Cleared the First Visit, Cleared Sandlot Berserkers Fight, Cleared Old Mansion Nobodies Fight, Cleared Betwixt and Between Assassins Fight, Defeated Data Axel",

      "Hollow Bastion":
        "Cleared Bailey Samurai Fight, Activated Ansem’s Study Computer, Cleared Restoration Site Dancers Fight, Defeated Demyx, Cleared 1000 Heartless Fight, Defeated Sephiroth, Defeated Data Demyx",

      "Cavern of Remembrance":
        "Opened Chests Before First Fight, Opened Chests Before Second Fight, Opened Remaining Chests, Cleared Transport to Remembrance Nobodies Fights",

      "Land of Dragons":
        "Opened Starting Chests, Cleared Village Cave Fight, Cleared Timed Summit Fight, Defeated Shan Yu, Cleared Antechamber Snipers Fight, Defeated Storm Rider, Defeated Data Xigbar",

      "Beast’s Castle":
        "Opened Starting Chests, Defeated Thresholder and Possessor, Defeated The Beast, Defeated Dark Thorn, Cleared Entrance Hall Dragoon Fight, Defeated Xaldin, Defeated Data Xaldin",

      "Olympus Coliseum":
        "Opened Starting Chests, Defeated Cerberus, Freed Meg at the Lock, Defeated Hydra, Defeated Hades, Defeated Zexion’s Absent Silhouette",

      "Disney Castle/Timeless River":
        "Opened Starting Chests, Cleared Minnie Escort Fights, Defeated Old Pete, Cleared Windows of Time Fights, Defeated Pete, Defeated Marluxia’s Absent Silhouette, Defeated Lingering Will",

      Agrabah:
        "Opened Starting Chests, Cleared Abu Escort Minigame, Cleared Chasm of Challenges Fights, Defeated Volcano and Blizzard Lords, Activated Magic Switches, Defeated Genie Jafar, Defeated Lexaeus’ Absent Silhouette",

      "Port Royal":
        "Opened Starting Chests, Cleared Town Fight, Cleared Isla de Muerta Pirates Fight, Defeated Barbossa, Cleared Seadrift Keep Gamblers Fight, Defeated Grim Reaper, Defeated Data Luxord",

      "Halloween Town":
        "Opened Starting Chests, Cleared Candy Cane Lane Fight, Defeated Prison Keeper, Defeated Oogie Boogie, Cleared Presents Minigame, Defeated The Experiment, Defeated Vexen’s Absent Silhouette",

      "Pride Lands":
        "Opened Starting Chests, Talked to Simba at the Oasis, Defeated Scar, Defeated Groundshaker, Defeated Data Saix",

      "Space Paranoids":
        "Opened Starting Chests, Cleared Dataspace Fight, Defeated Hostile Program, Cleared Solar Sailer Fight, Defeated MCP, Defeated Larxene’s Absent Silhouette",

      "The World That Never Was":
        "Opened Starting Chests, Defeated Roxas, Defeated Xigbar, Defeated Luxord, Defeated Saix, Reached the Door to Kingdom Hearts, Defeated Data Xemnas",

      "100 Acre Wood":
        "Opened Starting Chests, Cleared Blustery Rescue Minigame, Cleared Hunny Slider Minigame, Cleared Balloon Bounce Minigame, Cleared The Expotition Minigame, Cleared Hunny Pot Minigame",

      "Sora's level": "Obtained Second Chance, Once More, Second Chance and Once More",
      "Drive Forms":
        "Growth Ability Counter (High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide)",
      "The Three Proofs": "Obtained Bronze Crown, Silver Crown, Gold Crown",
    },
    KH3: {
      Olympus:
        "Cleared Flame Core Building Fight, Defeated Rock Troll, Defeated Rock Titan, Defeated Ice, Lava and Tornado Titans",

      "Twilight Town": "Defeated Demon Tide, Collected Grand Bistrot Ingredients",

      "Toy Box":
        "Cleared Gigas Ground Floor Fight, Defeated Angelic Amber, Completed the Cactaur, Defeated King of Toys",

      "Kingdom of Corona":
        "Defeated Chaos Carriage, Cleared Night Reapers Fight, Defeated Grim Guardianess ",

      Monstropolis: "Enter the Factory, Enter the Power Plant, Defeated Lump of Horror",

      Arendelle:
        "Defeated Rock Troll, Escaped the Ice Labyrinth, Cleared the Frost Serpents, Defeated Marshmallow, Defeated Skoll",

      Caribbean: "Defeated Lightning Angler, Collected 300 Crabs, Defeated Davey Jones",

      "San Fransokyo":
        "Defeated Metal Troll, Cleared the Flash Tracer Course, Defeated Catastrochorus, Defeated Darkubes, Defeated Dark Baymax",

      "Keyblade Graveyard":
        "Cleared Infinite Heartless Fight, Escaped the Final World, Defeated Demon Tide, Defeated Xigbar, Riku Replica, Marluxia and Larxene, Defeated Terra-Xehanort, Vanitas, Saix and Xion, Reached the Portal to Scala ad Caelum",

      ReMind:
        "Defeated Dark Inferno, Defeated Terra-Xehanort, Cleared the Keyblade Graveyard, Defeated Darkside, Defeated Remind Armoured Xehanort",

      "Sora's Level": "Obtained Second Chance, Once More, Second Chance and Once More",

      "The Three Proofs": "Obtained Bronze Crown, Silver Crown, Gold Crown",
    },
  };
}
</script>
