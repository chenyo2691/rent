import Vue from 'vue'
import Router from 'vue-router'
// import _import from './_import'
// import Hello from '@/components/Hello'
import Layout from '../views/layout/Layout'

import login from '@/views/login/index'
import p404 from '@/views/404'
import t1 from '@/views/test1/t1'
import t2 from '@/views/test2/t2'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: login, hidden: true },
  { path: '/404', component: p404, hidden: true },
  {
    path: '/test1', name: 'test1', component: Layout,
    children: [
      { path: 't1', name: 't1', component: t1 }
    ]
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test2/t2',
    noDropdown: true,
    children: [{ path: 't2', name: 't2', component: t2, meta: { role: ['admin'] } }]
  },
]

export default new Router({
  routes: constantRouterMap,
  // scrollBehavior(to, from, savedPosition) { return { y: 0 } }
  scrollBehavior: () => ({ y: 0 })
})

export const asyncRouterMap = [

]
