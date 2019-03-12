const ALL_DATA = {
  searchKeyword: []
}

export default {
  state: ALL_DATA,
  getters: {},
  actions: {
    // 初始化搜索模块数据
    initSearch ({commit}, data) {
      let source = Object.assign({}, ALL_DATA, data || {})
      commit('SET_SEARCHKEYWORD', source.searchKeyword)
    },
    // 存入搜索关键字
    saveKeyword ({commit}, data) {
      commit('SET_SEARCHKEYWORD', data)
    }
  },
  mutations: {
    SET_SEARCHKEYWORD (state, data) {
      state.searchKeyword = data
    }
  }
}
