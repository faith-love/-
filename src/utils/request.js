import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

//封装一个axios

//创建一个axios实例；优于在vue原型上添加axios，便于基地址的修改
const request = axios.create({
  baseURL: "http://toutiao-app.itheima.net",
  //处理请求响应后数据，相当于JSON.parse的升级版。
  transformResponse: [
    function(data) {
      // Do whatever you want to transform the data
      try {
        return JSONBig.parse(data);
      } catch (error) {
        console.log(error);
        return data;
      }
    }
  ]
});
// const request =axios.create({baseURL:'http://192.168.11.56:8000'})

// 请求拦截器   <===========增加
request.interceptors.request.use(
  function(config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器

export default request;
