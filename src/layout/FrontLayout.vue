<template>
  <div
    style="
      background-image: linear-gradient(to bottom right, lightblue, #fff);
      background-size: 100%;
    "
  >
    <!-- 头部 -->
    <FrontHeader :user="user" />
    <!-- 主体 -->
    <div style="display: flex; width: 1200px; margin: 0 auto">
      <!-- 内容区域 -->
      <router-view style="flex: 1" />
    </div>
  </div>
</template>
<script>
import FrontHeader from "../components/FrontHeader.vue";
export default {
  name: "FrontLayout",
  components: {
    FrontHeader,
  },
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
};
</script>
<style scoped></style>
