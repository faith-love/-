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
