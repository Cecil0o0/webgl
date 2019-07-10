<template>
  <div :class="['menu-wrapper', { collapse }]">
    <div class="trigger" @click="collapse = !collapse">
      {{collapse ? '👈' : '👉'}}
    </div>
    <div class="menu">
      <div class="item" v-for="(item, idx) in items" :key="idx" @click="item.click">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
import { apps } from 'config';
export default {
  data() {
    return {
      collapse: true,
      items: apps.map(app => ({
        title: app.title,
        click: () => window.location.href = `${app.name}.html`
      }))
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixins.less';

.menu-wrapper {
  &.collapse {
    right: -40vw;
  }
  position: fixed;
  top: 20vh;
  right: 0;
  z-index: 10;
  display: flex;
  transition: right .3s ease-in-out;
  .menu {
    background-color: steelblue;
    .item {
      width: 40vw;
      line-height: 5vh;
      text-align: center;
      color: #fff;
      font-size: 4vw;
      .ellipsis-single-text();
    }
  }
}
</style>
