<template>
  <div class="home" style="padding: 10px">
    <el-form ref="form" :model="form" size="normal">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名"> </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" show-password placeholder="密码"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
export default {
  name: "Order",
  components: {},
  data() {
    return {
      form: {},
      workerInfo: localStorage.getItem("workerInfo")
        ? JSON.parse(localStorage.getItem("workerInfo"))
        : {},
    };
  },
  created() {
    this.request.get("/worker/getWorkerInfo/"+ this.workerInfo.workerName).then((res) => {
        if (res.code === "0") {
          this.form = res.data;
        } else {
          this.$message.error(res.msg);
        }
      localStorage.setItem("workerInfo", JSON.stringify(this.workerInfo));
    });
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  methods: {
    save() {
      request.put("user", this.form).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("更新成功");
        } else {
          this.$message.error(res.msg);
        }
      });
      this.updateDialogVisible = false;
    },
  },
};
</script>
