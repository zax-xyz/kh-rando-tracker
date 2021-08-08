<template lang="pug">
  transition(name="fade-up")
    .outer(
      v-if="show"
      @mousedown.self="gotoRoot"
    )
      .inner
        router-view.modal-content
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ModalView extends Vue {
  get show(): boolean {
    return this.$route.path !== "/";
  }

  gotoRoot(): void {
    this.$router.push("/");
  }

  mounted(): void {
    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && this.show) {
        this.gotoRoot();
      }
    });
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

.modal-content
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

>>>
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
    margin .5em 0

    &.grid
      display grid
      grid-template-columns 10em auto
      grid-gap 15px

      > :first-child
        margin-left auto

      input:not(:first-child)
        width 100%
        text-align left

      @media screen and (max-width: 480px)
        &
          grid-template-columns none
          grid-gap .5em
          margin 1em 0

          input
            text-align left

          > :first-child
            grid-row 2
            margin-left 0

          .name
            font-weight bold

    p
      display inline-block
      margin 0

  input
    width 6em
    padding 4px 0
    text-align right
    color hsl(0, 0, 85%)
    background initial
    border 0
    border-bottom 1px solid rgba(255, 255, 255, .1)
    outline 0
    transition border-bottom-color .2s, color .2s

    &:hover
      border-bottom-color rgba(255, 255, 255, .3)

    &:focus
      border-bottom-color hsla($accent-hue, 65%, 65%, .6)
      color white

      &::placeholder
        color transparent

    &.long
      width 10em
</style>
