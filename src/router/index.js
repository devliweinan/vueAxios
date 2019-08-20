import Vue from 'vue'
import Router from 'vue-router'
// import BaseAxios from '@/pages/baseAxios'  同步加载
// import ContactList from '@/pages/ContactList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BaseAxios',
      // component: BaseAxios 同步加载
      component:()=>import('@/pages/baseAxios') //异步加载
    },
    {
      path: '/contactList',
      name: 'ContactList',
      component:()=>import('@/pages/ContactList.vue')
    }
  ]
})
