<template>
  <Layout>
    <Controls/>
    <canvas id="canvas" :no-bottom-nav="false"/>
  </Layout>
</template>

<script>
import Controls from './controls';
import Layout from '@/components/layout';
import { isMobile } from 'engine';
import { addDoubleTapEventListener, addTapEventListener } from 'engine/tap';
import { addDbclickEventListner } from 'engine/click';
import { start, clearHandler, downHandler, moveHandler, upHandler } from './2d-app';

const disposers = [];

export default {
  components: {
    Controls,
    Layout
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
