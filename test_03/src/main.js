import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Echarts from 'echarts'
import Axios from 'axios'
import Vuex from 'vuex';

//这里要导入store
import store from "./store";


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$echarts = Echarts;
Vue.prototype.$axios = Axios;
Vue.use(Vuex);
/* 配置请求根路径 */
Axios.defaults.baseURL = 'http://localhost:8088';

// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.token = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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
