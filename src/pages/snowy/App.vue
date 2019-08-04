<template>
  <Layout class="layout" @click.native="clickHandler" />
</template>

<script>
import Layout from '@/components/layout';
import { setup, manager } from './3d-app';

export default {
  components: {
    Layout
  },
  mounted() {
    setup();
  },
  methods: {
    clickHandler() {
      manager.isRunning ? manager.pause() : manager.resume();
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
