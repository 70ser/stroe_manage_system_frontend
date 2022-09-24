<template>
  <div style="width: 750px">
    <div
      style="
        display: flex;
        margin: 10px 10px;
        justify-content: center;
        align-items: center;
      "
    >
      <el-image
        :src="book.imageUrl"
        fit="contain"
        style="
          width: 350px;
          height: 350px;
          display: flex;
          margin: 0 20px;
          border: 3px red;
          border-style: solid;
          border-radius: 10px;
        "
      >
        <template #error>
          <div class="image-slot">
            <!-- <el-icon><icon-picture /></el-icon> -->
            <el-icon><PictureFilled /></el-icon>
          </div>
        </template>
      </el-image>
      <div
        style="
          width: 350px;
          height: 350px;
          display: flex;
          border: 3px blue;
          border-style: solid;
          border-radius: 10px;
          overflow: hidden;
        "
      >
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ book.name }}</span>
              <el-button text class="button" @click="buy(book.id)" type="danger"
                >购买</el-button
              >
            </div>
          </template>
          <div class="text item">
            售价: <span style="color: red">{{ book.price }}</span>
          </div>
          <div class="text item">作者：{{ book.author }}</div>
          <div class="text item">出版社：{{ book.press }}</div>
          <div class="text item">ISBN: {{ book.isbn }}</div>
          <div class="text item">库存: {{ book.stock }}</div>
        </el-card>
      </div>
    </div>
    <!-- 详细内容 -->
    <div style="justify-content: center; align-items: center">
      <div
        style="
          width: 750px;
          height: 50px;
          margin: 20px auto;
          border: 2px grey;
          border-style: solid;
          border-radius: 3px;
          display: flex;
          align-items: center;
        "
      >
        <span style="padding: 5px; margin: auto 0">商品详情</span>
        <el-button
          text
          class="button"
          @click="buy(book.id)"
          type="danger"
          style="float: right; margin-left: auto"
          :disabled="book.stock"
          >购买</el-button
        >
      </div>
      <div
        id="editor-content-view"
        class="editor-content-view"
        style="
          width: 750px;
          margin: 0 auto;
          padding: 0;
          border: 2px grey;
          border-style: solid;
          border-radius: 10px;
        "
      ></div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
export default {
  name: "Goods",
  components: {},
  data() {
    return {
      book: {},
      availble: true,
    };
  },
  created() {
    this.load();
  },
  methods: {
    //取出参数
    //this.$router.query.id;
    load() {
      request.get("/book/" + this.$route.query.id, {}).then((res) => {
        console.log(res);
        this.book = res.data;
        document.getElementById("editor-content-view").innerHTML = res.data.description;
      });
    },
    searchGoods() {
      this.$router.push({
        path: "/front/goods",
        query: {
          search: this.search,
        },
      });
    },
    buy(id) {
      this.$router.push({
        path: "/front/goods",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style scope>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 20px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: 350px;
  height: 350px;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.editor-content-view {
  margin-top: 20px;
  overflow-x: auto;
  border-width: 3px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  border-image: initial;
  border-radius: 5px;
  padding: 0px 10px;
}
</style>
