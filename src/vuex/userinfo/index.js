const ALL_DATA = {
  userInfo: null
}

export default {
  state: ALL_DATA,
  getters: {},
  actions: {
    // 初始化本模块数据
    initUserInfo ({ commit }, data) {
      let source = Object.assign({}, ALL_DATA, data || {})
      commit('SET_USERINFO', source.userInfo)
    },
    saveUserInfo ({ commit }, data) {
      commit('SET_USERINFO', data)
    }
  },
  mutations: {
    SET_USERINFO (state, data) {
      state.userInfo = data
    }
  }
}
