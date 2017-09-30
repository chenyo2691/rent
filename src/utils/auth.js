/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 14:36:23
 * @Last Modified by:   chenyousheng@cd-bd
 * @Last Modified time: 2017-09-29 14:36:23
 */

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
