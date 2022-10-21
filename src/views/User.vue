<template>
  <div class="home" style="padding: 10px">
    <!-- 功能区域-->
    <!-- <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div> -->
    <!-- 搜索区域-->
    <div style="margin: 10px 0">
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
      />
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="用户ID" sortable width="150px" />
      <el-table-column prop="userName" label="用户名" min-width="50px" />
      <el-table-column prop="roleId" label="角色" min-width="50px">
        <template #default="scope">
          <span :style="adminColor(scope.row.roleId)">{{
            getRoleName(scope.row.roleId)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" min-width="50px" />
      <el-table-column prop="email" label="邮箱" min-width="50px" />
      <el-table-column prop="phoneNumber" label="手机号" min-width="50px" />
      <el-table-column prop="address" label="地址" min-width="50px" />
      <el-table-column fixed="right" label="Operations" min-width="100px">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="请输入关键字" />
        </template> -->
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除吗?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :small="small"
        :disabled="disabled"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="updateDialogVisible" title="更新用户信息" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户ID">
          <el-input v-model="form.id" disabled style="width: 80%" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName" style="width: 80%" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择" style="width: 80%">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName" style="width: 80%" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" style="width: 80%" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber" style="width: 80%" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" style="width: 80%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- <el-dialog v-model="createDialogVisible" title="新建订单" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户ID">
          <el-input v-model="form.userId" style="width: 80%" />
        </el-form-item>
        <el-form-item label="商品ID">
          <el-input v-model="form.bookId" style="width: 80%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog> -->
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
      createDialogVisible: false,
      updateDialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      roles: [],
    };
  },
  created() {
    this.load();
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  methods: {
    load() {
      request.get("role").then((res) => {
        this.roles = res.data;
        // console.log(this.roles);
        // console.log(this.roles[0].name);
        // console.log(this.roles.length);
        // console.log("nmd, why not work");
      });
      //放前面使表格数据加载好之前，角色数据就已经加载好
      request
        .get("user", {
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    getRoleName(roleId) {
      console.log(roleId);
      if (roleId == null || roleId == 0) return "用户";
      if (typeof this.roles == "undefined") {
        return "";
      }
      //原来是没加this，导致roles一直是undefined
      for (let index = 0; index < this.roles.length; index++) {
        if (this.roles[index].id == roleId) return this.roles[index].name;
      }
      return "用户";
    },
    adminColor(roleId) {
      if (roleId != null && roleId != 0) {
        return { color: "red" };
      }
    },
    add() {
      this.createDialogVisible = true;
      this.form = {};
    },
    reset() {
      this.search = "";
      this.load();
    },
    save() {
      if (this.form.id) {
        request.put("user", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("更新成功");
          } else {
            this.$message.error(res.msg);
          }
        });
        this.updateDialogVisible = false;
      } else {
        request.post("user", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("新增成功");
          } else {
            this.$message.error(res.msg);
          }
        });
        this.createDialogVisible = false;
      }
      this.load(); //刷新表格数据
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.oldstate = this.form.state;
      if (this.form.state >= 1 && this.form.state <= 3) {
        this.form.state = this.form.state + 1;
      }
      this.updateDialogVisible = true;
    },
    handleDelete(id) {
      // this.tableData.splice(index, 1);
      console.log(id);
      request.delete("/user/" + id).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.msg);
        }
      });
      this.load(); //刷新表格数据
    },
    handleSizeChange(val) {
      this.load();
    },
    handleCurrentChange() {
      this.load();
    },
  },
};
</script>
