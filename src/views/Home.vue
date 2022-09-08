<template>
  <div>
    <p>Home</p>
    <div id="main" style="width: 500px; height: 500px"></div>
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
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    myChart.setOption(option);
  },
  methods: {},
};
</script>
<style scope></style>
