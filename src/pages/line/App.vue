<template>
  <div>
    <GlCanvas>
      <template v-slot="{clickHandler, type}">
        <div class="container g-flex g-flex-column">
          <div
            v-for="(item, idx) in type.dataSource"
            :key="idx"
            @click="clickHandler(item[0])"
            :class="{active: item[0] === type.selected}"
          >{{item[1]}}</div>
        </div>
      </template>
    </GlCanvas>
    <Menu />
  </div>
</template>

<script>
import GlCanvas from './gl-canvas';
import Menu from '@/components/menu';
export default {
  components: {
    GlCanvas,
    Menu
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/mixins.less';
.container {
  .absolute-center-x();
  bottom: 10vh;
  font-size: 5vw;
  color: #fff;
  > div {
    margin-bottom: 1vh;
  }
  > div.active {
    color: #ffff4d;
  }
}
</style>
