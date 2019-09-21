<template>
  <div class="bottom-nav" @click.stop>
    <div
      :class="['item', { active: idx === activeIndex }]"
      v-for="(item, idx) in list"
      :key="idx"
      :style="{ width: `${100 / list.length}%` }"
      @click="activeIndex = idx"
    >
      <div class="rubber-band" v-if="activeIndex === idx">
        <svg :viewBox="`0 0 ${wave.width} ${wave.height}`">
          <path
            :d="
              `M0 ${wave.height} C${wave.width / 4} ${
                wave.height
              } ${wave.width / 4} 0 ${wave.width / 2} 0 C${(wave.width / 4) *
                3} 0 ${(wave.width / 4) * 3} ${wave.height} ${wave.width} ${
                wave.height
              }`
            "
            stroke="#fff"
            fill="#fff"
          />
        </svg>
      </div>
      <div class="main">
        <div
          class="icon-wrapper"
          :style="{
            background:
              activeIndex === idx
                ? `linear-gradient(135deg, ${item.startColor}, ${item.endColor}`
                : null,
            transform: activeIndex === idx && `translateY(${ballTranslateY}px)`
          }"
          :id="'icon' + idx"
        >
          <Icon :type="item.icon" />
        </div>
        <span :style="{ color: activeIndex === idx ? item.endColor : null }">{{
          item.label
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../icon';
import dynamics from 'dynamics.js';

const isAnimationMemo = {};
const dynamicOptions = {
  type: dynamics.spring,
  duration: 2000,
  frequency: 619,
  friction: 200
};
const vw = window.innerWidth / 100;
const waveAnimateHeight = vw * 10;
const ballAnimateOffset = vw * -4;

export default {
  components: {
    Icon
  },
  props: {
    list: {
      type: Array,
      default: [
        {
          label: '首页',
          icon: 'icon-system_phone_single',
          startColor: 'hsl(183, 95%, 69%)',
          endColor: 'hsl(216, 75%, 57%)'
        },
        {
          label: '日历',
          icon: 'icon-system_phone_day',
          startColor: '#582ceb',
          endColor: '#895be4'
        },
        {
          label: '定位',
          icon: 'icon-system_phone_addres',
          startColor: '#ffc183',
          endColor: '#fff295'
        },
        {
          label: '邮箱',
          icon: 'icon-system_phone_email',
          startColor: '#fab162',
          endColor: '#e96bcb'
        },
        {
          label: '我',
          icon: 'icon-system_phone_user',
          startColor: '#dfff7a',
          endColor: '#7effb3'
        }
      ]
    }
  },
  watch: {
    activeIndex(idx, preIdx) {
      this.$emit('change', idx);
      const id = 'icon' + idx;
      const dom = document.querySelector('#icon' + idx);
      const rubberband = document.querySelector('.rubber-band');
      dynamics.stop(rubberband);
      if (preIdx >= 0) {
        const preDom = document.querySelector('#icon' + preIdx);
        dynamics.stop(preDom);
        dynamics.css(preDom, { transform: '' });
      }
      dynamics.animate(
        {
          height: 0,
          translateY: 0
        },
        {
          height: waveAnimateHeight,
          translateY: ballAnimateOffset
        },
        {
          ...dynamicOptions,
          change: el => {
            this.wave.height = el.height;
            this.ballTranslateY = el.translateY;
          }
        }
      );
    }
  },
  data() {
    return {
      activeIndex: -1,
      wave: {
        height: waveAnimateHeight,
        width: 200
      },
      ballTranslateY: 0
    };
  }
};
</script>

<style lang="less" scoped>
@iconSize: 7vw;
@defaultColor: #716e71;
@fontSize: 3vw;

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 28vw;
  display: none;
  justify-content: space-evenly;
  background-color: #fff;
  border-top-left-radius: 3vw;
  border-top-right-radius: 3vw;
  padding: 0 4vw;
  .item {
    position: relative;
    .main > span {
      transition: color 0.2s ease-in-out;
      line-height: 1;
      color: @defaultColor;
      font-size: @fontSize;
    }
    &.active .icon-wrapper .icon {
      fill: #fff;
    }
    .icon-wrapper {
      border-radius: 50%;
      width: @iconSize * 2;
      height: @iconSize * 2;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
      .icon {
        width: @iconSize;
        height: @iconSize;
        fill: @defaultColor;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      height: 100%;
      > *:first-child {
        margin-bottom: 2vw;
      }
    }
    .rubber-band {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -90%);
      right: 0;
      z-index: 1;
      width: 120%;
      font-size: 0;
    }
  }
}
</style>
