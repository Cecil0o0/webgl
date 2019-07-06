import Vue from 'vue';
import App from './App';

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// 禁用微信原生下拉的交互
document.querySelector('body').addEventListener('touchmove', (e) => {
  e.preventDefault();
});
