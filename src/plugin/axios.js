import axios from "axios";
axios.defaults.baseURL = "https://cnodejs.org/api/v1";
axios.interceptors.response.use(res => {
  return res.data;
});

export default axios