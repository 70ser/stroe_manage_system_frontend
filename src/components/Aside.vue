<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      default-active="book"
      default-openeds="['1']"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="book" :route="{ path: '/' }">书籍管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="user" :route="{ path: '/' }">
        <el-icon><Menu /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside",
};
</script>
<style scoped></style>
