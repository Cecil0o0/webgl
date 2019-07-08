<template>
  <GlCanvas>
    <template v-slot="{webglTriangleTypes, clickHandler, selectedType}">
      <div class="controls">
        <div
          v-for="(entry, idx) in webglTriangleTypes"
          :key="idx"
          @click="clickHandler(entry[0])"
          :class="{active:selectedType === entry[0]}"
        >{{entry[1]}}</div>
      </div>
    </template>
  </GlCanvas>
</template>

<script>
import GlCanvas from './gl-canvas';
export default {
  name: 'app',
  components: {
    GlCanvas
  }
};
</script>

<style scoped lang="less">
.controls {
  position: absolute;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 1;
  color: #fff;
  flex-direction: column;
  font-size: 4vw;
  cursor: pointer;
  > div {
  margin-bottom: 1vh;
  }
  >.active {
    color:orange;
  }
}
</style>
