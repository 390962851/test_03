<template>
  <div>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card title="工作台" :head-style="tstyle">
          <a slot="extra">
            <Tooltip></Tooltip>
          </a>
          <a-row :gutter="1">
            <a-col :xl="2">
              <a-avatar :size="90" :src="avatar"/>
            </a-col>
            <a-col :xl="18">
              <a-descriptions :title="UserDate.name">
                <a-descriptions-item label="上次登录时间">{{ UserDate.loginTime }}</a-descriptions-item>
              </a-descriptions>
              <a-descriptions title="">
                <a-descriptions-item label="上次登录ip">{{ UserDate.loginIp }}</a-descriptions-item>
              </a-descriptions>
              <!-- <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div> -->
              <div>前端工程师 | {{ UserDate.descripe }}</div>
            </a-col>
            <a-col :xl="4" style="margin-top: 50px">
              <div style="display: flex;flex-flow: row; justify-content: center">
                <a-statistic style="margin: 10px" title="项目数" :value="56"/>
                <a-statistic style="margin: 10px" title="团队内排名" :value="8" suffix="/ 24"/>
                <a-statistic style="margin: 10px" title="项目访问" :value="2223"/>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :span="10">
        <a-card>
          <EchartsLine></EchartsLine>
        </a-card>
      </a-col>
      <a-col :span="7" :style="{ marginBottom: '24px' }">
        <a-card title="分析数据" :head-style="tstyle">
          <a slot="extra">
            <Tooltip></Tooltip>
          </a>
          <a-row>
            <a-col :sm="24" :md="12" :xl="18" :style="{ marginBottom: '24px' }">
              <a-statistic title="完成进度：" :value="63" class="demo-class">
                <template #suffix>
                  <span> / 100</span>
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="6">
              <a-progress type="circle" :percent="63" :width="80" status="normal" :strokeWidth="10"/>
            </a-col>
          </a-row>
          <a-statistic-countdown title="剩余截至时间" :value="deadline" format="D 天 H 时 m 分 s 秒"/>
        </a-card>
      </a-col>
    </a-row>
  </div>

</template>
<script>
  import Tooltip from '@/components/tooltip/tooltip'
  import EchartsLine from '@/components/echarts/echartsLine'

  export default {
    components: {
      Tooltip,
      EchartsLine,
    },
    data() {
      return {
        tstyle: {"font-size": "15px", "font-family": "微软雅黑", "height": "1px"},
        deadline: Date.now() + 1000 * 60 * 59 * 23 * 2 + 1000 * 30,
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        UserDate:{
          id: '',
          name:'',
          descripe:'',
          loginIp:'',
          loginTime:'',
        },
      };
    },
    created() {
      // console.log("home==",this.$store.state.rightList);
    }
  };
</script>
<style>
  .card-peo {
    margin: 2px;
    padding: 2px;
  }
</style>
