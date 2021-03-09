import { Vue } from 'vue-property-decorator';
import { DirectiveBinding } from 'vue/types/options';
Vue.directive('throttle', {
  bind: (el: HTMLElement, binding: DirectiveBinding) => {
    if (typeof binding.value !== 'function') {
      throw new Error('v-throttle: Error Type!(Must be a Function.)');
    }
    el['timer'] = null;
    el['_throttle'] = (delay = 100) => {
      let preTime = 0;
      return () => {
        const currentTime = +Date.now();

        if (currentTime - preTime < delay) {
          clearTimeout(el['timer']);
          el['timer'] = setTimeout(() => {
            binding.value();
            preTime = currentTime;
            clearTimeout(el['timer']);
            el['timer'] = null;
          }, delay);
        } else {
          binding.value();
          preTime = currentTime;
        }
      };
    };
    el['resizeEvt'] =
      'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(el['resizeEvt'], el['_throttle'](), false);
  },
  unbind: (el: HTMLElement) => {
    window.removeEventListener(el['resizeEvt'], el['_throttle']());
    clearTimeout(el['timer']);
    el['timer'] = null;
  }
});
