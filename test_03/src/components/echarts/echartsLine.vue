<template>
  <a-card title="访问量" :style="{ height: '370px'}">
    <div id="myCharts" :style="{width: '90%', height: '300px'}" ref="myCharts"></div>
  </a-card>

  <!-- <div style="height: 300px;width: 500px;" ref="myCharts"></div> -->
</template>

<script>
  export default {
    name: "myCharts",
    data() {
      return {
        options: {
          legend: {
            data: ['访问人数']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{  //x轴坐标数据
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{   //y轴坐标数据
            type: 'value',
            axisLabel: {
              formatter: '{value} 人'
            }
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name: "访问人数",
              type: "line",
              smooth: true,
              data: [11, 11, 15, 13, 12, 13, 10],
            },
          ]
        },
      }
    },
    mounted() {
      const myCharts = this.$echarts.init(this.$refs.myCharts);

      myCharts.setOption(this.options);
    },
    methods: {
      getHomeLineDate(){

      }
    },
  }
</script>

<style scoped>

</style>
