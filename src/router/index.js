import Vue from 'vue'
import Router from 'vue-router'
// import _import from './_import'
// import Hello from '@/components/Hello'
import Layout from '@/views/layout/Layout'

import login from '@/views/login/index'
import p404 from '@/views/404'
import t1 from '@/views/test1/t1'
import t2 from '@/views/test2/t2'
import dashboard from '@/views/dashboard/index'


Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: login, hidden: true },
  { path: '/404', component: p404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  routes: constantRouterMap,
  // scrollBehavior(to, from, savedPosition) { return { y: 0 } }
  scrollBehavior: () => ({ y: 0 })
})

export const asyncRouterMap = [
  {
    path: '/test1', name: 'test1', component: Layout, icon: 'zujian',
    children: [
      { path: 't1', name: 't1', icon: 'zonghe', icon: 'zujian', component: t1 }
    ]
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test2/t2',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 't2', name: 't2', component: t2, meta: { role: ['admin'] } }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
