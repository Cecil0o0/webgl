<template>
  <div>
    <slot name="default"></slot>
    <Menu />
    <BottomNav v-if="showBottomMenu && noBottomNav"/>
  </div>
</template>

<script>
import Menu from '../menu';
import BottomNav from '@/components/bottom-nav';
import { isMobile, isIpad } from 'engine/';
export default {
  components: {
    Menu,
    BottomNav
  },
  props: {
    noBottomNav: Boolean
  },
  data() {
    return {
      showBottomMenu: false
    }
  },
  mounted() {
    if (isMobile() && !isIpad()) this.showBottomMenu = true;
  }
}
// 禁用微信原生下拉的交互
document.querySelector('body').addEventListener('touchmove', (e) => {
  e.preventDefault();
});
</script>
