/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 15:42:06
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-09-29 17:37:05
 */

import fetch from '@/utils/axios.js'

export function login(username, password) {
  // return fetch().post('/user/login', { username, password });
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  // return fetch().get('/user/info', { token });
  return fetch({
    url: '/user/info',
    method: 'get',
    data: {
      token
    }
  })
}

export function logout() {
  // return fetch().post('/user/logout');
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}
