<template lang="pug">
.collapse(:class="{ active: show }")
  .title(:class="{ active: show }" @click="toggle")
    span {{ name }}
  .expand(v-if="show")
    .content
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import smoothReflow from "vue-smooth-reflow";

@Component({
  mixins: [smoothReflow],
})
export default class Collapse extends Vue {
  @Prop(String) name!: string;
  @Prop({ type: String, default: "" }) match!: string;
  show: boolean = this.name.toLowerCase() === this.match;

  toggle(): void {
    this.show = !this.show;
  }

  mounted() {
    this.$smoothReflow?.({
      transition: "height .25s",
    });
  }
}
</script>

<style lang="stylus" scoped>
.collapse
  border 0 solid rgba(255, 255, 255, .1)
  border-bottom-width 1px

  &:first-child
    border-top-width 1px

.title
  cursor pointer
  // font-weight bold
  font-size 1.1em
  padding 7.5px 5px

  &::before
    content ''
    display inline-block
    width 6px
    height 6px
    margin 2px
    border solid white
    border-width 1px 1px 0 0
    transform rotate(45deg)
    transition transform .2s

    /.active &
      transform rotate(135deg)

  span
    margin-left 5px

.content
  padding 0 10px 7.5px
</style>
