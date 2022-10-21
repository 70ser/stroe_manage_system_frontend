<template>
  <div
    style="
      width: 100%;
      height: 100vh;
      background-image: linear-gradient(to bottom right, lightblue, #fff);
      overflow: hidden;
    "
  >
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 400px;
        height: 500px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="font-size: 30px; text-align: center; padding: 30px">注 册</div>
      <el-form ref="form" :model="form" size="normal" status-icon :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.userName" size="large" placeholder="用户名">
            <template #prefix>
              <el-icon><User /></el-icon> </template
            >+
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" size="large" placeholder="邮箱">
            <template #prefix>
              <el-icon><Message /></el-icon> </template
            >+
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="form.verifyCode" size="large" placeholder="验证码">
            <template #append style="color: #409eff"
              ><el-button type="primary" style="color: #409eff" @click="sendVerifyCode"
                >获取验证码</el-button
              ></template
            >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password size="large" placeholder="密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input
            v-model="form.confirm"
            show-password
            size="large"
            placeholder="确认密码"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" style="width: 100%"
            >注 册</el-button
          >
        </el-form-item>
        <el-form-item>
          <!-- <span>已有账号？</span> -->
          <el-button
            type="primary"
            @click="$router.push('/login')"
            link
            text
            style="width: 100%"
            >去登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "Register",
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    var checkVerifyCode = (rule, value, callback) => {
      const regEmail = /[0-9]\d*/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("验证码只能为数字"));
    };
    var checkUserName = (rule, value, callback) => {
      const regEmail = /[A-Za-z0-9]+/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("用户名只能为数字和字母的组合"));
    };
    return {
      form: {},
      verifyCode: "",
      expiredTime: 0,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkUserName, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码" },
          { validator: checkVerifyCode, trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirm: [{ required: true, message: "请确认密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    register() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          var now = new Date();
          console.log(now.getTime());
          console.log(this.expiredTime);
          console.log(this.form);
          if (now.getTime() > this.expiredTime) {
            this.$message.error("验证码已过期");
            return;
          } else {
            if (this.form.verifyCode !== this.verifyCode) {
              this.$message.error("验证码错误");
              return;
            }
          }
          if (this.form.password !== this.form.confirm) {
            this.$message.error("两次密码不一致");
            return;
          }
          request.post("/user/register", this.form).then((res) => {
            if (res.code === "0") {
              this.$message.success("注册成功");
              this.$router.push("/login"); //跳转登录界面
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    sendVerifyCode() {
      request
        .get("/mail/sendVerifyCode", {
          params: {
            receiver: this.form.email,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("验证码发送成功");
            this.verifyCode = res.data.verifyCode;
            this.expiredTime = res.data.date;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
  },
};
</script>
<style scoped></style>
