import  {request} from  '../utils/request.js'
// import store from '@/store'


export  const login = (data) =>{
  return request({
    method:"POST",
    url:'/v1_0/authorizations',
    data
  })
}

export  const getMsg = mobile=>{
  return request({
    method:"GET",
    url:`/v1_0/sms/codes/${mobile}`,
  })
}

export  const tologin = data =>{
  return request({
    method:"POST",
    url:`/v1_0/authorizations`,
    data
  })
}

export  const getuserinfo = () =>{
  return request({
    method:"GET",
    url:`/v1_0/user`,
  })
}