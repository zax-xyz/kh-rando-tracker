<template lang="pug">
ul.definitions
  li(v-for="(definition, name) in definitions")
    .name {{ name }}
    .definition {{ definition }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DefinitionsList extends Vue {
  @Prop(Object) definitions!: { [key: string]: string };
}
</script>

<style lang="stylus" scoped>
.definitions
  position relative
  padding-left 2em
  list-style none

  li
    &:before
      position absolute
      margin-left -.75em
      content '·'

    .name
    .definition
      display inline

    .name:after
      content ' - '
      white-space pre-wrap

    .definition
      font-style italic
      font-weight 300
</style>
