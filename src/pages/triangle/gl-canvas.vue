<template>
  <div>
    <canvas @click="clickHandler" />
    <slot :webglTriangleTypes="types" :clickHandler="typeClickHandler" :selectedType="selectedType"></slot>
  </div>
</template>

<script>
import { start, gl, render } from './engine';
import { WEBGL_TRIANGLE_TYPES_ENUM } from './const';
const positions = [];
let innerPush = positions.push;
export default {
  mounted() {
    start();
    let proxyPush = (...value) => {
      innerPush.apply(positions, value);
      // 重新render
      this.reRender();
    };
    this.positionsProxy = new Proxy(positions, {
      get(target, prop, receiver) {
        if (prop === 'push') {
          return proxyPush;
        } else if (prop === 'length') {
          return positions.length;
        }
      }
    });
  },
  data() {
    return {
      types: Object.entries(WEBGL_TRIANGLE_TYPES_ENUM),
      selectedType: Object.keys(WEBGL_TRIANGLE_TYPES_ENUM)[0]
    };
  },
  methods: {
    clickHandler(e) {
      this.positionsProxy.push(e.pageX, e.pageY);
    },
    typeClickHandler(type) {
      this.$nextTick(this.reRender);
      this.selectedType = type;
    },
    reRender() {
      render({ positions, triangleType: this.selectedType });
    }
  }
};
</script>
