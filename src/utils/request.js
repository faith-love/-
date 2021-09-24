import axios from  "axios"
import store from '@/store'

//封装一个axio

//创建一个axios实例；优于在vue原型上添加axios，便于基地址的修改
const request =axios.create({baseURL:'http://toutiao-app.itheima.net'}) 

// 请求拦截器   <===========增加
request.interceptors.request.use(function (config) {
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器

export default request


