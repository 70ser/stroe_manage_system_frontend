<template>
  <div>
    <!-- 头部 -->
    <Header :user="user" />
    <!-- 主体 -->
    <div style="display: flex">
      <!-- 侧边栏 -->
      <Aside />
      <!-- 内容区域 -->
      <router-view style="flex: 1" />
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
export default {
  name: "Layout",
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
};
</script>
<style scoped></style>
