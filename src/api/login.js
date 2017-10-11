/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 15:42:06
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-10-11 13:46:03
 */

import fetch from '@/utils/axios.js'

export function login(username, password) {
  // return fetch().post('/user/login', { username, password });
  return fetch({
    url: '/api/user/login',
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
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  // return fetch().post('/user/logout');
  return fetch({
    url: '/api/user/logout',
    method: 'post'
  })
}
