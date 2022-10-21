<template>
  <div class="home" style="padding: 10px">
    <!-- 功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <!-- <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button> -->
    </div>
    <!-- 搜索区域-->
    <el-table
      :data="tableData"
      row-key="id"
      default-expand-all
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" sortable width="150px" />
      <el-table-column prop="name" label="名称" min-width="50px" />
      <el-table-column prop="path" label="路径" min-width="50px" />
      <el-table-column prop="pagePath" label="页面路径"></el-table-column>
      <el-table-column
        label="图标"
        class-name="fontSize18"
        align="center"
        label-class-name="fontSize12"
      >
        <template #default="scope">
          <el-icon style="font-size: 20px"
            ><component v-bind:is="scope.row.icon"></component
          ></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" min-width="50px" />
      <el-table-column prop="sortNum" label="顺序"></el-table-column>
      <el-table-column fixed="right" label="Operations" width="300px">
        <template #default="scope">
          <div style="float: right; padding-right: 20px">
            <!-- <el-button @click="selectMenu(scope.row)">分配菜单</el-button> -->
            <el-button
              @click="addChildren(scope.row.id)"
              v-if="!scope.row.pid && !scope.row.path"
              >新增子菜单</el-button
            >
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确认删除吗?" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name" style="width: 80%" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path" style="width: 80%" />
        </el-form-item>
        <el-form-item label="页面路径">
          <el-input v-model="form.pagePath" style="width: 80%" />
        </el-form-item>
        <el-form-item label="图标">
          <el-select
            clearable
            v-model="form.icon"
            placeholder="请选择图标"
            style="width: 80%"
          >
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            >
              <el-icon><component v-bind:is="item.value"></component></el-icon>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" style="width: 80%" />
        </el-form-item>
        <el-form-item label="顺序">
          <el-input v-model="form.sortNum" style="width: 80%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: "",
      dialogTitle: "",
      total: 0,
      tableData: [],
      options: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("menu", {
          params: {
            // pageNumber: this.currentPage,
            // pageSize: this.pageSize,
            search: this.search,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
          // this.tableData = res.data.records;
          // this.total = res.data.total;
        });
      request.get("menu/icons").then((res) => {
        this.options = res.data;
      });
    },
    add() {
      this.dialogTitle = "新增菜单";
      this.form = {};
      this.dialogVisible = true;
    },
    addChildren(pid) {
      this.dialogTitle = "新增子菜单";
      this.form = {};
      this.form.pid = pid;
      this.dialogVisible = true;
    },

    reset() {
      this.search = "";
      this.load();
    },
    save() {
      request.post("menu", this.form).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(res.msg);
        }
        this.load(); //刷新表格数据
        this.dialogVisible = false;
      });
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "编辑菜单";
      this.dialogVisible = true;
    },
    handleDelete(id) {
      // this.tableData.splice(index, 1);
      console.log(id);
      request.delete("/menu/" + id).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("删除成功");
        } else {
          this.$message.error(res.msg);
        }
        this.load(); //刷新表格数据
      });
    },
    handleSizeChange() {
      this.load();
    },
    handleCurrentChange() {
      this.load();
    },
  },
};
</script>
