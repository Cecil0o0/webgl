<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + type"></use>
  </svg>
</template>

<script>
export default {
  props: {
    type: {
      require: true,
      type: String
    }
  }
}
</script>

<style lang="less">
svg.icon {
  width: 6vw;
  height: 6vw;
  fill: currentColor;
}
</style>
