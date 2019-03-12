const ALL_DATA = {
  oneGoodsMessage: null
}

export default {
  state: ALL_DATA,
  getters: {},
  actions: {
    // 初始化模块数据
    initGoods ({commit}, data) {
      let source = Object.assign({}, ALL_DATA, data || {})
      commit('SET_ONEGOODSMESSAGE', source.oneGoodsMessage)
    },
    // 更新当前goods的信息，整个程序永远只有一个当前正在浏览的物品，存入vuex目的在于提高用户体验
    saveCurrentGoodsMessage ({commit}, data) {
      commit('SET_ONEGOODSMESSAGE', data)
    }
  },
  mutations: {
    SET_ONEGOODSMESSAGE (state, data) {
      state.oneGoodsMessage = data
    }
  }
}
