import Vue from 'vue'
import App from './App.vue'
require('./boot/registry');

new Vue({
  render: h => h(App)
}).$mount('#app');
