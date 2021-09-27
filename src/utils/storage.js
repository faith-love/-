//存储数据

export const setItem = (key, val) => {
  if (typeof val === "object") {
   val= JSON.stringify(val);
  }
  return localStorage.setItem(key, val);
};

//获取数据
export const getItem = key => {
  const res = localStorage.getItem(key);
  try {
    return JSON.parse(res);
  } catch (error) {
    return res;
  }
};

//移除数据
export const removeItem = key => {
  localStorage.removeItem(key);
};
