<template>
  <div>
    <canvas @click="clickHandler" />
    <slot :clickHandler="choose" :type="type" />
  </div>
</template>

<script>
import { start, renderLine, pushVertices } from './engine';
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
      this.type.selected = type;
    },
    reset() {
      temp = [];
      tapTime = 0;
    }
  }
};
</script>
