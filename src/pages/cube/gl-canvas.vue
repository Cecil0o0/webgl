<template>
  <canvas @click="clickHandler"></canvas>
</template>

<script>
import { start, render, manager } from './engine';
export default {
  mounted() {
    start()
    render()
  },
  methods: {
    clickHandler() {
      manager.isRunning ? manager.pause() : manager.resume();
    }
  }
}
</script>
