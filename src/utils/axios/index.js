import axios from "axios";
import Cookies from 'js-cookie';
export const instance = axios.create({
  baseURL: "https://solevoi.pythonanywhere.com/",
  timeout: 15000,
  headers: { "Authorization": `Token ${Cookies.get("userToken")}`, },
});
export const instancee = axios.create({
  baseURL: "https://solevoi.pythonanywhere.com/",
  timeout: 15000,
  headers: {},
});

export const Config = {
  headers: { Authorization: `Token ${Cookies.get("userToken")}` },
}
