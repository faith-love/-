import request from '@/utils/request'

export const getAllChannels=()=>{
return request ({
  method:'GET',
  url:'/v1_0/channels',
})
}


//add 
export const add_channel=channel=>{
  return request ({
    method:'PATCH',
    url:'/v1_0/user/channels',
    data:{
      channels:[channel]
    }
  })
  }

  //del
export const del_channel=target=>{
  return request ({
    method:'DELETE',
    url:`/v1_0/user/channels/${target}`,
  })
  }