<template>
  <Layout />
</template>

<script>
import Layout from '@/components/layout';
import { setup, manager } from './3d-app';

export default {
  components: {
    Layout
  },
  mounted() {
    setup()
  },
  methods: {
    clickHandler() {
      manager.isRunning ? manager.pause() : manager.resume();
    }
  }
}
</script>
