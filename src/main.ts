import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as pdfjsLib from 'pdfjs-dist';

import '@/assets/css/base.css';
import '@/directives/throttle';

Vue.config.productionTip = false;

window['pdfjsLib'] = pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/js/pdf.worker.min.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
