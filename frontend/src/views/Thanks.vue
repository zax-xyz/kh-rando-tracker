<template lang="pug">
  div
    .content
      Collapse(name="Televo")
        p #[b Links]: #[a(href="https://www.artstation.com/liamjohnsondesign") Art Portfolio]
        p #[b Email]: #[a(href="mailto:ltaylorjohnson@aapt.net.au") ltaylorjohnson@aapt.net.au]
        p #[b Discord]: Televo #[span.light #9400]

        p Designed/edited many images for the tracker. Namely:
        ul
          li General world icon redesigns
          li Magic
          li Drive forms
          li Summons
          li Abilities (SC + OM)
          li Proofs and crown icons
          li Sora's level
          li Cups
          li Data org
          li Simulated Twilight Town
          li Cavern of Remembrance
          li Numbers
          li Growth abilities
          li Cavern of Remembrance progress
          li Olympus Colisum progress (cups)
          li Data/AS icons for worlds after visits
          li TWTNW progress
          li Sephiroth and Lingering Will
        p He was also the one to add Cavern of Remembrance, Timeless River, growth abilities, torn pages, Data Org, levels, reports, a new promise charm icon, minimal icons, and a new background to the tracker.

      Collapse(name="RedBuddha")
        p #[b Links]: #[a(href="https://twitter.com/Red__Buddha") Twitter], #[a(href="https://twitch.tv/redbuddha") Twitch], #[a(href="https://github.com/TrevorLuckey") GitHub]
        p #[b Discord]: RedBuddha#[span.light #2146]

        p Created the original important checks tracker, with a broadcast view similar to the view of this tracker, and drap-and-drop behaviour that this was inspired by.

      Collapse(name="equations19")
        p #[b Links]: #[a(href="https://twitch.tv/equations19") Twitch], #[a(href="https://github.com/paulblessing") GitHub]
        p #[b Discord]: equations19#[span.light #6017]

        p Created another #[a(href="https://github.com/paulblessing/kh2-rando-tracker") tracker] that this was directly inspired by.

      Collapse(name="Jsmartee")
        p #[b Links]: #[a(href="https://twitter.com/Jsmartee23") Twitter], #[a(href="https://twitch.tv/jsmartee23") Twitch], #[a(href="https://github.com/jsmartee") GitHub]
        p #[b Discord]: Jsmartee#[span.light #7416]

        p Created the #[a(href="https://jsmartee.github.io/kh2fm-hints-demo/") hint system] that this uses for the important checks mode.

      Collapse(name="Valaxor")
        p #[b Links]: #[a(href="https://twitter.com/valaxor") Twitter], #[a(href="https://twitch.tv/valaxor_") Twitch], #[a(href="https://github.com/afresquet") GitHub]
        p #[b Discord]: Valaxor#[span.light #8622]

        p Created the KH2FM randomizer. Without it, none of this would exist.

      Collapse(name="Sonicshadowsilver2")
        p #[b Links]: #[a(href="https://twitter.com/Sonicshadowsil2") Twitter], #[a(href="https://www.twitch.tv/sonicshadowsilver2") Twitch]
        p #[b Discord]: Sonicshadowsilver2#[span.light #0326]

        p Created the Garden of Assemblage mod that the randomizer uses. Without it, none of this would exist.

      Collapse(name="Kokemon198")
        p #[b Links]: #[a(href="https://twitter.com/jorgeoviedo1998") Twitter], #[a(href="https://twitch.tv/kokemon198") Twitch]
        p #[b Discord]: Jorge Oviedo#[span.light #9282]

        p Created the #[a(href="https://drive.google.com/drive/folders/18iGi4Bq_7q7vbFjopl9BTWD5izxu_bwe") original tracker] that this was based off of.

      Collapse(name="Violin")
        p #[b Links]: #[a(href="https://twitter.com/ViolinGamer") Twitter], #[a(href="https://twitch.tv/ViolenSR") Twitch]
        p #[b Discord]: ViolinGamer#[span.light #8059]

        p Came up with the idea for the original tracker.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Collapse from "@/components/Collapse.vue";

@Component({
  components: {
    Collapse,
  },
})
export default class Thanks extends Vue {}
</script>

<style lang="stylus" scoped>
.content
  padding-bottom 1em

.light
  font-weight lighter
</style>
