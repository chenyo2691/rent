import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // console.log('当前TOKEN:' + getToken());
    if (to.path === '/login') {
      // 这里暂时无法解决跳转的页面是当前页面的时候，页面无法自刷新
      if (from.path === '/dashboard') {
        // console.log('跳转3:' + to.path);
        next(false)
        NProgress.done()
      }
      next({ path: '/' });
    } else {
      // console.log('当前角色:' + store.getters.roles);
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', { roles }).then(res => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to });
          });
        });
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
  // const roles = ['admin'];
  // if (!store.state.ismenuget) {
  //   store.dispatch('GenerateRoutes', { roles }).then(() => {
  //     router.addRoutes(store.getters.addRouters);
  //   })
  // }
  // next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
