import request from '@/utils/require.js'


export const getUserArticle=()=>{
  return request({
    method: 'GET',
    url:"/v1_0/user/channels"
  })
}

export const getNewsArticle=params=>{
  return request({
    method: 'GET',
    url:"/v1_1/articles",
    params
  })
}