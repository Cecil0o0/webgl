<template>
  <Layout>
    <canvas @click="clickHandler"></canvas>
  </Layout>
</template>

<script>
import Layout from '@/components/layout';
import { start, render, manager } from './3d-app';

export default {
  components: {
    Layout
  },
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
