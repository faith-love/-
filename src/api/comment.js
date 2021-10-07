import request  from "@/utils/request"

//获取评论列表

export const getComments=(params)=>{
  return request({
    method:'GET',
    url:'/v1_0/comments',
    params
  })
}

//为文章点赞
export const addCommentLike=(commentId)=>{
  return request({
    method: "POST",
    url: "/v1_0/comment/likings",
    data: {
      target: commentId
    }
  })
}

//取消文章点赞
export const cancelCommentLike=(commentId)=>{
  return request({
    method: "DELETE",
    url: `/v1_0/comment/likings/${commentId}`
  })
}



//发布文章评论或评论回复

export const addComment =(data)=>{
  return request({
    method: "POST",
    url: `/v1_0/comments`,
    data
  })
}
