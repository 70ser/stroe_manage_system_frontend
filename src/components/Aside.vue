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
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="home">书籍管理</el-menu-item>
        <el-menu-item index="user">用户管理</el-menu-item>
        <el-menu-item index="order">订单管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="registertemp">
        <el-icon><Menu /></el-icon>
        <span>用户管理注册暂定</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside",
  created() {
    console.log(this.$route.path);
  },
};
</script>
<style scoped></style>
