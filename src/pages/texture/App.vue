<template>
  <div>
    <GlCanvas />
    <Menu />
  </div>
</template>

<script>
import GlCanvas from './gl-canvas.vue';
import Menu from '@/components/menu';
export default {
  components: {
    GlCanvas,
    Menu
  }
}
</script>
