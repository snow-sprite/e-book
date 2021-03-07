interface State {
  pages?: number;
  page?: number;
}

const state = {
  pages: 0, // 总页数
  page: 0 // 当前页
};

const getters = {
  pages: (state: State) => state.pages,
  page: (state: State) => state.page
};

const mutations = {
  setPages(state: State, pages: number) {
    state.pages = pages;
  },
  setPage(state: State, page: number) {
    state.page = page;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
