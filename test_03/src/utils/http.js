import axios from 'axios'
import Vue from 'vue'
import router from "../router";

/**
 * 请求拦截配置
 */
//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8088';

const actionMapping = {
  'get': 'view',
  'post': 'add',
  'put': 'edit',
  'delete': 'delete'
};

axios.interceptors.request.use((req) => {
  // console.log(req.url);
  // console.log(req);
  let token = sessionStorage.getItem("Authorization");
  if (req.url !== 'login') {
    //不是登录的请求， 我们应该在请求头中，加入token数据
    if (token) {
      req.headers.token = token;
    }

    //判断非权限范围内的请求
    // const aciton = actionMapping[req.method];
    // const currentRight =  router.currentRoute.meta;  //请求权限列表
    // if (currentRight && currentRight.indexOf(aciton) === -1) {
      //没有权限
      // alert("没有权限");
      // return Promise.reject(new Error("没有权限操作"))
    // }
    //判断当前请求的行为
    //restful风格请求
    // get请求  view
    // post 请求  add
    // put 请求  edit
    // delete 请求  delete
    // [add view edit delete]

  }
  return req
});

axios.interceptors.response.use((res) => {
  // console.log(res);
  ///后端在没有权限时访问，没有返回值
  if (res.status === 401){
    console.log("res.status",401);
    router.push('/login');
    sessionStorage.clear();
    window.location.reload();
  }
  return res;
});

Vue.prototype.$axios = axios;
