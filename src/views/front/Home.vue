<template>
  <div>
    <div style="margin: 10px 0">
      <div style="display: flex; justify-content: center; align-items: center">
        <!-- 搜索栏 -->
        <el-input
          v-model="search"
          placeholder="请输入搜索内容"
          style="width: 300px"
          size="large"
          @keyup.enter="searchGoods"
        />
        <el-button type="primary" @click="searchGoods" size="large" style="margin: 5px"
          >搜索</el-button
        >
      </div>
      <el-carousel
        indicator-position="outside"
        height="450px"
        interval="5000"
        style="border-radius: 10px; overflow: hidden"
      >
        <el-carousel-item v-for="item in imgs" :key="item">
          <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
          <el-image :src="item" fit="cover" style="width: 100%; height: 450px">
            <template #error>
              <div class="image-slot">
                <!-- <el-icon><icon-picture /></el-icon> -->
                <el-icon><PictureFilled /></el-icon>
              </div>
            </template>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-row>
        <el-col v-for="book in books" :key="book" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <el-image
              :src="book.imageUrl"
              fit="contain"
              style="width: 100%; height: 300px"
            >
              <template #error>
                <div class="image-slot">
                  <!-- <el-icon><icon-picture /></el-icon> -->
                  <el-icon><PictureFilled /></el-icon>
                </div>
              </template>
            </el-image>
            <div style="padding: 14px">
              <span>{{ book.name }}</span>
              <div class="bottom">
                <span style="font-size: 12px; color: #999"
                  >库存{{ book.stock }} 售价{{ book.price }}</span
                >
                <el-button
                  text
                  class="button"
                  @click="buy(book.id)"
                  style="float: right"
                  type="danger"
                  >购买</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      imgs: [
        "https://m.360buyimg.com/babel/jfs/t1/65728/9/21154/95264/630f5a67Ebfc50ecd/d8b9433a19bcd180.png",
        "https://m.360buyimg.com/babel/jfs/t1/145597/16/29923/84751/63158710E1aedf36e/3844329bd3d.png",
      ],
      books: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("book/random", {
          params: {
            size: 32,
          },
        })
        .then((res) => {
          console.log(res);
          this.books = res.data;
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
.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
.image {
  width: 100%;
  height: 300px;
  display: block;
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
</style>
