<template lang="pug">
  div
    h3 Left Click
    p The item will become activated, lighting up to full opacity.
    p When clicking on a world more than once, if applicable, a number will appear in the bottom right indicating how many visits have been completed. There are similar systems for drive, magic, summon, and Sora levels.
      BaseTooltip 'Visits' for Atlantica/100 Acre Wood represent not whole world completion but segment completion. That is, song completion for Atlantica (including the tutorial), and pages for 100 Acre Wood.
      BaseTooltip The counter for Sora's Level will increase in increments of +1 from LV1-15, then +5 from LV15-50 and +10 from LV50-99.
    p After all visits have been completed, clicking again will either trigger a symbol to appear in the top left, for defeat of the Data Org/Absent Sillhouette fight, or reset the cell back to its original state.

    h3 Right Click
    p All worlds have a chest icon on the first right click. After that, they cycle through these lists:
    DefinitionsList(:definitions="definitions")

    h3 Middle Click
    p A red cross will be put over the item, for if a world/item is disabled in the seed. (Items can now be completely removed in rearrange mode.)

    h3 Modifiers
    p Holding ctrl while clicking on an item will go backwards rather than forwards. This works both for left click and right click.
    p Holding shift while left clicking will increase the level without lighting up the item. This is useful if you are leveling up a drive form using its auto ability but haven't unlocked the form itself. E.g. leveling up Valor Form through Auto Valor.

    h3 OBS Browser Source
    p Gameaddict has a <a href="https://docs.google.com/document/d/1STiVyCUkyx9_ZiEuXBU71gJSisJT4hvagxvqK0VOqU8/edit">guide</a> on using the tracker as a browser source in OBS if you wish to use it this way. This is not the same as capturing your browser window directly - the tracker is opened in OBS itself.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseTooltip from "@/components/BaseTooltip.vue";
import DefinitionsList from "@/components/DefinitionsList.vue";

@Component({
  components: {
    BaseTooltip,
    DefinitionsList,
  },
})
export default class HelpNormal extends Vue {
  definitions: { [key: string]: string } = {
    "Hollow Bastion": "Defeated Sephiroth",
    "Cavern of Remembrance":
      "All Chests until 1st Fight, All Chests until 2nd Fight, All Remaining Chests, Cleared Nobody Fights",
    "Olympus Coliseum":
      "Cleared Pain and Panic Cup, Cerberus Cup, Titan Cup, Goddess of Fate Cup, Hades Paradox Cup",
    "Disney Castle": "Defeated Lingering Will/Terra",
    "The World That Never Was": "Defeated Roxas, Xigbar, Luxord, Saïx, Xemnas",
    "100 Acre Wood": "Torn Page Counter",
    "Sora's level": "Obtained Second Chance, Once More, Second Chance and Once More",
    "Drive Forms": "Growth Ability Counter (High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide)",
    "The Three Proofs": "Obtained Bronze Crown, Silver Crown, Gold Crown",
  };
}
</script>
