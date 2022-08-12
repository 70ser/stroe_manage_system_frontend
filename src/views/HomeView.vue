<template>
  <div class="home" style="padding: 10px">
    <!-- 功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
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
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="isbn" label="ISBN" sortable />
      <el-table-column prop="name" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="press" label="出版社" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="price" label="价格" />
      <el-table-column fixed="right" label="Operations">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="请输入关键字" />
        </template> -->
        <template #default="scope">
          <el-button size="medium" @click="handleEdit(scope.row)">编辑</el-button>
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
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn" style="width: 80%" />
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="form.name" style="width: 80%" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" style="width: 80%" />
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press" style="width: 80%" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" style="width: 80%" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" style="width: 80%" />
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
  name: "HomeView",
  components: {},
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("book", {
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
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    save() {
      if (this.form.id) {
        request.put("book", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("更新成功");
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        request.post("book", this.form).then((res) => {
          console.log(res);
          if (res.code === "0") {
            this.$message.success("新增成功");
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      this.load(); //刷新表格数据
      this.dialogVisible = false; //关闭弹窗
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleDelete(id) {
      // this.tableData.splice(index, 1);
      console.log(id);
      request.delete("/book/" + id).then((res) => {
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
