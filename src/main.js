import Vue from 'vue'
import App from './App'
import utils from './utils'
import store from './vuex/store.js'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$request = utils.request
Vue.prototype.$toast = utils.$toast
Vue.prototype.$getLocalStorageUserInfo = utils.$getLocalStorageUserInfo
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
