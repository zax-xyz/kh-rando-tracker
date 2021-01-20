<template lang="pug">
  .note
    p
      slot
</template>

<style lang="stylus" scoped>
.note
  position relative
  display inline-block

  &:before
    padding .25em 1em
    font-weight bold
    content '?'

  &:hover
    p
      opacity 1
      visibility visible
      transform translateX(-50%)

p
  position absolute
  bottom 1.5em
  left 50%
  max-width 450px
  width max-content
  padding 5px
  background-color rgba(0, 0, 0, .85)
  border-radius 3px
  box-shadow 0 2px 5px rgba(0, 0, 0, .5)
  opacity 0
  visibility hidden
  transform translate(-50%, 10px) scale(.95)
  z-index 1
  transition opacity .2s, visibility .2s, transform .2s

  &:after
    position absolute
    top 100%
    left 50%
    border 5px solid transparent
    border-top-color @background-color
    transform translateX(-50%)
    content ' '
</style>
