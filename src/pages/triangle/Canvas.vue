<template>
  <canvas></canvas>
</template>

<script>
import { boot } from './engine';
export default {
  name: 'canvas',
  mounted() {
    boot();
  }
}
</script>
