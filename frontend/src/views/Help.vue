<template lang="pug">
  div
    nav
      .links
        router-link(to="normal") Normal
        router-link(to="important") Important Checks Mode

    router-view.content
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseTooltip from "@/components/BaseTooltip.vue";

@Component({
  components: {
    BaseTooltip,
  },
})
export default class Help extends Vue {}
</script>

<style lang="stylus" scoped>
nav
  position sticky
  top 0
  padding 1em .5em 0
  margin-top -1em
  background #212121
  border-bottom 1px solid rgba(255, 255, 255, .1)
  z-index 1

.links
  display flex
  border-radius 2px 2px 0 0
  overflow hidden

a
  display block
  padding-top .5em
  flex 1
  text-align center
  font-size 1.1em
  text-decoration none
  font-weight bold
  transition background .2s, color .2s

  &::after
    content ''
    display block
    padding-top .5em
    border-bottom 2px solid
    transform scaleX(0)
    transition transform .2s

  &:not(:hover):not(.router-link-active)
    color white

  &:hover
    background rgba(255, 255, 255, .04)

  &.router-link-active::after
    transform none

.content
  padding-top .5em
</style>
