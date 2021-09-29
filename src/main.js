import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
import '@/utils/day.js'
//vant组件库
import Vant from "../node_modules/vant/lib/"
import 'vant/lib/index.css';
import "amfe-flexible"

//导入时间处理函数
import '@/utils/day'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
