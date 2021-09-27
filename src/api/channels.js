import request from '@/utils/request'

//全部theListOfChannels

export const getAllChannels=()=>{
  return request({
    method:'GET',
    url:'/v1_0/channels'
  })
}

//添加频道
export const addChannels=(channel)=>{
  return request({
    method:'PATCH',
    url:'/v1_0/user/channels',
    data:{
      channels:[channel]
    }
  })
}

//添加指定频道
export const delChannels=(target)=>{
  return request({
    method:'DELETE',
    url:`/v1_0/user/channels/${target}`,
  })
}