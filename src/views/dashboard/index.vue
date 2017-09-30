/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-30 09:12:59
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-09-30 09:14:01
 */

<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>name:{{name}}</div>
    <div class='dashboard-text'>role:
      <span v-for='role in roles' :key='role'>{{role}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

