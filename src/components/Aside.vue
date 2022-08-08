<template>
  <div>
    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px)"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><setting /></el-icon>
        <span>Navigator Three</span>
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
