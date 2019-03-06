import Vue from 'vue'
import App from './App'
import utils from './utils'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$request = utils.request
Vue.prototype.$toast = utils.$toast

const app = new Vue(App)
app.$mount()
