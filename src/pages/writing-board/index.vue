<template>
  <div>
    <Controls/>
    <canvas id="canvas"/>
  </div>
</template>

<script>
import Controls from './controls';
import { isMobile } from 'utils';
import { addDoubleTapEventListener, addTapEventListener, addDbclickEventListner } from 'utils/tap';
import { start, clearHandler, downHandler, moveHandler, upHandler } from './engine';

export default {
  components: {
    Controls
  },
  methods: {
    setup() {
      start();
      // setup
      const canvas = document.querySelector('canvas');
      if (isMobile()) {
        canvas.addEventListener('touchstart', downHandler);
        canvas.addEventListener('touchmove', moveHandler);
        canvas.addEventListener('touchend', upHandler);
        addDoubleTapEventListener(canvas, clearHandler);
      } else {
        canvas.addEventListener('mousedown', downHandler);
        canvas.addEventListener('mousemove', moveHandler);
        canvas.addEventListener('mouseup', upHandler);
        addDbclickEventListner(canvas, clearHandler);
      }
    }
  },
  mounted() {
    console.log('init app');
    this.setup();
  }
};
</script>
