<template>
  <div>
    <template v-for="item in routes">
      <!-- 一级 -->
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" />
          {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <!-- 多级 -->
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" />
          {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <!-- 如果children有自己的children，则递归 -->
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <!-- 否则直接显示 -->
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              {{child.name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: "SidebarItem",
  data() {
    return {
    };
  },
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
</style>
