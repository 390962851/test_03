<template>
  <div :style="{width: '92%', height: '350px'}" ref="myCharts"></div>
</template>

<script>
  export default {
    name: "myCharts",
    data() {
      return {
        options: {
          title: {
            text: '访问人数',
            textStyle: {
              fontSize: 15,
            },
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['访问人数']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{  //x轴坐标数据
            type: 'category',
            boundaryGap: false,
            data: []
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
              data: [],
            },
          ]
        },
      }
    },
    mounted() {
      this.myCharts = this.$echarts.init(this.$refs.myCharts);
      this.myCharts.setOption(this.options);
    },
    methods: {
      getHomeLineDate(){
        this.$axios({
          method: 'get',
          url: '/visual/views'
        })
        .then(res => {
          this.options.xAxis[0].data = res.data.result.xAxis;
          this.options.series[0].data = res.data.result.seriesD;
          this.myCharts.setOption(this.options);
        })
      }
    },
    created() {
      this.getHomeLineDate();
    }
  }
</script>

<style scoped>

</style>
