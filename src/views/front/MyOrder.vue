<template>
  <div class="home" style="padding: 10px; margin: 0">
    <el-table :data="orderData" stripe style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="185px" />
      <!-- <el-table-column prop="userId" label="用户ID" sortable min-width="20px" /> -->
      <el-table-column prop="bookId" label="商品名称" min-width="20px">
        <template #default="scope">
          <span>{{ bookData[scope.$index].name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="alipayNo" label="支付宝订单号" min-width="60px" />
      <el-table-column prop="createTime" label="创建时间" sortable min-width="50px" />
      <el-table-column prop="payTime" label="支付时间" min-width="50px" />
      <el-table-column prop="total" label="金额" min-width="25px" />
      <el-table-column prop="state" label="状态" min-width="25px">
        <template #default="scope">
          <span>{{ options[scope.row.state - 1].label }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="40px">
        <template #default="scope">
          <el-button
            @click="pay(scope.row, scope.$index)"
            type="primary"
            size="small"
            :disabled="scope.row.state != 1"
            >支付</el-button
          >
          <el-button
            @click="cancel(scope.row)"
            type="danger"
            size="small"
            :disabled="scope.row.state != 1"
            >取消</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
export default {
  name: "MyOrder",
  components: {},
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      oldstate: 1,
      orderData: [],
      bookData: [],
      options: [
        { value: 1, label: "未支付" },
        { value: 2, label: "已支付" },
        { value: 3, label: "已发货" },
        { value: 4, label: "已完成" },
        { value: 5, label: "已取消" },
      ],
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
      request.get("order/myorder/" + this.user.id).then((res) => {
        console.log(res);
        this.orderData = res.data[0];
        this.bookData = res.data[1];
      });
    },
    pay(row, index) {
      window.open(
        "http://localhost:9090/alipay/pay?subject=" +
          this.bookData[index].name +
          "&traceNo=" +
          row.id +
          "&totalAmount=" +
          row.total
      );
      this.$message.success("请求支付宝成功");
    },
    cancel(row) {
      request
        .get("order/cancelorder", {
          params: {
            orderId: row.id,
          },
        })
        .then((res) => {
          console.log(row);
          console.log(res);
          if (res.code == 0) {
            this.$message.success("取消成功");
          }
          this.load();
        });
    },
  },
};
</script>
