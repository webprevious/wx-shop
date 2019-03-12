import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userinfo'
import goods from './goods'
import utils from '@/utils/index.js'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    userInfo,
    goods
  }
})

// 订阅mutation事件，及时更新本地存储的数据
store.subscribe((mutation, state) => {
  utils.$setLocalStorage('store', state)
})

async function initVuex () {
  let oldVuexStore = await utils.$getLocalStorage('store')
  store.dispatch('initUserInfo', oldVuexStore.userInfo)
  store.dispatch('initGoods', oldVuexStore.goods)
}

initVuex()

export default store
