<template>
  <canvas></canvas>
</template>

<script>
import { start, render } from './engine';
export default {
  mounted() {
    start()
    render()
  }
}
</script>
