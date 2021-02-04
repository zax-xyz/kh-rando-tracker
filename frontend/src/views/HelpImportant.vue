<template lang="pug">
  div
    h3 Activating
    p Click on the 'Important Check Mode' switch near the bottom of the page

    h3 Loading Hints
    p Clicking on the 'Upload Hints' button near the bottom of the page will open a dialog for you to select your hints file. This file should be saved from Jsmartee's #[a(href="https://jsmartee.github.io/kh2fm-hints-demo/") hint website] using the 'Save Hints' button on the right side of the page. If the button turns green, then this means hints have successfully been loaded.

    h3 Marking Checks
    p To mark that you found a check in a world, drag its icon directly onto the world icon. This will increment a counter both on the check and the world. Note that the counter on the check is not displayed unless it is above 1. If a check was from the Garden of Assemblage or a Critical Mode extra, you can click on the check by itself without putting it into a world and that will work just fine.
    p If you mark a report, and hints are loaded, then a popup menu will appear, asking you to select which report was found. You need to select the correct report for the hint to register. If you select a specific report incorrectly 3 times across any world, the report will be deactivated for the rest of the session. This is the same behaviour as the hint site and other trackers. If hints are not loaded, then getting a report will work the same way as any other check.
    p When a hint gets registered, a number for the total number of important checks will appear next to the corresponding world. E.g. if you have 3 important checks in Hollow Bastion, and you get a hint saying Hollow Bastion has 6 important checks, it will show "3 / 6".
    p Worlds will get lit up when you have found all important checks in that world, if you already have the hint for it. You can also click on the world yourself to light it up.
    
    h3 Unmarking Checks
    p If you marked a check wrong, you can click on the world while holding the Ctrl key to return the check back to the pool. You can also Ctrl+click directly on a check, but it won't decrease the counter for the world.

    h3 Hint Logic
    p If a world is hinted and the world in which the report was found is also hinted, then the world that was hinted by the hinted world will have a report icon in the bottom left to indicate this. This is because worlds with proofs have to be hinted and their report also hinted. Report icons will also be shown but dimmed if a hinted world had its report in a world that hasn't been hinted but had a proof found there, since worlds with proofs have to be hinted.
    p Report icons are also shown next to drive forms if they were found in a hinted world and torn pages will have a report icon with a number showing the number of pages that were found in hinted worlds.
    p To read more about the logic, check the #[a(href="https://jsmartee.github.io/kh2fm-hints-demo/info.html#logic") official page].

    h3 Levelling Drives/Summons
    p You can increase the level of a drive form or summons by clicking on the form. If you are levelling a form you don't have yet (i.e., through the auto ability), then you should Shift+click it instead. Increasing levels of drives and summons won't increase the total number of checks found. Unmarking the check from the world won't affect the marked level and will instead just unhighlight it while keeping the level. Ctrl+clicking on the form/summon itself will decrease level unless it is only marked at level 1.

    h3 Datas/AS
    p If a world is lit up, clicking on it again will show the icon for the Data Org or Absent Sillhouette fight, if it has one. Otherwise, or this is already shown, clicking on it again will darken the world, and remove the Data Org icon if it has one. Similar to how levels on checks work, Shift+clicking on a world will show the Data/AS icon without lighting it up.

    h3 Right Click
    p All worlds have a chest icon on the first right click. After that, they cycle through these lists:
    DefinitionsList(:definitions="definitions")

    h3 Middle Click
    p A red cross will be put over the item, for if a world/item is disabled in the seed. Planned future behaviour is for this to show a small popup showing the checks found if done on a world.

    h3 OBS Browser Source
    p Gameaddict has a #[a(href="https://docs.google.com/document/d/1STiVyCUkyx9_ZiEuXBU71gJSisJT4hvagxvqK0VOqU8/edit") guide] on using the tracker as a browser source in OBS if you wish to use it this way. This is not the same as capturing your browser window directly - the tracker is opened in OBS itself.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DefinitionsList from "@/components/DefinitionsList.vue";

@Component({
  components: {
    DefinitionsList,
  },
})
export default class HelpImportant extends Vue {
  definitions: { [key: string]: string } = {
    "Hollow Bastion":
      "All Chests until 1st CoR Fight, All Chests until 2nd CoR Fight, All Remaining CoR Chests, Defeated Sephiroth",
    "Olympus Coliseum":
      "Cleared Pain and Panic Cup, Cerberus Cup, Titan Cup, Goddess of Fate Cup, Hades Paradox Cup",
    "Disney Castle": "Defeated Lingering Will/Terra",
    "The World That Never Was": "Defeated Roxas, Xigbar, Luxord, Saïx, Xemnas",
    "Drive Forms": "Growth Ability Counter (High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide)",
    "The Three Proofs": "Obtained Bronze Crown, Silver Crown, Gold Crown",
  };
}
</script>
