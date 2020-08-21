import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Echarts from 'echarts'
import Axios from 'axios'
import Vuex from 'vuex';
import './utils/http.js' //请求拦截配置
import './utils/permission.js'//引入按钮权限/自定义指令
import './utils/dateformat.js'//引入日期格式
//这里要导入store
import store from "./store";


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$echarts = Echarts;
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: {
    App
  },
  template: '<App/>'
});
