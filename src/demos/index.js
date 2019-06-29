import Vue from 'vue';
import WritingBoard from '../pages/writing-board';

new Vue({
  render: (h) => h(WritingBoard),
}).$mount('#app');

// 禁用微信原生下拉的交互
document.querySelector('body').addEventListener('touchmove', (e) => {
  e.preventDefault();
});
