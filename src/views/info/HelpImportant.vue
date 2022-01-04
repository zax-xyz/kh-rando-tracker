<template lang="pug">
  div
    h3 Activating
    p Click on the 'Important Check Mode' switch near the bottom of the page

    h3 Loading Hints
    p Clicking on the 'Upload Hints' button near the bottom of the page will open a dialog for you to select your hints file. This file should be saved from Jsmartee's #[a(href="https://jsmartee.github.io/kh2fm-hints-demo/") hint website] using the 'Save Hints' button on the right side of the page. If the button turns green, then this means hints have successfully been loaded.

    h3 Marking Checks
    p To mark that you found a check in a world, you can either drag each check directly onto the world icon, or you can select the world first, then click each check that you found there. Marking a check will increment a counter both on the check and the world. Note that the counter on the check is not displayed unless it is above 1. To mark a check from the Garden of Assemblage or a Critical Mode extra, click on the check without selecting a world. It is not displayed as a location as there isn't a good place to show it, but it is still tracked internally.
    p If you mark a report, and hints are loaded, then a popup menu will appear, prompting you to select which report was found. You need to select the correct report for the hint to register. If you select a specific report incorrectly 3 times across any world, the report will be deactivated for the rest of the session. This is the same behaviour as the hint site and other trackers. If hints are not loaded, then getting a report will work the same way as any other check.
    p When a hint gets registered, a number for the total number of important checks will appear next to the corresponding world. E.g. if you have 3 important checks in Hollow Bastion, and you get a hint saying Hollow Bastion has 6 important checks, it will show "3 / 6".
    p Worlds will get lit up when you have found all important checks in that world, if you have the hint for it. If you have pre-selecting worlds disabled (Settings > Important Checks Mode), you can also click on the world yourself to light it up.
    p The tracker won't let you mark more of a certain check than you can get. E.g. you can only mark 3 fires and trying to mark any more than that won't do anything.
    
    h3 Unmarking Checks
    p Clicking on a world while holding the Ctrl key will return the last check found there back to the pool. Conversely, Ctrl+clicking on a check will remove it from the last world you found it in.

    h3 Hint Logic
    p If a world is hinted and the world in which the report was found is also hinted, then the world that was hinted by the hinted world will have a report icon in the bottom left to indicate this. This is because worlds with proofs have to be hinted and their report also hinted. Report icons will also be shown but dimmed if a hinted world had its report in a world that hasn't been hinted but had a proof found there, since worlds with proofs have to be hinted.
    p Report icons are also shown next to drive forms if they were found in a hinted world and torn pages will have a report icon with a number showing the number of pages that were found in hinted worlds.
    p To read more about the logic, check the #[a(href="https://jsmartee.github.io/kh2fm-hints-demo/info.html#logic") official page].

    h3 Levelling Drives/Summons
    p You can increase the level of a drive form or summons by clicking on the form. If you are levelling a form you don't have yet (i.e., through the auto ability), then you should Shift+click it instead. Increasing levels of drives and summons won't increase the total number of checks found. Trying to mark levels past level 7 will reset the level back to 1. Unmarking the check from the world won't affect the marked level and will instead just unhighlight it while keeping the level. Ctrl+clicking on the form/summon itself if it is above level 1 will decrease level rather than unmarking it.

    h3 Additional Icons
    p Some items have icons that appear next to them upon right-click, cycling through these lists:
    DefinitionsList(:definitions="definitions")

    p Additionally, the following worlds have extra icons that appear separate to these in the top right when upon clicking on them while holding the shift key:
    DefinitionsList(:definitions="secondaryDefinitions")

    h3 Middle Click
    p A red cross will be put over the item, for if a world/item is disabled in the seed. If you do this on a location, it will toggle a small popup showing a list of checks found there.

    h3 Manually Changing Check Count
    p If for whatever reason the number of checks found displayed by the tracker is wrong, you can click on the number yourself to increase it, or ctrl+click OR right-click it to decrease it. If there's an issue causing this, please report it! As of the time of writing this, all known issues of this potentially happening have already been dealt with.

    h3 OBS Browser Source
    p Gameaddict has a #[a(href="https://docs.google.com/document/d/1STiVyCUkyx9_ZiEuXBU71gJSisJT4hvagxvqK0VOqU8/edit") guide] on using the tracker as a browser source in OBS if you wish to use it this way. This is not the same as capturing your browser window directly - the tracker is opened in OBS itself.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DefinitionsList from "@/components/menu/DefinitionsList.vue";

@Component({
  components: {
    DefinitionsList,
  },
})
export default class HelpImportant extends Vue {
  definitions: { [key: string]: string } = {
    "Simulated Twilight Town":
      "Defeated the Computer Room, Entered the Pod Room, Defeated Data Roxas",

    "Twilight Town":
      "Cleared the First Visit, Cleared Sandlot Berserkers Fight, Cleared Old Mansion Nobodies Fight, Cleared Betwixt and Between Assassins Fight, Defeated Data Axel",

    "Hollow Bastion":
      "Cleared Bailey Samurai Fight, Activated Ansem’s Study Computer, Cleared Restoration Site Dancers Fight, Defeated Demyx, Cleared 1000 Heartless Fight, Defeated Sephiroth, Defeated Data Demyx",

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

    "Drive Forms": "Growth Ability Counter (High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide)",
    "The Three Proofs": "Obtained Bronze Crown, Silver Crown, Gold Crown",
  };

  secondaryDefinitions: { [key: string]: string } = {
    "Hollow Bastion (for Cavern of Remembrance)":
      "Opened Chests Before First Fight, Opened Chests Before Second Fight, Opened Remaining Chests, Cleared Transport to Remembrance Nobodies Fights",
    "Olympus Coliseum":
      "Cleared Pain and Panic Cup, Cleared Cerberus Cup, Cleared Titan Cup, Cleared Goddess of Fate Cup, Cleared Hades Paradox Cup",
    "Disney Castle": "Lingering Will",
  };
}
</script>
