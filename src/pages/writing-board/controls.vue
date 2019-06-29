<template>
  <div class="controls">
    <div class="redo" @click="redoHandler">redo</div>
    <div class="undo" @click="undoHandler">undo</div>
  </div>
</template>

<script>
import { redoHandler, undoHandler } from './engine';

export default {
  methods: {
    redoHandler,
    undoHandler
  }
}
</script>

<style lang="less" scoped>
.controls {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2vh;
  display: flex;
  width: 25vw;
  justify-content: space-between;
  z-index: 1;
  > div {
    margin-left: 0.1vw;
    color: #fff;
    font-size: 4vw;
    cursor: pointer;
    user-select: none;
  }
}
</style>
