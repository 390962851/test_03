import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    username: sessionStorage.getItem('username'),
    // 存储token
    Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '',
    ///导航栏菜单
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
  },
  mutations: {
    // 修改token，并将token存入sessionStorage
    changeLogin(state, data) {
      state.Authorization = data.Authorization;
      sessionStorage.setItem('Authorization', data.Authorization);
    },
    setRightList(state, data){
      state.rightList = data;
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUsername(state, data){
      state.username = data;
      sessionStorage.setItem('username', data);
    }
  },
  actions: {},
  getters: {},
});

export default store;
