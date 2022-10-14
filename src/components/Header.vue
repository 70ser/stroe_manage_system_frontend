<template>
  <div
    style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex"
  >
    <div style="width: 200px; padding-left: 30px; font-weight: bold">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 100px; margin-right: 50px">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            :src="user.avatarUrl"
            style="position: relative; top: 10px"
          ></el-avatar>
          {{ user.nickName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/info')">个人信息</el-dropdown-item>
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
      localStorage.removeItem("menus");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped></style>
