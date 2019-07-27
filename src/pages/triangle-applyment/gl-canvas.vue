<template>
  <canvas></canvas>
</template>

<script>
import { start, render } from './2d-app';
export default {
  mounted() {
    start()
    render()
  }
}
</script>
