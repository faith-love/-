import request from "@/utils/request";

export const getSearchSuggest = q => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {q}
  });
};

export const getSearchResult = data => {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params: data
  });
};
