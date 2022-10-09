<template>
  <div class="home" style="padding: 10px">
    <!-- 功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add"
        ><el-icon><component v-bind:is="testtext[1]"></component></el-icon
      ></el-button>
      <!-- <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button> -->
    </div>
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
      <el-table-column prop="id" label="ID" sortable width="150px" />
      <el-table-column prop="name" label="名称" min-width="50px" />
      <el-table-column prop="description" label="描述" min-width="50px" />
      <el-table-column fixed="right" label="Operations" width="300px">
        <template #default="scope">
          <el-button @click="selectMenu(scope.row)" type="info">分配菜单</el-button>
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name" style="width: 80%" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" style="width: 80%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="menuDialogVisible" title="菜单分配" width="40%">
      <el-tree
        ref="tree"
        :data="menuData"
        show-checkbox
        default-expand-all
        :default-checked-keys="checks"
        :props="props"
        node-key="id"
      >
        <template #default="{ data }">
          <span class="custom-tree-node">
            <span
              ><el-icon style="vertical-align: -10%"
                ><component v-bind:is="data.icon"></component></el-icon
              >{{ data.name }}</span
            >
          </span>
        </template>
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRoleMenu">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
export default {
  name: "Role",
  components: {},
  data() {
    return {
      dialogTitle: "",
      form: {},
      dialogVisible: false,
      menuDialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      menuData: [],
      props: {
        label: "name",
      },
      buttontext: <Upload />,
      testtext: ["Upload", "FullScreen"],
      expands: [],
      checks: [],
      roleId: 0,
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("role/page", {
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
      console.log(this.buttontext);
    },
    add() {
      this.dialogTitle = "新增角色";
      this.dialogVisible = true;
      this.form = {};
    },
    reset() {
      this.search = "";
      this.load();
    },
    selectMenu(row) {
      this.roleId = row.id;
      request.get("menu").then((res) => {
        console.log(res);
        this.menuData = res.data;
        //全部设置成展开
        //this.expands = this.menuData.map((v) => v.id);
      });
      request.get("role/roleMenu/" + this.roleId).then((res) => {
        console.log(res);
        this.checks = res.data;
      });
      this.menuDialogVisible = true;
    },
    save() {
      request.post("role", this.form).then((res) => {
        console.log(res);
        if (res.code === "0") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(res.msg);
        }
        this.dialogVisible = false;
        this.load(); //刷新表格数据
      });
    },
    saveRoleMenu() {
      // console.log(this.$refs.tree.getCheckedNodes());
      console.log(this.$refs.tree.getCheckedKeys());
      request
        .post("role/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys())
        .then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.msg);
          }
          this.menuDialogVisible = false;
          //this.load(); //刷新表格数据
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "更新角色";
      this.dialogVisible = true;
    },
    handleDelete(id) {
      // this.tableData.splice(index, 1);
      console.log(id);
      request.delete("/role/" + id).then((res) => {
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
