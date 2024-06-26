import classes from "./autorization_form.module.css";
import { useState } from "react";
import { instancee } from "./utils/axios/index.js";
import LoginForm from "./components/general/loginForm";
import { useDispatch } from "react-redux";
import { login } from "./toolkitRedux/toolkitSlice";
import { Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/general/PrivateRoute";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';

export default function AutorizationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['name'])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      


      
      const user = await instancee
        .post("api/login/", {
          username,
          password,
        })

        .then(function (response) {
          console.log(response.data);
          Cookies.set('userToken', response.data.token)
          Cookies.set('acoin', response.data.acoin)
          Cookies.set('experience', response.data.experience)
          Cookies.set('groups', response.data.groups)
          Cookies.set('karma', response.data.karma)
          Cookies.set('employee_id', response.data.employee_id)


          dispatch(login(response.data));
          navigate("pages/tests/traning");
        })
        .catch(function (response) {
          console.log(response);
          console.log("response");


        });
      
      
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.mainContainer}>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </div>
  );
}
