<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="homepage">LOGO</el-menu-item>
    <!-- 不再尝试在菜单栏中嵌入搜索功能 -->
    <div style="flex: 1"></div>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-dropdown style="margin-right: 50px; line-height: 58px" v-if="user.id">
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          :src="user.avatarUrl"
          style="position: relative; top: 10px; line-height: 58px"
        ></el-avatar>
        {{ user.nickName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/myinfo')">我的订单</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/myinfo')">个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span v-else style="margin-right: 50px; margin-left: 50px; line-height: 58px">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="login">注册</el-button>
    </span>
  </el-menu>
</template>
<script>
export default {
  name: "FrontHeader",
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
