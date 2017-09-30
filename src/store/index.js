/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 14:30:14
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-09-29 14:35:26
 */

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app, user, permission
  },
  getters
})

export default store
