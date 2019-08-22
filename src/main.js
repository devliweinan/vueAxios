import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios' 全局使用axios
//全局使用封装后的axios,把http挂载的vue实例上 
import Http from './api/http'
Vue.prototype.$Http = Http;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
