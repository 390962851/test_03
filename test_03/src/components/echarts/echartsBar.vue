<template>
  <!-- <div style="height: 500px;width: 600px;" ref="myCharts"></div> -->
  <div id="myCharts" :style="{width: '100%', height: '400px'}" ref="myCharts"></div>
</template>

<script>
  export default {
    name: "myCharts",
    data() {
      return {
        options: {
          title: {
            text: '性别比例',
            subtext: '纯属虚构',
            left: 'center'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男', '女']
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: 335,
                name: '男'
              },
              {
                value: 310,
                name: '女'
              }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]

        },
      }
    },
    mounted() {
      const myCharts = this.$echarts.init(this.$refs.myCharts);
      myCharts.setOption(this.options);
      
    },
    methods: {},
  }
</script>

<style scoped>

</style>
