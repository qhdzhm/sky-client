import axios from "axios";
import { clearToken, getToken } from "./token";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (getToken()) {
      config.headers["token"] = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error.response && error.response.status === 401){
      clearToken();
      window.location.href='/login'
    }
    return Promise.reject(error);
  }
);

export default instance;
