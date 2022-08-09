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
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" />
      <el-button type="primary" style="margin-left: 5px">查询</el-button>
    </div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="isbn" label="ISBN" sortable />
      <el-table-column prop="name" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="press" label="出版社" />
      <el-table-column prop="classify" label="分类" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="price" label="价格" />
      <el-table-column fixed="right" label="Operations">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="请输入关键字" />
        </template> -->
        <template #default="scope">
          <el-button size="medium" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="确认删除吗?">
            <template #reference>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
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
        <el-form-item label="分类">
          <el-input v-model="form.classify" style="width: 80%" />
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
      total: 20,
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    save() {},
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange() {},
  },
};
</script>
