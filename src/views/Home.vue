<template>
  <div>
    <el-row :gutter="10" style="margin: 50px">
      <el-col :span="6">
        <el-card style="color: #409eff">
          <div>
            <el-icon style="vertical-align: middle"><User /></el-icon> 用户总数
          </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">100</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #f56c6c">
          <div>
            <el-icon style="vertical-align: middle"><Box /></el-icon> 订单总量
          </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            1000000
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #67c23a">
          <div>
            <el-icon style="vertical-align: middle"><Money /></el-icon> 销售总额
          </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            ￥ 300000
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #e6a23c">
          <div>
            <el-icon style="vertical-align: middle"><Goods /></el-icon> 书籍总数
          </div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">20</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 90px">
      <el-col :span="12">
        <div id="main" style="width: 700px; height: 600px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pie" style="width: 700px; height: 600px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

import request from "@/utils/request";
import * as echarts from "echarts";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  mounted() {
    //页面加载完毕后执行
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option = {
      title: {
        text: "各季度销量",
        subtext: "趋势图 ",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: ["Q1", "Q2", "Q3", "Q4"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "line",
        },
      ],
    };
    var pieOption;

    pieOption = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    var pieDom = document.getElementById("pie");
    var pieChart = echarts.init(pieDom);
    request.get("/echarts/order").then((res) => {
      option.series[0].data = res.data;
      myChart.setOption(option);
      pieOption.series[0].data = [
        { name: "第一季度", value: res.data[0] },
        { name: "第二季度", value: res.data[1] },
        { name: "第三季度", value: res.data[2] },
        { name: "第四季度", value: res.data[3] },
      ];
      pieChart.setOption(pieOption);
    });
  },
  methods: {},
};
</script>
<style scope></style>
