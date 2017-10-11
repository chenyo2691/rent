/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-09-30 09:12:59
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-10-11 15:09:35
 */

<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>欢迎回来 {{name}}
      <span v-for='role in roles' :key='role'>[{{role}}] </span>
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

