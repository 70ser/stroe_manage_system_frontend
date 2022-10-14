<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      :default-active="$route.path.substr(1)"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-for="item in menus" :key="item.id">
        <div v-if="item.path">
          <el-menu-item :index="item.path">
            <el-icon><component v-bind:is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </div>
        <div v-else>
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon><component v-bind:is="item.icon"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <div v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.path">
                <el-icon><component v-bind:is="subItem.icon"></component></el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </div>
          </el-sub-menu>
        </div>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      menus: localStorage.getItem("menus")
        ? JSON.parse(localStorage.getItem("menus"))
        : [],
    };
  },
  created() {
    console.log(this.$route.path);
    console.log(this.menus);
  },
};
</script>
<style scoped></style>
