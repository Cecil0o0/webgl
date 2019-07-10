<template>
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
</template>

<script>
import GlCanvas from './gl-canvas';
export default {
  components: {
    GlCanvas
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/global.less';
@import '../../styles/mixins.less';
.container {
  .absoluteCenterX();
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
