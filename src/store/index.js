import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY='toutiao_user'
export default new Vuex.Store({
  state: {
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    set_token(state,data){
      state.user=data,
      setItem(TOKEN_KEY,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
