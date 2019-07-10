<template>
  <div>
    <canvas @click="clickHandler" />
    <slot :clickHandler="choose" :type="type" />
  </div>
</template>

<script>
import { start, renderLine, pushVertices, positions } from './engine';
import { WEBGL_LINE_TYPES_ENUM } from './const';
let tapTime = 0;
let temp = [];
export default {
  mounted() {
    start();
  },
  data() {
    const typeSource = Object.entries(WEBGL_LINE_TYPES_ENUM);
    return {
      type: {
        dataSource: typeSource,
        selected: typeSource[0][0]
      }
    };
  },
  watch: {
    'type.selected'(newType) {
      this.reset();
      renderLine(newType);
    }
  },
  methods: {
    clickHandler(e) {
      const { pageX: x, pageY: y } = e;
      const currType = this.type.selected;
      temp.push(x, y);
      tapTime++;
      if (currType === WEBGL_LINE_TYPES_ENUM.LINES && tapTime < 2) {
        return;
      }
      pushVertices(temp);
      renderLine(currType);
      this.reset();
    },
    choose(type) {
      if (positions.length / 2 % 2 !== 0 && type === WEBGL_LINE_TYPES_ENUM.LINES) {
        alert('切换到 LINES 前需要保证顶点个数为偶数个');
        return;
      }
      this.type.selected = type;
    },
    reset() {
      temp = [];
      tapTime = 0;
    }
  }
};
</script>
