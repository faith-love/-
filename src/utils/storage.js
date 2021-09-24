// 封装本地存储操作模块


//存储数据
export  const  setItem=(key,value)=>{
  if(typeof value==='object') {
    value=JSON.stringify(value)
  }
  return localStorage.setItem(key,value)
}


//读取数据

export  const getItem=key=>{
 const data= localStorage.getItem(key)
try {

  //如果其为字符串会报错，进入catch里面；无需if判断
   return JSON.parse(data)
} catch (error) {
   return data
}
}


//移除数据
export  const  removeItem=key=>{
  localStorage.removeItem(key)
}


 