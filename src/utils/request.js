import axios from "axios";

axios.defaults.withCredentials = true;

const ins = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
  // headers: {
  //   "X-Requested-With": "XMLHttpRequest",
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
});

ins.interceptors.request.use(
  (config) => {
    // token
    // config.headers.common["Authorization"] = cookie.getCookie("token");
    if (config.method === "get") {
      config.params.t = Date.now();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

ins.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    if (error) {
      console.error(error);
      this.$router.replace("/login");
    }
    return;
  }
);

export default function request(options) {
  const {
    url,
    method = "GET",
    data,
    headers,
    submitType = "json", // json   form   file
  } = options;
  let s = submitType.toUpperCase();

  switch (method.toUpperCase()) {
    case "GET":
      return ins.get(url, { params: data });
    case "POST":
      if (s == "JSON") {
        return ins.post(url, data, { headers });
      }
      if (s == "FORM") {
        //转换参数  new URLSearchParams   ||   qs
        const p = new URLSearchParams();
        for (let key in data) {
          p.append(key, data[key]);
        }
        return ins.post(url, p, { headers });
      }
      if (s == "FILE") {
        const params = new FormData();
        for (let key in data) {
          params.append(key, data[key]);
        }
        return ins.post(url, params, { headers });
      }

      return ins.post(url, data, { headers });
    case "PUT":
      return ins.put(url, data);
    case "DELETE":
      return ins.delete(url, { data });
    case "PATCH":
      return ins.patch(url, data);
    default:
      break;
  }
}
