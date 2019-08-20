import Vue from 'vue'
import App from './App'
import router from './router'
//import axios from 'axios' 全局使用axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
