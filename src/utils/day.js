import dayjs from 'dayjs'
import Vue from 'vue'

//加载中文语言包

import 'dayjs/locale/zh-cn' // ES 2015 

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

 // in 2 years

Vue.filter('dateFormate',(data)=>{
  return dayjs().to(dayjs(value))
})