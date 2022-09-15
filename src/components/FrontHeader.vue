<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            :src="user.avatarUrl"
            style="position: relative; top: 10px"
          ></el-avatar>
          {{ user.nickName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/myinfo')">个人信息</el-dropdown-item>
            <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-sub-menu>
  </el-menu>
  <div
    style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex"
  >
    <div style="width: 200px; padding-left: 30px; font-weight: bold">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 100px; margin-right: 40px">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            :src="user.avatarUrl"
            style="position: relative; top: 10px"
          ></el-avatar>
          {{ user.nickName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/myinfo')">个人信息</el-dropdown-item>
            <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    user: Object,
  },
  components: {},
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped></style>
