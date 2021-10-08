import request from "@/utils/request";
// import store from '../store/index'


export const login = data => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data
  });
};

export const loginSms = mobile => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const getUserInfo = () => {
  return request({
    method: "GET",
    url: `/v1_0/user`,
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  });
};

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: `/v1_0/user/channels`,
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  });
};


// 获频道新闻数据
export const getChannelsNewsArticles = params => {
  return request({
    method: "GET",  
    url: '/v1_1/articles',
    params
  });
};


// 获取用户个人信息
export const getUserProfile = () => {
  return request({
    method: "get",  
    url: `/v1_0/user/profile`,
  });
};


// 获取用户个人信息
export const editUserProfile = (data) => {
  return request({
    method: "PATCH",  
    url: `/v1_0/user/profile`,
    data
  });
};


/**
 * 更新用户照片资料
 */
 export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
