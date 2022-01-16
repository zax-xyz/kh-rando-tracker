<template lang="pug">
nav
  .links(ref="links")
    router-link(
      v-for="(name, to, index) in links"
      :to="to"
      :style="{ minWidth: minWidth }"
      :key="index"
      @click.native="scroll(index)"
    ) {{ name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  @Prop(Object) links!: { [key: string]: string };
  @Prop({ type: String, default: "200px" }) minWidth!: string;

  scroll(index: number) {
    const elem = this.$refs.links as HTMLElement;

    // make current tab centered within screen
    elem.scroll({
      left: index * 200 - (elem.offsetWidth - 200) / 2,
      behavior: "smooth",
    });
  }
}
</script>

<style lang="stylus" scoped>
nav
  position sticky
  top 0
  height calc(40px + 1em)
  padding-top 1em
  margin-top -1em
  background #212121
  border-bottom 1px solid rgba(255, 255, 255, .1)
  overflow-y hidden
  z-index 1000

.links
  display flex
  border-radius 2px 2px 0 0
  overflow-x auto

a
  position relative
  height 40px
  padding .5em .5em 0
  margin 0 .125em
  flex 1
  background rgba(255, 255, 255, .015)
  border-radius 3px 3px 0 0
  text-align center
  font-size 1.1em
  text-decoration none
  font-weight bold
  white-space nowrap
  transition background .2s, color .2s

  &::after
    position absolute
    right 0
    bottom 0
    left 0
    display block
    content ''
    display block
    padding-top .5em
    border-bottom 2px solid
    transform scaleX(0)
    transition transform .2s

  &:not(:hover):not(.router-link-active)
    color white

  &:hover
  &:focus
    background rgba(255, 255, 255, .04)

  &:focus
    outline 0

  &.router-link-active::after
    transform none
</style>
