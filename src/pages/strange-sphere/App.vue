<template>
  <Layout class="layout" @click.native="clickHandler">
    <div class="controls" @click.stop>
      <div>
        <div>光源颜色</div>
        <VueColorPicker v-model="colors" />
      </div>
      <div>
        <div>光源强度</div>
        <VueSlider
          v-model="value"
          :width="200"
          :min="0"
          :max="defaultAmbientIntensity"
          :interval="0.01"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/layout';
import { Slider } from 'vue-color';
import { setup, manager, ambientLight } from './3d-app';
import { vec3 } from 'gl-matrix';
import { defaultAmbientIntensity } from 'engine/core/light/ambient';

export default {
  components: {
    Layout,
    VueSlider: window['vue-slider-component'],
    VueColorPicker: Slider
  },
  mounted() {
    setup();
  },
  watch: {
    value(newVal) {
      ambientLight.set(null, newVal);
    },
    colors(newVal) {
      const { r, g, b } = newVal.rgba;
      ambientLight.set(vec3.fromValues(r / 255, g / 255, b / 255));
    }
  },
  data() {
    return {
      defaultAmbientIntensity,
      value: defaultAmbientIntensity,
      colors: { r: 255, g: 255, b: 255 }
    };
  },
  methods: {
    clickHandler() {
      manager.isRunning ? manager.pause() : manager.resume();
    }
  }
};
</script>

<style lang="less">
.layout {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  .controls {
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    > div {
      display: flex;
      justify-content: flex-start;
      &:first-child {
        margin-bottom: 15px;
        line-height: 1;
      }
      > *:first-child {
        width: 60px;
        color: #999;
        font-size: 12px;
      }
      > *:last-child {
        width: 200px;
      }
    }
  }
}
</style>
