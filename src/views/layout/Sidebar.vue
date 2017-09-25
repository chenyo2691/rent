<template>
  <el-menu mode="vertical" theme="dark" :default-active="$route.path">
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
<style lang="css" scoped>
.el-menu {
  min-height: 100%;
}
</style>
