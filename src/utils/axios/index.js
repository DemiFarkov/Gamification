import axios from "axios";
import Cookies from 'js-cookie';
export const instance = axios.create({
  baseURL: "https://shaman.pythonanywhere.com/api/",
  timeout: 300000,
  // headers: { "Authorization": `Token ${Cookies.get("userToken")}`, },
});
export const instancee = axios.create({
  baseURL: "https://shaman.pythonanywhere.com/api/",
  timeout: 300000,
  headers: {},
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const Config = {
  headers: { Authorization: `Token ${Cookies.get("userToken")}` },
}
