//axios全局默认根路径
// axios.defaults.baseURL = "http://ajax.frontend.itheima.net";

// 请求拦截器
// headers 默认携带Authorization
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem("token");
    config.baseURL = "http://ajax.frontend.itheima.net";
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
// 添加访问权限  没有登录就不能访问index页面
axios.interceptors.response.use(
  function (response) {
    if (
      response.data.message === "身份认证失败！" &&
      response.data.status === 1
    ) {
      localStorage.removeItem("token");
      location.href = "login.html";
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
