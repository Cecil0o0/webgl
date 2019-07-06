<template>
  <Canvas @click="clickHandler"></Canvas>
</template>

<script>
import { boot, gl, render } from './engine';
const positions = [];
let innerPush = positions.push;
let proxyPush = function(...value) {
  innerPush.apply(positions, value);
  if (positions.length % 6 === 0) {
    // 向缓冲区复制新顶点信息
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    // 重新render
    render(positions);
  }
}
const positionsProxy = new Proxy(positions, {
  get(target, prop, receiver) {
    if (prop === 'push') {
      return proxyPush;
    }
  }
})
export default {
  mounted() {
    boot();
  },
  methods: {
    clickHandler(e) {
      positionsProxy.push(e.pageX, e.pageY);
    }
  }
}
</script>
