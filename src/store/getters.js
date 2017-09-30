/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-29 14:30:51
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-09-29 14:40:13
 */

const getters = {
  // app
  sidebar: state => state.app.sidebar,

  // user
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

  // permission
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
