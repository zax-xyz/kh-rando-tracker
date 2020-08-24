<template lang="pug">
  transition(name="fade-up")
    .outer(
      v-if="show"
      @mousedown.self="gotoRoot"
    )
      .inner
        router-view.content
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ModalView extends Vue {
  get show(): boolean {
    return this.$route.path !== '/';
  }

  gotoRoot(): void {
    this.$router.push('/');
  }

  mounted(): void {
    window.addEventListener("keydown", e=> {
      if (e.key === "Escape" && this.$route.path !== '/')
        this.gotoRoot();
    })
  }
}
</script>

<style lang="stylus" scoped>
.outer
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background rgba(0, 0, 0, .5)
  z-index 1
  display flex
  align-items center
  justify-content center

.inner
  max-width 900px
  width 100%
  max-height calc(100vh - 30px)
  margin 0 15px
  background $bg-color
  font-size 14px
  text-align left
  border-radius 3px
  box-shadow 0 5px 25px rgba(0, 0, 0, .3)
  overflow-x visible
  overflow-y auto

.content
  padding 1em 2em
  overflow-x visible

.fade-up-enter-active
.fade-up-leave-active
  transition opacity .25s

  .inner
    transition transform .25s

.fade-up-enter
.fade-up-leave-to
  opacity 0

  .inner
    transform translateY(15px) scale(.98)
</style>

<style lang="stylus">
p
h1
h2
h3
h4
h5
h6
  margin .5em 0

.footnote
  font-weight 300

.row
  display flex
  align-items center

  &.grid
    display grid
    grid-template-columns 12em auto
    grid-gap 15px

    :first-child
      margin-left auto

  p
    display inline-block

  input
    width 3em
    padding 4px 6px
    border 0
    border-radius 3px
    box-shadow 0 0 3px inset rgba(0, 0, 0, .35)

    &:last-child
      text-align right

    &.long
      width 9em
</style>