<template>
  <div>
    <Controls/>
    <canvas id="canvas"/>
  </div>
</template>

<script>
import Controls from './controls';
import { isMobile } from 'utils';
import { addDoubleTapEventListener, addTapEventListener } from 'utils/tap';
import { addDbclickEventListner } from 'utils/click';
import { start, clearHandler, downHandler, moveHandler, upHandler } from './engine';

const disposers = [];

export default {
  components: {
    Controls
  },
  methods: {
    setup() {
      start();
      // setup gestures
      const canvas = document.querySelector('canvas');
      if (isMobile()) {
        canvas.addEventListener('touchstart', downHandler);
        canvas.addEventListener('touchmove', moveHandler);
        canvas.addEventListener('touchend', upHandler);
        this.disposers.push(addDoubleTapEventListener(canvas, clearHandler));
      } else {
        canvas.addEventListener('mousedown', downHandler);
        canvas.addEventListener('mousemove', moveHandler);
        canvas.addEventListener('mouseup', upHandler);
        this.disposers.push(addDbclickEventListner(canvas, clearHandler));
      }
    }
  },
  mounted() {
    this.setup();
  },
  unmounted() {
    this.disposers.forEach(disposer => disposer());
  }
};
</script>
