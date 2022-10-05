<template>
  <div class="home" style="padding: 10px">
    <!-- 功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-upload
        :action="'http://' + serverIp + ':9090/book/import'"
        :show-file-list="false"
        accept="xlsx"
        :on-success="handleExcelImportSuccess"
        style="display: inline-block; margin-left: 10px; margin-right: 10px"
      >
        <el-button type="primary">导入</el-button>
      </el-upload>
      <el-button type="primary" @click="exp">导出</el-button>
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
      <el-table-column type="expand">
        <template #default="props">
          <el-input
            v-model="props.row.name"
            style="padding: 10px"
            readonly
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" sortable width="150px" />
      <!-- <el-table-column label="图片">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.imageUrl"
            fit="cover"
            preview-teleported
            :preview-src-list="[scope.row.imageUrl]"
          />
        </template>
      </el-table-column> -->
      <el-table-column prop="isbn" label="ISBN" sortable width="150px" />
      <el-table-column prop="name" label="书名" min-width="50px" />
      <el-table-column prop="author" label="作者" min-width="50px" />
      <el-table-column prop="press" label="出版社" min-width="50px" />
      <el-table-column prop="stock" label="库存" min-width="50px" />
      <el-table-column prop="price" label="价格" min-width="50px" />
      <el-table-column fixed="right" label="Operations" min-width="100px">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="请输入关键字" />
        </template> -->
        <template #default="scope">
          <!-- <el-button @click="showDetail(scope.row)">详情</el-button> -->
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
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="50%"
      :before-close="handleDialogClose"
    >
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
        <el-form-item>
          <el-upload
            ref="upload"
            action="http://localhost:9090/files/upload"
            :limit="1"
            :on-success="fileUploadSuccess"
          >
            <el-button type="primary">点击上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
            </template>
          </el-upload>
        </el-form-item>
        <div>
          <div style="border: 1px solid #ccc; margin-top: 10px">
            <!-- 工具栏 -->
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
            />
            <!-- 编辑器 -->
            <Editor
              style="height: 400px"
              :defaultConfig="editorConfig"
              v-model="htmldetail"
              @onChange="onChange"
              @onCreated="onCreated"
            />
          </div>
          <div style="margin-top: 10px">
            <!-- <div
              id="editor-content-view"
              class="editor-content-view"
              style="width: 100%; height: 100px; outline: none"
            ></div> -->
          </div>
        </div>
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
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "HomeView",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      htmldetail: "",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            server: "http://localhost:9090/files/editor/upload",
            fieldName: "file",
          },
          uploadVideo: {
            server: "http://localhost:9090/files/editor/upload",
            maxFileSize: 100 * 1024 * 1024, // 100M
            fieldName: "file",
            timeout: 60 * 1000, // 60 秒
          },
        },
      },
      form: {},
      dialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      serverIp: "localhost",
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
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {
    handleExcelImportSuccess() {
      this.$message.success("导入成功");
      this.load();
    },
    exp() {
      window.open("http://" + this.serverIp + ":9090/book/export");
      // window.open(`http://${serverIp}:9090/book/export`);
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getHtml()); // 执行 editor API
    },

    onChange(editor) {
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
      // document.getElementById("editor-content-view").innerHTML = this.htmldetail;
    },
    fileUploadSuccess(res) {
      console.log(res);
      this.form.imageUrl = res.data;
    },
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
      this.htmldetail = "";
      this.form = {};
    },
    reset() {
      this.search = "";
      this.load();
    },
    save() {
      this.form.description = this.htmldetail;
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
      this.$refs.upload.clearFiles(); //清空上传文件
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      if (this.form.description) {
        this.htmldetail = this.form.description;
      } else {
        this.htmldetail = "";
      }
      this.dialogVisible = true;
    },
    showDetail(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    editDetail(row) {
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
    handleDialogClose() {
      this.$refs.upload.clearFiles(); //清空上传文件
      this.dialogVisible = false;
    },
  },
};
</script>
