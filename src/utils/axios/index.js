import axios from "axios";
import { getTokenUseAuth } from "../../hooks/reduxHooks";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
const Token = () => {
 const token = getTokenUseAuth();
 return (token)
};
function kk(){
return 
}
export const instance = axios.create({
  baseURL: "https://solevoi.pythonanywhere.com/",
  timeout: 15000,
  headers: { Authorization: `Token ${Cookies.get("userToken")}` },
});
export const instancee = axios.create({
  baseURL: "https://solevoi.pythonanywhere.com/",
  timeout: 15000,
  headers: {},
});
