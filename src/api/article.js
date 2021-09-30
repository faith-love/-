import request from '@/utils/request'

export const getArticleDetail=(article_id)=>{
  return request({
    method:"GET",
    url:`/v1_0/articles/${article_id}`
  })
}
//添加关注
export const getFollow=(target)=>{
  return request({
    method:"POST",
    url:`/v1_0/user/followings`,
    data:{
      target
    }
  })
}

//取消关注
export const cancelFollow=(target)=>{
  return request({
    method:"DELETE",
    url:`/v1_0/user/followings/${target}`
  })
}