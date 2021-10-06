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


//添加收藏
export const addCollect=(target)=>{
  return request({
    method:"POST",
    url:`/v1_0/article/collections`,
    data:{
      target
    }
  })
}

//取消收藏
export const cancelCollect=(target)=>{
  return request({
    method:"DELETE",
    url:`/v1_0/article/collections/${target}`
  })
}

//添加点赞
export const addLike=(target)=>{
  return request({
    method:"POST",
    url:`/v1_0/article/likings`,
    data:{
      target
    }
  })
}

//取消点赞
export const cancelLike=(target)=>{
  return request({
    method:"DELETE",
    url:`/v1_0/article/likings/${target}`
  })
}