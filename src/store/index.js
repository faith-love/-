import Vue from "vue";
import Vuex from "vuex";
import {setItem,getItem} from '@/utils/storage'

Vue.use(Vuex);   
const LOGIN_TOKeN='login_token'

export default new Vuex.Store({
  state: {
    token: getItem(LOGIN_TOKeN)
  },
  mutations: {
 
    set_token(state, data) {
      state.token = data;
      //创建本地存储；封装一个存储模块
      setItem(LOGIN_TOKeN,data)
    
    }
  },
  actions: {},
  modules: {}
});

