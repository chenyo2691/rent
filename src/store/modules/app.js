/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 14:30:03
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-09-29 14:39:52
 */

import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
