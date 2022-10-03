<template>
  <el-card style="width: 500px">
    <el-form label-width="80px" size="large">
      <el-upload
        class="avatar-uploader"
        :action="'http://localhost:9090/files/editor/upload'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <el-avatar
          :src="form.avatarUrl"
          :icon="Plus"
          shape="square"
          :size="100"
          fit="cover"
          class="avatar"
        >
          <el-icon :size="100">
            <Plus />
          </el-icon>
        </el-avatar>
      </el-upload>

      <el-form-item label="用户名">
        <el-input v-model="form.userName" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保 存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
export default {
  name: "Info",
  components: {},
  data() {
    return {
      form: {},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    };
  },
  created() {
    request.get("/user/info/" + this.user.id).then((res) => {
      if (res.code === "0") {
        this.form = res.data;
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  methods: {
    resetInfo() {
      request
        .get("/user/info/" + this.user.id) //不管怎么改id不会变
        .then((res) => {
          if (res.code === "0") {
            this.form = res.data;
            localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    save() {
      request.put("user", this.form).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("保存成功");
          this.resetInfo();
        } else {
          this.$message.error(res.msg);
        }
      });
      this.updateDialogVisible = false;
    },
    handleAvatarSuccess(res) {
      this.form.avatarUrl = res.data.url;
    },
  },
};
</script>
<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>
