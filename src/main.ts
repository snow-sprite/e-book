import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import pdf from 'vue-pdf';

import '@/assets/css/base.css';
import '@/directives/throttle';

Vue.config.productionTip = false;
Vue.component('pdf', pdf);
Vue.prototype.$pdf = pdf;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
