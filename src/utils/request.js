import axios from  "axios"

//封装一个axio

//创建一个axios实例；优于在vue原型上添加axios，便于基地址的修改
const request =axios.create({baseURL:'http://toutiao-app.itheima.net'}) 





export default request


