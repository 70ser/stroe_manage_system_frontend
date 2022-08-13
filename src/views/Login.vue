<template>
  <div
    style="width: 100%; height: 100vh; background-color: darkslateblue; overflow: hidden"
  >
    <div style="width: 400px; margin: 150px auto">
      <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px">
        欢迎登录
      </div>
      <el-form :model="form" size="normal">
        <el-form-item>
          <el-input v-model="form.username">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "Login",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    login() {
      request.post("/user/login", this.form).then((res) => {
        if (res.code === "0") {
          this.$message.success("登录成功");
          this.$router.push("/"); //跳转主页
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style scoped></style>
