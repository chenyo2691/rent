/*
 * @Author: chenyousheng@cd-bd
 * @Date: 2017-10-11 14:59:34
 * @Last Modified by: chenyousheng@cd-bd
 * @Last Modified time: 2017-10-11 15:02:08
 */

<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
    <!-- 显示后台标题 -->
    <div class="title-header">
      <i class="el-icon-share title-icon"></i>后台管理
    </div>
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'
import store from '@/store'

export default {
  name: "Sidebar",
  data() {
    return {
    };
  },
  computed: {
    permission_routers: () => {
      return store.getters.permission_routers
    }
  },
  components: { SidebarItem }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title-header {
  height: 50px;
  line-height: 50px;
  background-color: #eef1f6;
  color: black;
  border-bottom: 0solid transparent;
  text-align: center;
  font-weight: bold;
  font-size: medium;
  overflow: hidden;

  .title-icon {
    margin-right: 20px;
  }
}

.hideSidebar {
  .title-header {
    text-align: left;
    padding-left: 20px;
  }
}


.el-menu {
  min-height: 100%;
}
</style>
