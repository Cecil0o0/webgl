<template>
  <div>
    <Controls/>
    <canvas id="canvas"/>
    <Menu />
  </div>
</template>

<script>
import Controls from './controls';
import Menu from '@/components/menu';
import { isMobile } from 'utils';
import { addDoubleTapEventListener, addTapEventListener } from 'utils/tap';
import { addDbclickEventListner } from 'utils/click';
import { start, clearHandler, downHandler, moveHandler, upHandler } from './engine';

const disposers = [];

export default {
  components: {
    Controls,
    Menu
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
        disposers.push(addDoubleTapEventListener(canvas, clearHandler));
      } else {
        canvas.addEventListener('mousedown', downHandler);
        canvas.addEventListener('mousemove', moveHandler);
        canvas.addEventListener('mouseup', upHandler);
        disposers.push(addDbclickEventListner(canvas, clearHandler));
      }
    }
  },
  mounted() {
    this.setup();
  },
  unmounted() {
    disposers.forEach(disposer => disposer());
  }
};
</script>
