<template>
  <div>
    <slot name="default"></slot>
    <Menu />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Menu from '../menu/index.vue';
export default Vue.extend({
  components: {
    Menu
  }
})
</script>
