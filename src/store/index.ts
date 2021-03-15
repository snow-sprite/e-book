import Vue from 'vue';
import Vuex from 'vuex';
import book from './book';

Vue.use(Vuex);
interface State {
  isMobile: boolean;
  isSmallSize: boolean;
}

export default new Vuex.Store({
  state: {
    isMobile: false,
    isSmallSize: false
  },
  getters: {
    isMobile: (state: State) => state.isMobile,
    isSmallSize: (state: State) => state.isSmallSize
  },
  mutations: {
    isMobileState: (state: State, payload: boolean) => {
      state.isMobile = payload;
    },
    isSmallSizeState: (state: State, payload: boolean) => {
      state.isSmallSize = payload;
    }
  },
  actions: {},
  modules: { book }
});
